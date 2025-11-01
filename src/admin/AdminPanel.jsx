import React, { useState } from "react";
import MenuManager from "./MenuManager";
import AccountManager from "./AccountManager";
import OrdersManager from "./OrdersManager";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("addProduct");

  return (
    <div className="min-h-screen  flex flex-col items-center pt-20 px-4">
      <div className="w-full max-w-6xl  shadow-md rounded-xl flex flex-col sm:flex-row justify-between items-center p-4 mb-6">
        <h2 className="text-2xl font-bold  mb-2 sm:mb-0">
          Admin Panel
        </h2>


        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={() => setActiveTab("addProduct")}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${activeTab === "addProduct"
                ? "bg-(--dark) text-white shadow"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
          >
            Add Menu
          </button>
          <button
            onClick={() => setActiveTab("userlist")}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${activeTab === "userlist"
                ? "bg-(--dark) text-white shadow"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
          >
            User List
          </button>
          <button
            onClick={() => setActiveTab("orderlist")}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${activeTab === "orderlist"
                ? "bg-(--dark) text-white shadow"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
          >
            Order List
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-6xl  shadow-md rounded-xl p-6">
        {activeTab === "addProduct" && <MenuManager />}
        {activeTab === "userlist" && <AccountManager />}
        {activeTab === "orderlist" && <OrdersManager />}
      </div>
    </div>
  );
};

export default Admin;
