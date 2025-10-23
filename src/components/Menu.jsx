import React from 'react'
import { assets } from "../assets/images/assets"


function Menu({foodItems , category}) {
  return (
   
    <section className='container mx-auto px-4'>
        <h2 className='text-3xl font-bold text-center mb-7 text-(--dark)'>{category ? category : "Our Menu"}</h2> 
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 '>
        {foodItems.map((menu,index)=>(

       
<div key={index} className='bg-white shadow-md rounded-2xl overflow-hidden transition-transform duration-300 hover:scale-105'>
<img src={menu.image}
              alt={menu.name} className='w-full h-48 object-cover' />
<div className='p-4 flex flex-col justify-between h-[180px]'>
    <div>
  <h3 className="text-xl font-semibold text-(--dark) mb-2">
                {menu.name} </h3>
 <div className="flex items-center justify-between mb-3">
  <span className="text-lg font-bold text-(--dark)">
                 ₹{menu.price} </span>
 <div className="flex items-center text-yellow-500">
  
                    <span className="ml-1 text-(--dark)"><img src={assets.rating_starts}></img></span> 
 </div>
 </div>
    </div>
    <button className="w-full py-2 bg-(--dark) text-white hover:text-black font-semibold rounded-md hover:bg-(--secondary) transition">
                Add to Cart 🛒
              </button>
</div>
</div>
  ))}
    </div>
    </section>
  )
}

export default Menu