import React, { useEffect, useState } from "react";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("");
  const [sortOption, setSortOption] = useState("date");

  // Fetch orders from localStorage
  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(storedOrders);
  }, []);

  // Delete an order
  const handleDelete = (orderId) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      const updated = orders.filter((o) => o.orderId !== orderId);
      setOrders(updated);
      localStorage.setItem("orders", JSON.stringify(updated));
    }
  };

  // Filter by customer name
  const filteredOrders = orders.filter((o) => {
    const name = `${o.address?.firstName || ""} ${o.address?.lastName || ""}`.toLowerCase();
    return name.includes(filter.toLowerCase());
  });

  // Sort orders by date or total
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    if (sortOption === "date") {
      return new Date(b.date) - new Date(a.date);
    } else if (sortOption === "total") {
      return b.grandTotal - a.grandTotal;
    }
    return 0;
  });

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6  rounded-2xl shadow">
      <h2 className="text-3xl font-bold text-center mb-6 ">
       Order Track Report
      </h2>

      {/* Filters */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <input
          type="text"
          placeholder="Filter by name"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border rounded-lg px-4 py-2 w-full md:w-1/3"
        />

        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="border rounded-lg px-4 py-2 "
        >
          <option className="bg-gray-100 text-gray-500" value="date">Sort by Date</option>
          <option className="bg-gray-100 text-gray-500" value="total">Sort by Total</option>
        </select>
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 text-sm md:text-base">
          <thead className="bg-gray-100 text-gray-500">
            <tr>
              <th className="p-3 border text-left">User</th>
              <th className="p-3 border text-left">Shipping Address</th>
              <th className="p-3 border text-left">Items</th>
              <th className="p-3 border text-left">Date</th>
              <th className="p-3 border text-left">Total</th>
              <th className="p-3 border text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {sortedOrders.length > 0 ? (
              sortedOrders.map((order) => (
                <tr
                  key={order.orderId}
                
                >
                   <td className="p-3 border">
                    {order.user} 
                  </td>
                  <td className="p-3 border">
                    {order.address?.firstName} {order.address?.lastName}<br></br> {order.address?.address} {order.address?.city}
                 {order.address?.state} <br></br>{order.address?.postalCode}
                  </td>
              <td className="p-3 border">
  {order.items && order.items.length > 0 ? (
    <div className="space-y-2">
      {order.items.map((i, index) => (
        <div
          key={index}
          className="flex items-center gap-3  p-2 rounded-lg"
        >
          <img
            src={i.image}
            alt={i.name}
            className="w-10 h-10 object-cover rounded-md border"
          />
          <div className="flex-1">
            <p className=" font-medium text-sm">{i.name}</p>
            <p className=" text-xs">₹{i.price} × {i.quantity}</p>
          </div>
          <p className="font-semibold text-sm">
            ₹{i.subtotal}
          </p>
        </div>
      ))}
    </div>
  ) : (
    <p className="text-gray-500 italic">No items</p>
  )}
</td>
                  <td className="p-3 border">{order.date}</td>
                  <td className="p-3 border font-semibold">
                    ₹{order.grandTotal}
                  </td>
                  <td className="p-3 border text-center">
                    <button
                      onClick={() => handleDelete(order.orderId)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="text-center text-gray-500 py-6 border"
                >
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderHistory;
