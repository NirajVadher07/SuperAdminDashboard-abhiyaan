import Head from 'next/head'
import Image from 'next/image'
import React from 'react'

const index = () => {
  return (
    <div>
      <Head>
        <title>
          Contact Us
        </title>
      </Head>
      <div className='min-h-[70vh] flex justify-center items-center m-2'>
        <div className='w-1/2 flex justify-center items-center'>
          <Image src={"/contact.svg"} width={500} height={500} alt='contact page image' />
        </div>
        <div className='w-1/2'>
          <section class="bg-white my-5">
            <div class="py-8 px-4 mx-auto max-w-screen-md">
              <form action="#" class="space-y-8">
                <div>
                  <label for="email" class="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
                  <input type="email" id="email" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5" placeholder="name@company.com" required />
                </div>
                <div>
                  <label for="subject" class="block mb-2 text-sm font-medium text-gray-900">Subject</label>
                  <input type="text" id="subject" class="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500" placeholder="Let us know how we can help you" required />
                </div>
                <div class="sm:col-span-2">
                  <label for="message" class="block mb-2 text-sm font-medium text-gray-900 ">Your message</label>
                  <textarea id="message" rows="6" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500" placeholder="Leave a comment..."></textarea>
                </div>
                <button type="submit" class="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-[#590DE1] sm:w-fit hover:bg-[#5625ac] focus:ring-4 focus:outline-none focus:ring-primary-300">Send message</button>
              </form>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default index
