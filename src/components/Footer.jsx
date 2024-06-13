import React from 'react'
import ImageLogo from '@/assets/logo-dbn.png'

const Footer = () => {
  return (
    <div className='bg-foreground p-10 mt-10'>
        <div className="flex flex-col justify-center items-center text-white">
          <img src={ImageLogo} className="w-24" alt="" />
          <p className='text-xs pt-5'>&#169; 2024 Data Buana Nusantara - Kamil Wifi by Beta, Viery and Danila.</p>
        </div>
    </div>
  )
}

export default Footer;