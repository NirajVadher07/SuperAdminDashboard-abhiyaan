import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FaFacebook, FaInstagram,FaTwitter,FaFacebookMessenger } from "react-icons/fa";

const Footer = () => {
  return (
    <div>
      <footer className="text-gray-600 body-font">
        <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
          <div className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
            <Link href={"/"}>
              <Image src={"/icon.png"} width={300} height={100} alt="Picture of the author" />
            </Link>            
          </div>
          <div className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">© Abhiyaan —
            <div href="#" className="text-gray-600 ml-1" rel="noopener noreferrer" target="_blank">@Abhiyaan</div>
          </div>
          <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
            <div className="text-[#590DE1]">
              <FaFacebook  className='text-2xl hover:text-[#FF6F00]'/>
            </div>
            <div className="ml-3 text-[#590DE1]">
              <FaInstagram className='text-2xl hover:text-[#FF6F00]'/>
            </div>
            <div className="ml-3 text-[#590DE1]">
              <FaTwitter className='text-2xl hover:text-[#FF6F00]'/>
            </div>
            <div className="ml-3 text-[#590DE1]">
              <FaFacebookMessenger className='text-2xl hover:text-[#FF6F00]'/>
            </div>
          </span>
        </div>
      </footer>
    </div>
  )
}

export default Footer
