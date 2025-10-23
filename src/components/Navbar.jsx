import React,{useState} from 'react'
import { Link } from 'react-router-dom';
import { assets } from "../assets/images/assets"

function Navbar() {

const [open, setOpen] =useState(false);


  return (
    <nav className="bg-(--dark) text-(--light) shadow-lg fixed top-0 left-0 w-full z-50 ">
<div className="container mx-auto flex justify-between items-center px-6 py-4">
  <h1 className="text-2xl font-bold text-(--secondary)"><Link to="/">FoodFinder</Link></h1>
  <ul className='hidden md:flex gap-8 text-lg'>
    <li className='hover:text-(--accent) cursor-pointer transition'><Link to="/">Home</Link></li>
          <li className="hover:text-(--accent) cursor-pointer transition"><Link to="/about">About</Link></li>
          <li className="hover:text-(--accent) cursor-pointer transition"><Link to="/contact">Contact</Link></li>
          <li className="hover:text-(--accent) cursor-pointer  transition"><Link to="/cart"><img   src={assets.basket_icon} /></Link></li>
          <li className="bg-(--secondary) text-(--dark) px-3 py-1 rounded-md hover:bg-(--accent) transition cursor-pointer">
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
          <li className="hover:text-(--accent) cursor-pointer transition"><Link to="/cart">cart</Link></li>
          <li className="bg-(--secondary) text-(--dark) px-4 py-2 rounded-md hover:bg-(--accent) transition cursor-pointer">
            Register / Login
          </li>
        </ul>
     </div>   


    </nav>
  )
}

export default Navbar