// context/history.js
"use client";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext({});

// Provider component
export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [pickupOrders, setPickupOrders] = useState([])
  const [activeUser, setActiveUser] = useState(null);
  const [activeEmployee, setActiveEmployee] = useState(null);
  const [cart, setCart] = useState([]);

  // Load from localStorage on mount
  useEffect(() => {
    const newData = async () => {
      const data = await fetch('/api/data')
  const users = await data.json()
  setUsers(users)
    }
    newData()
  }, [])

  useEffect(() => {
    const newData = async () => {
      const data = await fetch('/api/employee')
  const users = await data.json()
  setEmployees(users)
    }
    newData()
  }, [])

  useEffect(() => {
    const newData = async () => {
      const data = await fetch('/api/pickup')
  const users = await data.json()
  setPickupOrders(users)
    }
    newData()
  }, [])
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) setCart(JSON.parse(storedCart));
  }, []);

  useEffect(() => {
    const storedActive = localStorage.getItem("activeUser");
    if (storedActive) setActiveUser(JSON.parse(storedActive));
  }, []);

  // Save to localStorage on users or activeUser change
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Save to localStorage on users or activeUser change
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("employees", JSON.stringify(employees));
    if (activeUser !== undefined) {
    localStorage.setItem("activeUser", JSON.stringify(activeUser));
  }
    localStorage.setItem("pickupOrders", JSON.stringify(pickupOrders));
  }, [users, employees, activeUser, pickupOrders]);

  // Sign up a new user
  const signUp = async (name, email, password) => {
    try {
      const userExists = users.find((user) => user.email === email);
      if (userExists) throw new Error("User already exists");
  
      const newUser = {
        name,
        email,
        password,
        customerData: {
          history: [], 
          sub: {
            sub:"", 
            price: 0, 
            items: {
              hair: 0, 
              liquid: 0
            }}, 
          info: {
            address: "",
            cryptoAddress: "",
            payment: {
              cardName:"", 
              cardNumber: "", 
              expiryDate: "", 
              cvv: ""
            }
          }
        },
        barberData: {
          orders: [],
        sub: null,
        info: {
          address: "",
        info: "",
        payment: '',
        subPayment: '',
        subInfo: '',
        }
        },
        newBarber: {
          orders: [],
          paymentType: '',
          paymentInfo:''
        }
      };
  
      const res = await fetch("/api/data", {
        method: "POST",
        body: JSON.stringify(newUser),
      });
  
      if (!res.ok) throw new Error("Failed to register user");
  
      const savedUser = await res.json();
      setUsers([...users, savedUser]);
      setActiveUser(savedUser);
    } catch (err) {
      console.error("Signup Error:", err);
      throw err;
    }
  };
  
  // Login an existing user
  const login = async (email, password) => {
  try {
    const user = users.find((u) => u.email === email && u.password === password);
    if (!user) throw new Error("Invalid email or password");

    // You might call an actual auth endpoint here in a real app
    setActiveUser(user);

    // Update active user in backend too (if needed)
  } catch (err) {
    console.error("Login Error:", err);
    throw err;
  }
};

