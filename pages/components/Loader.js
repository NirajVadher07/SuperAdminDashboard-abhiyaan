import React from 'react'
import {BsImage} from "react-icons/bs"

const Loader = () => {
    return (
        <div>
            <div role="status" class="animate-pulse">
                {/* village name */}
                <div className="h-20 mx-2 rounded-lg bg-gray-500 text-white">
                </div>
                {/* members */}
                <div className='mt-5'>
                    <div className='bg-gray-500 rounded-lg w-1/4 h-10 mx-5'>
                    </div>
                    <div className='flex justify-start items-center mt-5 px-5'>
                        <div className='h-20 mx-2 bg-gray-500 w-[200px] rounded-lg'>
                        </div>
                        <div className='h-20 mx-2 bg-gray-500 w-[200px] rounded-lg'>
                        </div>
                        <div className='h-20 mx-2 bg-gray-500 w-[200px] rounded-lg'>
                        </div>
                        <div className='h-20 mx-2 bg-gray-500 w-[200px] rounded-lg'>
                        </div>
                        <div className='h-20 mx-2 bg-gray-500 w-[200px] rounded-lg'>
                        </div>
                    </div>
                </div>
                {/* Notices */}
                <div className='mt-5'>
                    <div className='bg-gray-500 rounded-lg w-1/4 h-10 mx-5'>
                    </div>
                    <div className='my-2'>
                        <div className='w-[90vw] mx-5 my-1 rounded-lg bg-gray-500 h-40'>
                        </div>
                        <div className='w-[90vw] mx-5 my-1 rounded-lg bg-gray-500 h-40'>
                        </div>
                    </div>
                    <span class="sr-only">Loading...</span>
                </div>
                {/* Complaints */}
                <div className='mt-5'>
                    <div className='bg-gray-500 rounded-lg w-1/4 h-10 mx-5'>
                    </div>
                    <div className='my-2'>
                        <div className='w-[90vw] mx-5 my-1 rounded-lg bg-gray-500 h-40'>
                        </div>
                        <div className='w-[90vw] mx-5 my-1 rounded-lg bg-gray-500 h-40'>
                        </div>
                    </div>
                    <span class="sr-only">Loading...</span>
                </div>
                {/* News */}
                <div className='mt-5'>
                    <div className='bg-gray-500 rounded-lg w-1/4 h-10 mx-5'>
                    </div>
                    <div className='flex justify-evenly items-center mx-5 mt-5'>
                        <div role="status" class="w-1/4 p-4 border border-gray-500 bg-gray-500 rounded shadow animate-pulse md:p-6 dark:border-gray-700">
                            <div class="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded dark:bg-gray-700">
                                <BsImage className='text-5xl text-gray-500'/>                                
                            </div>
                            <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                            <div class="h-2 bg-gray-300 rounded-full dark:bg-gray-700 mb-2.5"></div>
                            <div class="h-2 bg-gray-300 rounded-full dark:bg-gray-700 mb-2.5"></div>
                            <div class="h-2 bg-gray-300 rounded-full dark:bg-gray-700"></div>                            
                            <span class="sr-only">Loading...</span>
                        </div>
                        <div role="status" class="w-1/4 p-4 border border-gray-500 bg-gray-500 rounded shadow animate-pulse md:p-6 dark:border-gray-700">
                            <div class="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded dark:bg-gray-700">
                                <BsImage className='text-5xl text-gray-500'/>                                
                            </div>
                            <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                            <div class="h-2 bg-gray-300 rounded-full dark:bg-gray-700 mb-2.5"></div>
                            <div class="h-2 bg-gray-300 rounded-full dark:bg-gray-700 mb-2.5"></div>
                            <div class="h-2 bg-gray-300 rounded-full dark:bg-gray-700"></div>                            
                            <span class="sr-only">Loading...</span>
                        </div>
                        <div role="status" class="w-1/4 p-4 border border-gray-500 bg-gray-500 rounded shadow animate-pulse md:p-6 dark:border-gray-700">
                            <div class="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded dark:bg-gray-700">
                                <BsImage className='text-5xl text-gray-500'/>                                
                            </div>
                            <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                            <div class="h-2 bg-gray-300 rounded-full dark:bg-gray-700 mb-2.5"></div>
                            <div class="h-2 bg-gray-300 rounded-full dark:bg-gray-700 mb-2.5"></div>
                            <div class="h-2 bg-gray-300 rounded-full dark:bg-gray-700"></div>                            
                            <span class="sr-only">Loading...</span>
                        </div>
                    </div>
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
        </div>
    )
}

export default Loader
