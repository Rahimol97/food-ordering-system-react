import React,{useState} from 'react'
import { Link } from 'react-router-dom';
import { assets } from "../assets/images/assets"

function Navbar() {

const [open, setOpen] =useState(false);


  return (
    <nav className="bg-(--dark) text-(--light) shadow-lg fixed top-0 left-0 w-full z-50 ">
<div className="container mx-auto flex justify-between items-center px-6 py-4">
  <h1 className="text-2xl font-bold text-(--secondary)"><Link to="/">FoodFinder</Link></h1>
   <div className="flex items-end md:hidden gap-2">
    
    {/* Basket icon */}
    <Link to="/cart" className="transition group">
      <img
        src={assets.basket_icon}
        alt="Cart"
className="ml-8 w-8 h-8 filter brightness-100 sepia saturate-250 hue-rotate-30 contrast-70"
      />
    </Link>
  </div>
  
  <ul className='hidden md:flex gap-8 text-lg'>
    <li className='hover:text-(--accent) cursor-pointer transition'><Link to="/">Home</Link></li>
          <li className="hover:text-(--accent) cursor-pointer transition"><Link to="/about">About</Link></li>
          <li className="hover:text-(--accent) cursor-pointer transition"><Link to="/contact">Contact</Link></li>
          <li className=" cursor-pointer  transition group"><Link to="/cart"><img  className="w-6 h-6 transition duration-300 filter invert brightness-0 saturate-0 group-hover:brightness-150 group-hover:sepia group-hover:saturate-200 group-hover:hue-rotate-20 group-hover:contrast-125" src={assets.basket_icon} /></Link></li>
   <li className="bg-(--secondary) text-(--dark) px-4 py-2 rounded-md hover:bg-(--accent) transition cursor-pointer">
            Register / Login
          </li>
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