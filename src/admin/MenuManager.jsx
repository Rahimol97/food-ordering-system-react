import React, { useEffect, useState } from "react";
import { food_list } from "../assets/images/assets";

const categories = [
  "Salad",
  "Rolls",
  "Deserts",
  "Sandwich",
  "Cake",
  "Pure Veg",
  "Pasta",
  "Noodles",
];

const MenuManager = () => {
  const [product, setProduct] = useState({
    _id: "",
    name: "",
    price: "",
    category: "",
    image: "",
    description: "",
  });

  const [products, setProducts] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  // Load products from localStorage + static list
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("customProducts")) || [];
    setProducts([...food_list, ...stored]);
  }, []);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProduct({ ...product, image: reader.result });
    };
    if (file) reader.readAsDataURL(file);
  };

  const handleAddOrUpdate = () => {
    if (!product.name || !product.price || !product.category) {
      alert("Please fill all required fields!");
      return;
    }

    const stored = JSON.parse(localStorage.getItem("customProducts")) || [];

    if (editIndex !== null) {
      stored[editIndex - food_list.length] = product;
      alert("Menu updated successfully!");
    } else {
      stored.push({ ...product, _id: Date.now() });
      alert("Menu added successfully!");
    }

    localStorage.setItem("customProducts", JSON.stringify(stored));
    setProducts([...food_list, ...stored]);
    setProduct({
      _id: "",
      name: "",
      price: "",
      category: "",
      image: "",
      description: "",
    });
    setEditIndex(null);
  };

  const handleEdit = (index) => {
    const selected = products[index];
    setProduct(selected);
    setEditIndex(index);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (index) => {
    if (index < food_list.length) {
      alert("Cannot remove static product!");
      return;
    }

    const stored = JSON.parse(localStorage.getItem("customProducts")) || [];
    stored.splice(index - food_list.length, 1);
    localStorage.setItem("customProducts", JSON.stringify(stored));
    setProducts([...food_list, ...stored]);
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-6  shadow-md rounded-2xl p-6">
      <h2 className="text-2xl font-bold text-center mb-6 ">
        {editIndex !== null ? "Edit Menu Item" : "Add Menu Item"}
      </h2>

      {/* Form Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          name="name"
          value={product.name}
          onChange={handleChange}
          placeholder="Menu Name"
          className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-(--dark)"
        />
        <input
          name="price"
          value={product.price}
          onChange={handleChange}
          placeholder="Price"
          type="text"
          className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-(--dark)"
        />
        <select
          name="category"
          value={product.category}
          onChange={handleChange}
          className="border border-gray-300 p-3 rounded-lg col-span-1 sm:col-span-2 focus:outline-none focus:ring-2 focus:ring-(--dark)"
        >
          <option value="">Select Category</option>
          {categories.map((c, i) => (
            <option key={i} value={c}>
              {c}
            </option>
          ))}
        </select>

        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="border border-gray-300 p-3 rounded-lg col-span-1 sm:col-span-2"
        />

        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          placeholder="Description"
          className="border border-gray-300 p-3 rounded-lg col-span-1 sm:col-span-2 focus:outline-none focus:ring-2 focus:ring-(--dark)"
          rows="3"
        />
      </div>

      <button
        onClick={handleAddOrUpdate}
        className="bg-(--dark) text-white w-full mt-6 py-3 rounded-lg font-semibold hover:opacity-90 transition"
      >
        {editIndex !== null ? "Update Menu" : "Add Menu"}
      </button>

      {/* Product List */}
      <h3 className="text-xl font-semibold mt-8 mb-3 ">
        Menu List
      </h3>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 text-sm md:text-base rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3 border text-left font-semibold">Image</th>
              <th className="p-3 border text-left font-semibold">Name</th>
              <th className="p-3 border text-left font-semibold">Category</th>
              <th className="p-3 border text-left font-semibold">Price</th>
              <th className="p-3 border text-center font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p, i) => (
              <tr
                key={i}
                className="transition-all duration-300  hover:shadow-md hover:scale-[1.01]"
              >
                <td className="p-3 border text-center">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-12 h-12 mx-auto object-cover rounded-lg"
                  />
                </td>
                <td className="p-3 border">{p.name}</td>
                <td className="p-3 border">{p.category}</td>
                <td className="p-3 border font-medium ">
                  ₹{p.price}
                </td>
                <td className="p-3 border text-center space-x-2">
                  <button
                    onClick={() => handleEdit(i)}
                    className="bg-(--dark) text-white px-3 py-1 rounded-lg text-sm hover:opacity-90 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(i)}
                    className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm hover:opacity-90 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default MenuManager;
