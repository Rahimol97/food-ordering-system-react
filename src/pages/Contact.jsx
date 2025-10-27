import React, {useState} from 'react'
import {assets } from '../assets/images/assets'
import { Phone, Mail, MapPin } from "lucide-react";

function Contact() {
  const [sendmessage,setSendmessage] =useState("");
const contactFormsubmit = (e)=>{
  e.preventDefault();
    setSendmessage("sent successfully!");
    setTimeout(() => setSendmessage(" "), 2000);
}
 
  return (
       <section className='w-full min-h-screen bg-cover bg-center relative flex flex-col items-center '>
      <div className="w-full h-[50vh] bg-cover bg-center relative flex items-center justify-center"
        style={{ backgroundImage: `url(${assets.header_img})` }}
      >
</div>
  <div className="w-full max-w-2xl px-4 md:px-8 py-12">
       
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-(--dark) mb-4">HAVE ANY QESTIONS</h2>
          <p className="text-(--dark)/80 text-lg">
           Want to know about any of our ingredients or suppliers?Send us a message below and we'll get right back to you.</p>
        </div>
        <form onSubmit={contactFormsubmit} className='bg-(--light)  shadow-xl rounded-xl p-6 space-y-6'>
       <div className='flex flex-col md:flex-row gap-3'>
        <input type="text" name="name" placeholder='name' className='flex-1 border border-(--dark)/30 rounded-lg px-4 py-2 focus:outline-none' required />
        <input type="email" name="email" placeholder='Email' className='flex-1 border border-(--dark)/30 rounded-lg px-4 py-2 focus:outline-none' required />
       </div>
        <input type="text" name="subject" placeholder='Subject' className='w-full  border border-(--dark)/30 rounded-lg px-4 py-2 focus:outline-none' required/>
       
        <textarea type="text" name="message" placeholder='enter your message' rows={5} className='w-full  border border-(--dark)/30 rounded-lg px-4 py-2 focus:outline-none' required />
      <button  className='w-full bg-(--dark) text-(--light) text-xl py-2 rounded-lg cursor-pointer'>send</button>
       {sendmessage && (
        <p className="text-(--dark) text-xl mt-2 text-center">{sendmessage}</p>
      )}
        </form>
        </div>
     <div className='flex flex-col md:flex-row mb-12 items-center justify-center gap-8 px-2 md:px-10'>
       <div className='flex-1 items-center justify-center'>
       <img src={assets.food_22} alt="food image" className='w-60 h-60  rounded-full overflow-hidden shadow-md  ' />
       </div>
        <div  className='flex-1 text-center p-3 md:text-left '>
 <p className="text-lg text-(--dark) mb-6">
          Feel free to get in touch with us via email or phone.
        </p>
<div className="space-y-4 text-(--dark)">
         
          <div className="flex items-center justify-center md:justify-start gap-3">
            <Phone className="text-(--accent)" />
            <span className="text-lg font-medium">+91 9800000000010</span>
          </div>

          
          <div className="flex items-center justify-center md:justify-start gap-3">
            <Mail className="text-(--accent)" />
            <span className="text-lg font-medium">foodfinder@gmail.com</span>
          </div>

        
          <div className="flex items-center justify-center md:justify-start gap-3">
            <MapPin className="text-(--accent)" />
            <span className="text-lg font-medium">
            ----,--------------- 600002
            </span>
          </div>
          </div>
         </div>
     </div>

   </section>
  )
}

export default Contact