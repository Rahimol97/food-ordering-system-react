import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { assets, food_list } from '../assets/images/assets'
import { useSelector } from "react-redux";
import { Edit2 } from "lucide-react";


function Checkout() {
  const [address, setAddress] = useState("home");
  const [payment, setPayment] = useState("card");
  const [popup, setPopup] = useState(false);
  const [saveAddress, setSaveAddress] = useState({});

  const count = useSelector((state) => state.cart.items); // selected food items count

  const storedProducts = JSON.parse(localStorage.getItem("customProducts")) || []; 
  const allFoods = [...food_list, ...storedProducts];

  const cartItems = allFoods.filter((item) => count[item._id] > 0); 
  

  //calculate grandtotal
    const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * count[item._id],
    0
  );
  const shipping = subtotal > 0 ? 40 : 0;
  const tax = subtotal * 0.05;
  const grandTotal = subtotal + shipping + tax;
  
  //filter the food items by food id
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
//default address 
  const defaultAddresses = {
    home: {
      firstName: "swathi",
      lastName: "das",
      phone : "00087690654",
      address: "123, MG Road, Palayam",
      city: "Trivandrum",
      state: "Kerala",
      postalCode: "695001",
    },
    office: {
      firstName: "swathi",
      lastName: "das",
      phone : "00087690654",
      address: "45, Tech Park, Whitefield",
      city: "Chennai",
      state: "Tamil Nadu",
      postalCode: "600001",
    },
  };

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("shippingAddress")) || {}; 

    // Merge defaults if missing
    const merged = {
      home: stored.home || defaultAddresses.home,
      office: stored.office || defaultAddresses.office,
    };

    setSaveAddress(merged);
    localStorage.setItem("shippingAddress", JSON.stringify(merged));
  }, []);

  const selectedAddress =
    address === "home" ? saveAddress.home : saveAddress.office;

  const handlePlaceOrder = () => {
    const orderId = Date.now();
    const now = new Date();
    const formattedDate = now.toLocaleString();




    const newOrder = {
      orderId,
      user: user.username,
      date: formattedDate,
      address: selectedAddress,
      payment: payment,
      items: cartItems.map((item) => ({
        name: item.name,
        image: item.image,
        price: item.price,
        quantity: count[item._id],
        subtotal: item.price * count[item._id],
      })),
      grandTotal,

    };

    // Save to localStorage
    const existingOrders = JSON.parse(localStorage.getItem("orders")) || []; //get already stored orders from local storage

    localStorage.setItem("orders", JSON.stringify([...existingOrders, newOrder])); // set orders in local storage 

    // Show success popup
    setPopup(true);
  };





  return (
    <div className="min-h-screen  flex justify-center py-12 px-4">
      <div className="w-full max-w-4xl flex flex-col gap-8 mt-16">
        <h2 className="text-3xl font-bold text-center">
          Checkout
        </h2>

        <div className="flex  flex-col md:flex-row gap-6">
          <div
            className={`flex-1 bg-white text-(--dark) rounded-2xl p-6 shadow-lg cursor-pointer transition-all ${address === "home"
                ? "border-3"
                : ""
              }`}
            onClick={() => setAddress("home")}
          >
            <div className="flex justify-between items-center mb-2 ">
              <h3 className="text-lg font-semibold mb-2">Home Address</h3>
              <Link to="/shipaddress?type=home" >
                <Edit2 className="w-5 h-5 text-gray-600 hover:text-(--dark) transition" />
              </Link>
            </div>
            <p className="leading-relaxed">
              {saveAddress?.home &&
                `${saveAddress.home.firstName} ${saveAddress.home.lastName}, ${saveAddress.home.address}, ${saveAddress.home.city}, ${saveAddress.home.state}, ${saveAddress.home.postalCode}`}
            </p>

          </div>

          <div
            className={`flex-1 bg-white text-(--dark) rounded-2xl p-6 shadow-lg cursor-pointer transition-all ${address === "office"
                ? "border-3"
                : ""
              }`}
            onClick={() => setAddress("office")}
          >
            <div className="flex justify-between items-center mb-2 ">
              <h3 className="text-lg font-semibold mb-2">Office Address</h3>
              <Link to="/shipaddress?type=office" >
                <Edit2 className="w-5 h-5 text-gray-600 hover:text-(--dark) transition" />
              </Link>
            </div>
            <p className="leading-relaxed">
              {saveAddress?.office &&
                `${saveAddress.office.firstName} ${saveAddress.office.lastName}, ${saveAddress.office.address}, ${saveAddress.office.city}, ${saveAddress.office.state}, ${saveAddress.office.postalCode}`}
            </p>
          </div>
        </div>

        <div className="bg-white text-(--dark) rounded-2xl shadow-md p-6 flex flex-col gap-4">
          <h3 className="text-xl font-semibold">Payment Methods</h3>
          <div className="flex flex-col gap-3">
            {["card", "cod", "gpay", "wallet"].map((method) => (
              <label key={method} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value={method}
                  checked={payment === method}
                  onChange={() => setPayment(method)}
                  className="accent-(--dark)"
                />
                <span>{method === "cod" ? "Cash on Delivery" : method}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="bg-white text-(--dark) rounded-2xl shadow-md p-6 flex flex-col gap-4">
          <div className="flex font-semibold justify-between text-2xl">
            <span>Grand Total</span>
            <span>₹{grandTotal.toFixed(2)}</span>
          </div>
          <button onClick={handlePlaceOrder} className="mt-4 w-full bg-(--dark) mb-1 text-white py-3 rounded-xl font-semibold cursor-pointer">
            Place Order
          </button>
        </div>
      </div>
      {popup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/80">
          <div className="bg-white text-(--dark) rounded-2xl shadow-2xl p-8 w-80 text-center">
            <div className="flex justify-center">
              <img
                src={assets.ordersuccess}
                alt="Order Success"
                className="object-contain w-30 h-30 "
              />
            </div>
            <h3 className="text-xl font-bold mb-3">
              Order Placed Successfully
            </h3>
            <Link to='/ordertrack'> <p className="underline mb-6">Track your order .</p></Link>
            <button
              onClick={() => setPopup(false)}
              className="bg-(--dark) text-white py-2 px-5 rounded-md "
            >
              <Link to='/'>Continue shopping</Link>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Checkout;
