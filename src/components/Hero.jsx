import React,{useState} from 'react'
import {assets} from "../assets/images/assets"
import { FaSearch } from "react-icons/fa" 

function Hero({searchfood}) {
const [search , setSearch] =useState("");

const handleChange =(e)=>{
  const term = e.target.value
  setSearch(term);
  searchfood(term)
}

  return (
    <section className='w-screen h-[50vh] bg-cover bg-center relative flex items-center justify-center ' style={{
        backgroundImage: `url(${assets.header_img})`}}>
  <div className="absolute inset-0 bg-black/50"></div>
 <div className="relative z-10 text-center px-4 md:px-9">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-3">
          Find Your Favorite Food
        </h1>
        <p className="text-white text-lg md:text-xl mb-4">
          Discover delicious meals near you
        </p>
        <form
        onSubmit={(e)=>e.preventDefault()}
          className="flex flex-col md:flex-row justify-center items-center gap-4"
        >
           <div className="relative w-full md:w-96">
      <input
  type="text" onChange={handleChange}  value={search}
  placeholder="Search for food..."
  className="w-full md:w-96 px-4 py-3 rounded-md border-2 text-xl text-white border-(--accent) outline-none focus:border-(--dark) focus:ring-2 focus:ring-(--dark) transition"
/>
<FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-white text-lg opacity-70 pointer-events-none" />
         
</div>
         
          </form>
        </div>
    </section>
  )
}

export default Hero