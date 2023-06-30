import React from 'react'
import Head from 'next/head'
import Image from 'next/image'

const index = () => {
  return (
    <div>
      <Head>
        <title>
          About Us
        </title>
        <link rel="shortcut icon" href="/favicon.png" type="image/x-icon" />
      </Head>
      <div className='flex flex-col lg:flex-row justify-start lg:justify-center items-center min-h-[70vh] p-2 my-2 lg:m-0'>
        <div className='w-full lg:w-1/2 flex justify-center items-center'>
          <Image className="object-cover object-center border-b-2 border-black" alt="hero" width={400} height={400} src="/AboutUs.svg" />
        </div>
        {/* <div className='w-full lg:w-1/2 flex flex-col justify-start items-center'>
          <div className='flex justify-center items-center flex-wrap'>
            <div className='flex justify-start items-center border-2'>
              <Image src={'/avatar.png'} width={100} height={100} alt='Sample Image' className='rounded-full my-2' />
              <div>
                Name
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  )
}

export default index
