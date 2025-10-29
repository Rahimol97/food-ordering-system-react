import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom';
import { assets } from "../assets/images/assets"
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ChevronDown,Sun, Moon } from "lucide-react"; 

function Navbar() {
const navigate =useNavigate();
const [isDark, setIsDark] = useState(false);
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

const [open, setOpen] =useState(false);
const [useropen,setUseropen] = useState(false)
  const count = useSelector((state) => state.cart.items);
const totalItems = Object.values(count).reduce((a, b) => a + b, 0);

 useEffect(() => {
    if (isDark) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDark]);


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
            <Sun className="w-7 h-7 text-yellow-400" />
            
          </>
        ) : (
          <>
            <Moon className="w-7 h-7 text-dark" />
           
          </>
        )}
      </button>
     {user ? (
          <div className="relative">
      <button
        onClick={() => setUseropen(!useropen)}
        className="flex items-center mr-3 cursor-pointer group"
      >
        <img
          src={assets.profileicon}
          alt="Profile"
          className="w-8 h-8 rounded-full "
        />
        <ChevronDown
          className={`transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {useropen && (
        <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-100 z-50">
          <div className="px-4 py-2 text-gray-800 border-b border-gray-200">
            {user.username}
          </div>
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 rounded-b-lg"
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
  
  <ul className='hidden md:flex gap-8 text-lg'>
    <li className='hover:text-(--accent) cursor-pointer transition'><Link to="/">Home</Link></li>
    <li className='hover:text-(--accent) cursor-pointer transition'><Link to="/orders">My Orders</Link></li>
          <li className="hover:text-(--accent) cursor-pointer transition"><Link to="/about">About</Link></li>
          <li className="hover:text-(--accent) cursor-pointer transition"><Link to="/contact">Contact</Link></li>
              <li className='hover:text-(--accent) cursor-pointer transition'><Link to="/admin">Admin</Link></li>

         
          <li className=" cursor-pointer  transition group"><button onClick={handleCartClick} className='relative'><img  className="w-8 h-8 transition duration-300 filter invert brightness-0 saturate-0 group-hover:brightness-150 group-hover:sepia group-hover:saturate-200 group-hover:hue-rotate-20 group-hover:contrast-125" src={assets.basket_icon} />
           {totalItems  > 0  &&(
            <span className="absolute -top-2 -right-3 w-6 h-6 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
              {totalItems}
            </span>
                )}
          </button></li>

                <button
        onClick={() => setIsDark(!isDark)}
        className="flex items-center  rounded-lg  dark:bg-gray-700 hover:opacity-90 transition"
      >
        {isDark ? (
          <>
            <Sun className="w-8 h-8 text-yellow-400" />
            
          </>
        ) : (
          <>
            <Moon className="w-8 h-8 text-dark" />
           
          </>
        )}
      </button>


 {user ? (
                 <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 cursor-pointer group"
      >
        <img
          src={assets.profileicon}
          alt="Profile"
          className="w-10 h-10 rounded-full  "
        />
        <ChevronDown
          className={`transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg  z-50">
          <div className="px-4 py-2 text-gray-800 border-b ">
            {user.username}
          </div>
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-sm text-red-600  rounded-b-lg cursor-pointer" 
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
<button className='md:hidden text-(--secondary) text-3xl' onClick={()=>setOpen(!open)}>
    { open ? "✕" : "☰" }
</button>

</div>
 <div className={`md:hidden bg-(--dark) text-(--light) transition-all duration-300 overflow-hidden ${open ?  "max-h-60" : "max-h-0"
        }`}>
            <ul className="flex flex-col items-center gap-4 py-4">
          <li className="hover:text-(--accent) cursor-pointer transition"><Link to="/">Home</Link></li>
           <li className='hover:text-(--accent) cursor-pointer transition'><Link to="/orders">My Orders</Link></li>

          <li className="hover:text-(--accent) cursor-pointer transition"><Link to="/about">About</Link></li>
          <li className="hover:text-(--accent) cursor-pointer transition"><Link to="/contact">Contact</Link></li>
    <li className='hover:text-(--accent) cursor-pointer transition'><Link to="/admin">Admin</Link></li>

        </ul>
     </div>   


    </nav>
  )
}

export default Navbar