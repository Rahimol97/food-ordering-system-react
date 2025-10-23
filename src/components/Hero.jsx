import React from 'react'
import {assets} from "../assets/images/assets"
function Hero() {
  return (
    <section className='w-screen h-[50vh] bg-cover bg-center relative flex items-center justify-center ' style={{
        backgroundImage: `url(${assets.header_img})`}}>
  <div className="absolute inset-0 bg-black/50"></div>
 <div className="relative z-10 text-center px-4 md:px-9">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-3">
          Find Your Favorite Foods
        </h1>
        <p className="text-white text-lg md:text-xl mb-4">
          Discover delicious meals near you
        </p>
        <form
        
          className="flex flex-col md:flex-row justify-center items-center gap-4"
        >
      <input
  type="text"
  placeholder="Search for food..."
  className="w-full md:w-96 px-4 py-3 rounded-md border-2 border-(--accent) outline-none focus:border-(--dark) focus:ring-2 focus:ring-(--dark) transition"
/>

          <button
            type="submit"
            className="px-6 py-3 bg-(--accent) text-white rounded-md hover:bg-(--dark) transition"
          >
            Search
          </button>
          </form>
        </div>
    </section>
  )
}

export default Hero