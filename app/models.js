import connectDB from "../lib/mongodb";
import mongoose from "mongoose";

const AddressTypeSchema = new mongoose.Schema({line1: String, country: String, city:String,zip: Number})
const CartItemTypeSchema = new mongoose.Schema({ hair: Number, liquid: Number })
const PickupOrderTypeSchema = new mongoose.Schema({ location: String, orders:[]}, { strict: false });
const HistoryTypeSchema = new mongoose.Schema({price: Number, items: CartItemTypeSchema, date: String})
const CustomerPaymentTypeSchema = new mongoose.Schema({cardName:String, cardNumber: String, expiryDate: String, cvv: String})
const CustomerInfoTypeSchema = new mongoose.Schema({address: String, payment: CustomerPaymentTypeSchema})
const CustomerSubTypeSchema = new mongoose.Schema({sub:String, price: Number, items: CartItemTypeSchema})
const CustomerDataTypeSchema = new mongoose.Schema({history: [], sub: CustomerSubTypeSchema, info: CustomerInfoTypeSchema})
const NewBarberOrderSchema = new mongoose.Schema({date: String,address:String,amount:String,payment:String,paymentMethod:String,status:String,name:String, user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }})
const NewBarberTypeSchema = new mongoose.Schema({orders: [],paymentType:String,paymentInfo:String})
const UserTypeSchema = new mongoose.Schema({name: String,email: String,password: String,customerData: CustomerDataTypeSchema, newBarber:NewBarberTypeSchema}, { strict: false })
const EmployeeTypeSchema = new mongoose.Schema({name: String,email: String,password: String})
const ActiveEmployeeTypeSchema = new mongoose.Schema({ user: EmployeeTypeSchema })
const CustomerOrderTypeSchema = new mongoose.Schema({price:Number,items:CartItemTypeSchema,status:{
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
    },address:AddressTypeSchema, user: { type: mongoose.Schema.Types.ObjectId, ref: "UserType" } }, { strict: false })

export const CartItemType = mongoose.models.CartItemType || mongoose.model("CartItemType", CartItemTypeSchema, "cartitemtypes");
export const PickupOrderType = mongoose.models.PickupOrderType || mongoose.model("PickupOrderType", PickupOrderTypeSchema, "pickupordertypes");
export const UserType = mongoose.models.UserType || mongoose.model("UserType", UserTypeSchema, "usertypes");
export const EmployeeType = mongoose.models.EmployeeType || mongoose.model("EmployeeType", EmployeeTypeSchema, "employeetypes");
export const HistoryType = mongoose.models.HistoryType || mongoose.model("HistoryType", HistoryTypeSchema, "historytypes");
export const CustomerPaymentType = mongoose.models.CustomerPaymentType || mongoose.model("CustomerPaymentType", CustomerPaymentTypeSchema, "customerpaymenttypes")
export const CustomerInfoType = mongoose.models.CustomerInfoType || mongoose.model("CustomerInfoType", CustomerInfoTypeSchema, "customerinfotypes")
export const CustomerSubType = mongoose.models.CustomerSubType || mongoose.model("CustomerSubType", CustomerSubTypeSchema, "customersubtypes")
export const CustomerDataType = mongoose.models.CustomerDataType || mongoose.model("CustomerDataType", CustomerDataTypeSchema, "customerdatatypes")
export const CustomerOrderType = mongoose.models.CustomerOrderType || mongoose.model("CustomerOrderType", CustomerOrderTypeSchema, "customerOrdertypes")
export const AddressType = mongoose.models.AddressType || mongoose.model("AddressType", AddressTypeSchema, "addresstypes")
export const ActiveEmployeeType = mongoose.models.ActiveEmployeeType || mongoose.model("ActiveEmployeeTypeSchema", ActiveEmployeeTypeSchema, "activeemployeetypes")
export const NewBarberType = mongoose.models.NewBarberType || mongoose.model("NewBarberTypeSchema", NewBarberTypeSchema, "newbarbertypes")
export const NewBarberOrderType = mongoose.models.NewBarberOrderType || mongoose.model("NewBarberOrderSchema", NewBarberOrderSchema, "newbarberordertypes")