const employeeLogin = async (email, password) => {
  try {
    const user = employees.find((u) => u.email === email && u.password === password);
    if (!user) throw new Error("Invalid email or password");

    // You might call an actual auth endpoint here in a real app
    setActiveEmployee(user);

    // Update active user in backend too (if needed)
    await fetch("/api/employee", {
      method: "PUT",
      body: JSON.stringify({ user }),
    });
  } catch (err) {
    console.error("Login Error:", err);
    throw err;
  }
};

  // Logout
  const logout = async () => {
    setActiveUser(null);
  };

  const updateUser = async (updates) => {
    if (!activeUser) return;
  
    try {
      const updatedUser = {
        ...activeUser,
        ...updates,
      };
  
      const { name, email, password } = updatedUser;
  
      const res = await fetch("/api/data", {
        method: "PUT",
        body: JSON.stringify({ _id: activeUser._id, name, email, password }),
      });
  
      if (!res.ok) throw new Error("Failed to update user info");
  
      const savedUser = await res.json();
      setActiveUser(savedUser);
  
      const updatedUsers = users.map((user) =>
        user._id === savedUser._id ? savedUser : user
      );
      setUsers(updatedUsers);
    } catch (err) {
      console.error("Update User Info Error:", err);
    }
  };
  
  // Update active user’s properties
  const updateCustomerData = async (customerUpdates) => {
    if (!activeUser) return;
  
    try {
      const updatedUser = {
        ...activeUser,
        customerData: {
          ...activeUser.customerData,
          ...customerUpdates
        },
      };
  
      const res = await fetch("/api/customer", {
        method: "PUT",
        body: JSON.stringify({ _id: activeUser._id, customerData: updatedUser.customerData }),
      });
  
      if (!res.ok) throw new Error("Failed to update customer data");
  
      const savedUser = await res.json();
      setActiveUser(savedUser);
  
      const updatedUsers = users.map((user) =>
        user._id === savedUser._id ? savedUser : user
      );
      setUsers(updatedUsers);
    } catch (err) {
      console.error("Update Customer Data Error:", err);
    }
  };
  
  const updateBarberData = async (barberUpdates) => {
    if (!activeUser) return;
  
    try {
      const updatedUser = {
        ...activeUser,
        newBarber:{
          ...activeUser.newBarber,
          ...barberUpdates
        },
      };
  
      const res = await fetch("/api/barber", {
        method: "PUT",
        body: JSON.stringify({ _id: activeUser._id, newBarber: updatedUser.newBarber }),
      });
  
      if (!res.ok) throw new Error("Failed to update barber data");
  
      const savedUser = await res.json();
      setActiveUser(savedUser);
  
      const updatedUsers = users.map((user) =>
        user._id === savedUser._id ? savedUser : user
      );
      setUsers(updatedUsers);
    } catch (err) {
      console.error("Update Barber Data Error:", err);
    }
  };
  
const addOrder = async (order) => {
  if (!activeUser) return;
  const updatedOrders = [...(activeUser.newBarber.orders || []), order];
  await updateBarberData({ orders: updatedOrders });
  const res = await fetch("/api/order", {
    method: "POST",
    body: JSON.stringify(order),
  });
  if (!res.ok) throw new Error("Failed to register user");
};

const addPickupOrder = async (location, order, userId) => {
  try {
    const res = await fetch("/api/pickup", {
      method: "PUT",
      body: JSON.stringify({ location, order, userId }),
    });

    if (!res.ok) throw new Error("Failed to add pickup order");

    const {orders, user} = await res.json()

      setActiveUser(user);
      const updatedUsers = users.map(u =>
        u._id === user._id ? user : u
      );
      setUsers(updatedUsers);

    setPickupOrders((prev) =>
      prev.map((pickup) =>
        pickup.location.toLowerCase() === location.toLowerCase()
          ? { ...pickup, orders: Array.isArray(orders) ? orders : [] }
          : pickup
      )
    );
  } catch (err) {
    console.error("Add Pickup Order Error:", err);
  }
};

const addItemToCart = (item, quantity) => setCart(cart.concat({product:item, amount:quantity}));
const updateCart = (id, quantity, operation) => {
  setCart(prevCart => {
    return prevCart.map(item => {
      if (item.product.id === id) {
        const updatedAmount =
          operation === 'add'
            ? item.amount + quantity
            : item.amount - quantity;

        return updatedAmount > 0
          ? { ...item, amount: updatedAmount }
          : null; // Mark for removal
      }
      return item;
    }).filter(Boolean); // Remove any nulls (items with amount <= 0)
  });
};

// context function
const changePickupOrderStatus = async (location,orderId,status,amount) => {
  try {
    if (!location || !orderId || !status) {
      throw new Error("Missing location, orderId, or status");
    }

    const payload = { location, orderId, status, amount };

    const res = await fetch("/api/pickup", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Failed to update order status");
    }

    const {order} = await res.json();

    // Update local state without breaking array shape
    setPickupOrders(prevOrders =>
      prevOrders.map(po =>
        po.location.toLowerCase() === location.toLowerCase()
          ? {
              ...po,
              orders: po.orders.map(o =>
                o._id === orderId
                  ? { ...o, ...order }
                  : o
              ),
            }
          : po
      )
    );
  } catch (err) {
    console.error("Change Order Status Error:", err);
  }
};

  return (
    <AuthContext.Provider value={{ users, setUsers, cart, activeUser, activeEmployee, signUp, login, logout, updateUser, updateCustomerData, updateBarberData, addOrder, addPickupOrder, pickupOrders, addItemToCart, changePickupOrderStatus, updateCart, employeeLogin, employees, setPickupOrders}}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
