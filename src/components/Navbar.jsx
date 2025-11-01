import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { assets } from "../assets/images/assets"
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, Sun, Moon, ShoppingBag } from "lucide-react";

function Navbar() {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(false);
  const user = JSON.parse(localStorage.getItem("loggedInUser")); //get current user

  const Orders = JSON.parse(localStorage.getItem("orders")) || []; // get all orders from local storage

  const userOrderCount = user ? Orders.filter(
    (order) => order.user === user.username
  ).length : 0;                                    

  const [open, setOpen] = useState(false);
  const [useropen, setUseropen] = useState(false)
  const count = useSelector((state) => state.cart.items);

  const totalItems = Object.values(count).reduce((a, b) => a + b, 0);

  useEffect(() => {
    if (isDark) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDark]);


  const handleNavigateClick = (destination) => {
    if (!user) {
      navigate("/account");
      return
    }
    switch (destination) {
      case "cart":
        navigate("/cart");
        break;
      case "admin":
        navigate("/admin");
        break;
      case "orders":
        navigate("/orders");
        break;
      default:
        navigate("/");
    }


  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/account");
  };

  return (
    <nav className="bg-(--dark) text-(--light) shadow-lg fixed top-0 left-0 w-full z-50 ">
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        <h1 className="text-2xl font-bold text-(--secondary)"><Link to="/">FoodFinder</Link></h1>

        <div className=" flex items-end md:hidden gap-6 ml-6">

          {/* Basket icon */}
          <button
            onClick={() => handleNavigateClick("cart")}
            className="relative transition group focus:outline-none"
          >      <img
              src={assets.basket_icon}
              alt="Cart"
              className="ml-8 w-7 h-7 filter brightness-100 sepia saturate-250 hue-rotate-30 contrast-70"
            />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-3 w-7 h-7 bg-red-500 text-white text-md font-bold rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
          <button
            onClick={() => setIsDark(!isDark)}
            className="flex items-center  rounded-lg  hover:opacity-90 transition"
          >
            {isDark ? (
              <>
                <Sun className="w-6 h-6 text-yellow-400" />

              </>
            ) : (
              <>
                <Moon className="w-6 h-6 text-white" />

              </>
            )}
          </button>
          {user ? (
            <div className="relative">
              {/* Profile Button */}
              <button
                onClick={() => setUseropen(!useropen)}
                className="flex items-center gap-2 cursor-pointer group"
              >
                <img
                  src={assets.profileicon}
                  alt="Profile"
                  className="w-8 h-8 rounded-full   shadow-md "
                />
                <ChevronDown
                  className={`transition-transform duration-200 text-white ${useropen ? "rotate-180" : ""
                    }`}
                />
              </button>

              {/* Dropdown Menu */}
              {useropen && user && (
                <div className="absolute right-0 mt-3 w-72 bg-white text-black text-xl rounded-2xl shadow-xl border  overflow-hidden z-50">
                  {/* Header */}
                  <div className="flex items-center gap-3 px-5 py-4 ">

                    <div>
                      <p className=" font-semibold">{user.username}</p>
                      <p className="text-sm opacity-90">{user.email}</p>
                    </div>
                  </div>

                  {/* Order Info */}
                  <div className="px-5 py-4 text-sm text-gray-700 bg-gray-50 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ShoppingBag className="text-(--dark)" size={18} />
                      <span className="font-medium text-(--dark) text-2xl">Total Orders</span>
                    </div>
                    <span className="font-bold text-(--dark) text-2xl">{userOrderCount}</span>
                  </div>

                  {/* Logout Button */}
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-5 py-3 text-red-600 font-medium hover:bg-red-50 border-t border-gray-100 transition"
                  >
                    Logout
                  </button>
                </div>
              )}

            </div>
          ) : (
            <button
              onClick={() => navigate("/account")}
              className=" bg-(--secondary) text-(--dark) px-3 rounded-md hover:bg-(--accent) transition cursor-pointer"
            >
              Login
            </button>
          )}

        </div>

        <ul className='hidden md:flex items-center gap-8 text-lg'>
          <li className='hover:text-(--accent) cursor-pointer transition'><Link to="/">Home</Link></li>
          <li className='hover:text-(--accent) cursor-pointer transition'><button onClick={() => handleNavigateClick("orders")}>My Orders</button> </li>
          <li className="hover:text-(--accent) cursor-pointer transition"><Link to="/about">About</Link></li>
          <li className="hover:text-(--accent) cursor-pointer transition"><Link to="/contact">Contact</Link></li>
          <li className='hover:text-(--accent) cursor-pointer transition'><button onClick={() => handleNavigateClick("admin")}>Admin</button> </li>


          <li className=" cursor-pointer  transition group"><button onClick={() => handleNavigateClick("cart")} className='relative'><img className="w-8 h-8 transition duration-300 filter invert brightness-0 saturate-0 group-hover:brightness-150 group-hover:sepia group-hover:saturate-200 group-hover:hue-rotate-20 group-hover:contrast-125" src={assets.basket_icon} />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-3 w-6 h-6 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button></li>

          <button
            onClick={() => setIsDark(!isDark)}
            className="flex items-center  rounded-lg   hover:opacity-90 transition"
          >
            {isDark ? (
              <>
                <Sun className="w-8 h-8   text-yellow-400" />

              </>
            ) : (
              <>
                <Moon className="w-8 h-8 text-white" />

              </>
            )}
          </button>


          {user ? (
            <div className="relative">
              {/* Profile Button */}
              <button
                onClick={() => setUseropen(!useropen)}
                className="flex items-center gap-2 cursor-pointer group"
              >
                <img
                  src={assets.profileicon}
                  alt="Profile"
                  className="w-7 h-7 rounded-full   shadow-md "
                />
                <ChevronDown
                  className={`transition-transform duration-200 text-white ${useropen ? "rotate-180" : ""
                    }`}
                />
              </button>

              {/* Dropdown Menu */}
              {useropen && user && (
                <div className="absolute right-0 mt-3 w-72 bg-white text-black text-xl rounded-2xl shadow-xl border  overflow-hidden z-50">
                  {/* Header */}
                  <div className="flex items-center gap-3 px-5 py-4 ">

                    <div>
                      <p className=" font-semibold">{user.username}</p>
                      <p className="text-sm opacity-90">{user.email}</p>
                    </div>
                  </div>

                  {/* Order Info */}
                  <div className="px-5 py-4 text-sm text-gray-700 bg-gray-50 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ShoppingBag className="text-(--dark)" size={18} />
                      <span className="font-medium text-(--dark) text-2xl">Total Orders</span>
                    </div>
                    <span className="font-bold text-(--dark) text-2xl">{userOrderCount}</span>
                  </div>

                  {/* Logout Button */}
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-5 py-3 text-red-600 font-medium hover:bg-red-50 border-t border-gray-100 transition"
                  >
                    Logout
                  </button>
                </div>
              )}

            </div>
          ) : (
            <button
              onClick={() => navigate("/account")}
              className="bg-(--secondary) text-(--dark) px-4 py-3 rounded-md hover:bg-(--accent) transition cursor-pointer"
            >
              Login
            </button>
          )}



        </ul>
        {/* Mobile */}
        <button className='md:hidden text-(--secondary) text-3xl' onClick={() => setOpen(!open)}>
          {open ? "✕" : "☰"}
        </button>

      </div>
      <div className={`md:hidden bg-(--dark) text-(--light) transition-all duration-300 overflow-hidden ${open ? "max-h-60" : "max-h-0"
        }`}>
        <ul className="flex flex-col items-center gap-4 py-4">
          <li className="hover:text-(--accent) cursor-pointer transition"><Link to="/">Home</Link></li>
          <li className='hover:text-(--accent) cursor-pointer transition'><button onClick={() => handleNavigateClick("orders")}>My Orders</button> </li>

          <li className="hover:text-(--accent) cursor-pointer transition"><Link to="/about">About</Link></li>
          <li className="hover:text-(--accent) cursor-pointer transition"><Link to="/contact">Contact</Link></li>
          <li className='hover:text-(--accent) cursor-pointer transition'><button onClick={() => handleNavigateClick("admin")}>Admin</button></li>

        </ul>
      </div>


    </nav>
  )
}

export default Navbar