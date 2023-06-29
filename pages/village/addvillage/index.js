import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import checkAuth from '@/pages/utils/checkAuth'
import Head from 'next/head'

const AddVillage = () => {

    const [villageName, setVillageName] = useState("")
    const [subdistrictName, setSubdistrictName] = useState("")
    const [cityName, setCityName] = useState("")
    const [stateName, setStateName] = useState("")

    const handleSubmit = (e) => {

        e.preventDefault()

        if (!(villageName && subdistrictName && cityName && stateName)) {
            toast.warning("All field are mandatory")
            return
        }


    }


    //  TODO: checking Auth 
    useEffect(() => {
        if (!checkAuth()) {
            router.push("/auth/login")
        }
    }, [])

    return (
        <div>
            <ToastContainer />
            <Head>
                <title>
                    Add Village            
                    <link rel="shortcut icon" href="/favicon.png" type="image/x-icon" />        
                </title>
            </Head>
            <div className='flex flex-col lg:flex-row justify-start lg:justify-center items-center min-h-[70vh] p-2 my-2 lg:m-0'>
                <div className='w-full lg:w-1/2 flex justify-center items-center'>
                    <Image className="object-cover object-center border-b-2 border-black" alt="hero" width={500} height={500} src="/addvillage.svg" />
                </div>
                <div className='w-full lg:w-1/2 flex flex-col justify-start items-center'>
                    <div className='text-4xl text-[#590DE1] font-bold mt-5 lg:mt-0'>
                        Add Village
                    </div>
                    <div className='w-full px-2 py-5'>
                        <form action="" method="post">
                            <div className="flex justify-between items-center my-5">
                                <label className="text-md font-semibold text-gray-900">Village Name</label>
                                <input type="text" id="village" value={villageName} onChange={(e) => setVillageName(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5 ml-5" placeholder="village" autoComplete='off' required />
                            </div>
                            <div className="flex justify-between items-center my-5">
                                <label className="text-md font-semibold text-gray-900">Sub-District Name</label>
                                <input type="text" id="subdistrict" value={subdistrictName} onChange={(e) => setSubdistrictName(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5 ml-5" placeholder="sub-district" autoComplete='off' required />
                            </div>
                            <div className="flex justify-between items-center my-5">
                                <label className="text-md font-semibold text-gray-900">City Name</label>
                                <input type="text" id="city" value={cityName} onChange={(e) => { setCityName(e.target.value) }} className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5 ml-5" placeholder="city" autoComplete='off' required />
                            </div>
                            <div className="flex justify-between items-center my-5">
                                <label className="text-md font-semibold text-gray-900">State Name</label>
                                <input type="text" id="state" value={stateName} onChange={(e) => { e.target.value }} className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5 ml-5" placeholder="state" autoComplete='off' required />
                            </div>
                            <div className="flex justify-end items-center my-5">
                                <button onClick={e => handleSubmit(e)} type="submit" className="min-w-fit bg-transparent hover:bg-[#590DE1] text-[#590DE1] font-semibold hover:text-white text-sm py-2 px-5 border border-[#590DE1] hover:border-transparent rounded-lg flex justify-between items-center">Add Village</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddVillage