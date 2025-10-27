import React,{useState} from 'react'
import { Link } from 'react-router-dom';
import { assets } from "../assets/images/assets"
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


function Navbar() {
const navigate =useNavigate();
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
console.log(user)
const [open, setOpen] =useState(false);
  const count = useSelector((state) => state.cart.items);
const totalItems = Object.values(count).reduce((a, b) => a + b, 0);
console.log(count)

 const handleCartClick = () => {
    if (user) {
      navigate("/cart");
    } else {
      navigate("/account"); 
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
      onClick={handleCartClick}
      className="relative transition group focus:outline-none"
    >      <img
        src={assets.basket_icon}
        alt="Cart"
className="ml-8 w-10 h-10 filter brightness-100 sepia saturate-250 hue-rotate-30 contrast-70"
      />
      {totalItems > 0 && (
            <span className="absolute -top-2 -right-3 w-7 h-7 bg-red-500 text-white text-md font-bold rounded-full flex items-center justify-center">
              {totalItems}
            </span>
                )}
    </button>
     {user ? (
          <button
            onClick={handleLogout}
           className="relative group cursor-pointer" 
          >
           <img src={assets.profileicon}
        alt="Cart"
className=" w-10 h-10 filter brightness-100 sepia saturate-250 hue-rotate-30 contrast-70"
      />
      <span
    className="absolute   -translate-x-1/5 mb-3 px-2 py-1 text-sm text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
  >
    Logout
  </span>
          </button>
        ) : (
          <button
            onClick={() => navigate("/account")}
            className="bg-(--secondary) text-(--dark) px-3 py-2 rounded-md hover:bg-(--accent) transition cursor-pointer"
          >
           Login
          </button>
        )}
  </div>
  
  <ul className='hidden md:flex gap-8 text-lg'>
    <li className='hover:text-(--accent) cursor-pointer transition'><Link to="/">Home</Link></li>
          <li className="hover:text-(--accent) cursor-pointer transition"><Link to="/about">About</Link></li>
          <li className="hover:text-(--accent) cursor-pointer transition"><Link to="/contact">Contact</Link></li>
          <li className=" cursor-pointer  transition group"><button onClick={handleCartClick} className='relative'><img  className="w-8 h-8 transition duration-300 filter invert brightness-0 saturate-0 group-hover:brightness-150 group-hover:sepia group-hover:saturate-200 group-hover:hue-rotate-20 group-hover:contrast-125" src={assets.basket_icon} />
           {totalItems  > 0  &&(
            <span className="absolute -top-2 -right-3 w-6 h-6 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
              {totalItems}
            </span>
                )}
          </button></li>
 {user ? (
          <button
            onClick={handleLogout}
           className="relative group cursor-pointer" 
          >
           <img src={assets.profileicon}
        alt="Cart"
className=" w-10 h-10 filter brightness-100 sepia saturate-250 hue-rotate-30 contrast-70"
      />
      <span
    className="absolute   -translate-x-1/5 mb-3 px-2 py-1 text-sm text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
  >
    Logout
  </span>
          </button>
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
<button className='md:hidden text-(--secondary) text-3xl' onClick={()=>setOpen(!open)}>
    { open ? "✕" : "☰" }
</button>

</div>
 <div className={`md:hidden bg-(--dark) text-(--light) transition-all duration-300 overflow-hidden ${open ?  "max-h-60" : "max-h-0"
        }`}>
            <ul className="flex flex-col items-center gap-4 py-4">
          <li className="hover:text-(--accent) cursor-pointer transition"><Link to="/">Home</Link></li>
          <li className="hover:text-(--accent) cursor-pointer transition"><Link to="/about">About</Link></li>
          <li className="hover:text-(--accent) cursor-pointer transition"><Link to="/contact">Contact</Link></li>
        </ul>
     </div>   


    </nav>
  )
}

export default Navbar