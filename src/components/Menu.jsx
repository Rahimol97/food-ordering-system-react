import React ,{useState} from 'react'
import { assets } from "../assets/images/assets"


function Menu({ foodItems, category, search }) {
const [count,setCount] =useState({});


  return (

    <section className='container mx-auto px-4'>
      <h2 className='text-3xl font-bold text-center mb-7 text-(--dark)'>{category ? category : search ? `Search Results` : "Our Menu"}</h2>

      {foodItems.length === 0 ? (
        <p className="text-center text-xl text-(--dark) py-10">
          No match found 😔
        </p>
      ) : (


        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 '>
          {foodItems.map((menu, index) => (

            <div key={index} className='bg-white shadow-md rounded-2xl overflow-hidden transition-transform duration-300 hover:scale-105'>
              <img src={menu.image}
                alt={menu.name} className='w-full h-48 object-cover' />
              <div className='p-3 flex flex-col justify-between h-[110px]'>
                <div>
                   <div className='flex justify-between items-center mb-2'>
                  <h3 className="text-xl font-semibold text-(--dark) mb-2">
                    {menu.name} </h3>
                     <div className="flex items-center gap-2 overflow-hidden">
                  <button
                   onClick={()=>setCount(prev =>({...prev, [menu._id]:prev[menu._id]>0 ? prev[menu._id]-1:0}))}
                   className="w-7 h-10 flex items-center justify-center transition"
                  >
                   <img src={assets.remove_icon_red} alt="add icon"/>
                  </button>
                  <span className="w-6 h-8 flex items-center justify-center  text-(--dark) font-semibold">
                  {count[menu._id] || 0}
                  </span>
                  <button
                   onClick={()=>setCount(prev =>({...prev,[menu._id]:(prev[menu._id] || 0) + 1})) }
                     className="w-7 h-10 flex items-center justify-center transition"
                  
                  >
                  <img src={assets.add_icon_green} alt="add icon"/>
 
                  </button>
                </div>
                </div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-lg font-bold text-(--orange)">
                      ₹{menu.price}0.00 </span>
                    <div className="flex items-center text-yellow-500">

                      <span className="ml-1 text-(--dark)"><img src={assets.rating_starts}></img></span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default Menu