import connectDB from "../../../lib/mongodb";
import mongoose from "mongoose";
import {NewBarberOrderType, PickupOrderType, UserType} from '../../models'

export async function GET(req) {
  try {
    await connectDB();

    const pickupOrders = await PickupOrderType.find();

    return new Response(JSON.stringify(pickupOrders), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching pickup orders:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch pickup orders", details: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function PUT(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { location, order, userId } = body; // assuming you send userId

    // Validate request body
    if (!location || !order || !userId) {
      return new Response(
        JSON.stringify({ error: "Missing 'location', 'order', or 'userId'" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // 1️⃣ Create a shared ObjectId for all three places
    const sharedId = new mongoose.Types.ObjectId();

    // 2️⃣ Create the NewBarberOrderType document with the shared _id
    const newOrder = new NewBarberOrderType({
      _id: sharedId,
      ...order,
      user: userId
    });
    await newOrder.save();

    // 3️⃣ Push into PickupOrderType.orders array
    await PickupOrderType.findOneAndUpdate(
      { location },
      { $push: { orders: { _id: sharedId, ...order, user: userId } } },
      { new: true }
    );

    await UserType.findOneAndUpdate(
  { _id: userId },
  { $push: { "newBarber.orders": { _id: sharedId, ...order } } },
  { new: true }
);

const updatedPickupOrder = await PickupOrderType.findOne({ location });
const updatedUser = await UserType.findById(userId);

    return new Response(
      JSON.stringify({ message: "Order created successfully", orderId: sharedId,orders: updatedPickupOrder?.orders || [],
    user: updatedUser || null }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error creating order:", error);
    return new Response(
      JSON.stringify({ error: "Failed to create order", details: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function PATCH(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { location, orderId, status, amount } = body;

    // Validate input
    if (!location || !orderId || !status || !amount) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Ensure ID type matches DB (assuming ObjectId)
    const castedOrderId = mongoose.Types.ObjectId.isValid(orderId)
      ? new mongoose.Types.ObjectId(orderId)
      : orderId;

    // 1️⃣ Update the NewBarberOrderSchema document
    const updatedOrder = await NewBarberOrderType.findByIdAndUpdate(
      castedOrderId,
      { status, amount },
      { new: true }
    );

    if (!updatedOrder) {
      return new Response(
        JSON.stringify({ error: "Order not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    // 2️⃣ Update the order inside PickupOrderType.orders array
    const pickupResult = await PickupOrderType.updateOne(
      { location, "orders._id": castedOrderId },
      { $set: { "orders.$.status": status, "orders.$.amount": amount } }
    );

    // 3️⃣ Update the related User's customerData.newBarber.orders array
    const userResult = await UserType.updateOne(
      { _id: updatedOrder.user },
      {
        $set: {
          "newBarber.orders.$[elem].status": status,
          "newBarber.orders.$[elem].amount": amount
        }
      },
      {
        arrayFilters: [{ "elem._id": castedOrderId }]
      }
    );

    return new Response(
      JSON.stringify({
        message: "Order updated successfully",
        pickupMatched: pickupResult.matchedCount,
        userMatched: userResult.matchedCount,
        order: updatedOrder,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error updating order:", error);
    return new Response(
      JSON.stringify({ error: "Failed to update order", details: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
