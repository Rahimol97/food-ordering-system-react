import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from 'react-router-dom';
import {assets} from '../assets/images/assets'
function Checkout() {
  const [address, setAddress] = useState("home");
  const [payment, setPayment] = useState("card");
  const [popup, setPopup] = useState(false);
  const location = useLocation();

  const grandTotal = location.state?.grandTotal || 0;

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center py-12 px-4">
      <div className="w-full max-w-4xl flex flex-col gap-8 mt-16">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Checkout
        </h2>

        <div className="flex flex-col md:flex-row gap-6">
          <div
            className={`flex-1 rounded-2xl p-6 shadow-lg cursor-pointer transition-all ${
              address === "home"
                ? "border-3"
                : ""
            }`}
            onClick={() => setAddress("home")}
          >

            <h3 className="text-lg font-semibold mb-2">Home Address</h3>
            <p className=" leading-relaxed">
              123, 788, MG Road, Palayam, Trivandrum
            </p>
          </div>

          <div
            className={`flex-1 rounded-2xl p-6 shadow-lg cursor-pointer transition-all ${
              address === "office"
                ? "border-3"
                : ""
            }`}
            onClick={() => setAddress("office")}
          >
            <h3 className="text-lg font-semibold mb-2">Office Address</h3>
            <p className=" leading-relaxed">
              45, Tech Park, Whitefield, chennai
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col gap-4">
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

        <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col gap-4">
          <div className="flex font-semibold justify-between text-2xl">
            <span>Grand Total</span>
            <span>₹{grandTotal.toFixed(2)}</span>
          </div>
          <button onClick={()=>setPopup(true)}  className="mt-4 w-full bg-(--dark) mb-1 text-white py-3 rounded-xl font-semibold ">
            Place Order
          </button>
        </div>
      </div>
       {popup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/80">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-80 text-center">
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
            <p className=" mb-6">Track your order</p>
            <button
              onClick={() => setPopup(false)}
              className="bg-(--dark) text-white py-2 px-5 rounded-md "
            >
              <Link to ='/'>Continue to shopping</Link>
            </button>
          </div>
        </div>
       )}
    </div>
  );
}

export default Checkout;
