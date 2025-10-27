import React from 'react'
import {assets} from "../assets/images/assets"
function About() {
  return (
          <section className='w-full min-h-screen bg-cover bg-center relative flex flex-col items-center '>
         <div className="w-full h-[50vh] bg-cover bg-center relative flex items-center justify-center"
           style={{ backgroundImage: `url(${assets.header_img})` }}
         >
  
   </div>
   <div className="max-w-4xl mx-auto px-6 py-10 text-center">
      <h1 className="text-3xl font-bold text-[var(--dark)] mb-6">
        About FoodFinder
      </h1>

      <p className="text-lg text-gray-700 leading-relaxed">
        <strong>FoodFinder</strong> is a user-friendly food ordering application
        designed to make your dining experience simple and enjoyable. With
        FoodFinder, customers can easily browse and order food online through a
        clean and intuitive interface. The app allows users to filter meals by
        category, search for specific dishes, manage their cart, and place
        orders effortlessly. Developed using the{" "}
        <strong>React framework</strong> and <strong>Tailwind CSS</strong>,
        FoodFinder ensures smooth performance, responsive design, and an
        attractive layout. Our goal is to provide customers with a fast,
        reliable, and enjoyable way to discover and order their favorite foods
        anytime, anywhere.
      </p>
    </div>

   </section>
  )
}

export default About