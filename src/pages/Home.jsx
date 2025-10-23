import React from 'react'
import Hero from '../components/Hero'
import { menu_list } from "../assets/images/assets"
import Menu from '../components/Menu'
function Home() {
  return (
    <div>
       {/* Hero Section */}
      <Hero />

       {/* Category Section */}
       <section className='container mx-auto px-4 py-16'>
<h2 className='text-3xl font-bold text-center mb-10 text-(--dark)'>
  Categories
</h2>
<div className='grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 gap-3 justify-center'>
  {menu_list.map((category,index) =>(


  
  <div className='flex flex-col items-center group cursor-pointer'>
<div className="w-32 h-32 rounded-full overflow-hidden shadow-md border-4 border-(--accent) transition-transform duration-300 group-hover:scale-105">
                <img
                 src={category.menu_image} alt={category.menu_name}
                  className="w-full h-full object-cover"
                />
              </div> 
   <p className="mt-4 text-lg font-semibold text-(--dark) group-hover:text-(--accent) transition">
             {category.menu_name}
              </p>

</div>
 ))}

</div>
       </section>
       <Menu />
    </div>
  )
}

export default Home