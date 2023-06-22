import React, { useEffect, useState } from 'react'
import checkAuth from '../utils/checkAuth'
import { useRouter } from 'next/router'
import ListVillage from '../components/ListVillage'
import { FaFilter } from "react-icons/fa"

const Village = () => {
    const router = useRouter()
    const [villageData, setVillageData] = useState([])

    const fetchData = async () => {
        try {
            const url = `${process.env.NEXT_PUBLIC_URL}/api/villages?populate=*`
            const token = localStorage.getItem("UserToken")
            const requestOptions = {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${token}` }
            }
            const res = await fetch(url, requestOptions);
            const data = await res.json();
            setVillageData(data.data);
        } catch (error) {
            console.log("Fetch Data Error : ", error)
        }
    }

    useEffect(() => {
        if (checkAuth()) {
            fetchData()
        }
        else {
            router.push("/auth/login")
        }
    }, [])


    // dropdown 
    const [Dropdown, SetDropdown] = useState("Notice")
    const handleDropdownChange = (e) => {
        SetDropdown(e.target.value);
    };


    // Filters
    const [subdistrict, setSubdistrict] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")


    return villageData ? (
        <div className='flex justify-center items-start'>            
            <div className="w-2/3 min-h-[70vh] p-2 flex flex-col justify-center items-center">
                {/* Filters */}
                <div className='w-full mb-5 px-5 flex justify-center items-center'>
                    <div className='flex flex-col justify-center items-center w-1/4'>
                        <span className="inline-block bg-green-500 rounded-full px-3 py-1 text-sm font-semibold text-white my-1">Subscribed</span>
                        <span className="inline-block bg-red-500 rounded-full px-3 py-1 text-sm font-semibold text-white my-1">Unsubscribed</span>
                    </div>
                    <div className='flex justify-center items-center w-3/4 p-1'>
                        <div className='flex justify-end items-center w-1/5'>
                            <FaFilter className='text-2xl mx-2' />
                            <h1 className='text-lg font-semibold'>
                                Filter
                            </h1>
                        </div>
                        <div className='flex justify-evenly items-center w-4/5'>
                            <input type="text" id="sub-district" placeholder='Sub-District' value={subdistrict} onChange={(e)=>{setSubdistrict(e.target.value)}} className="w-1/4 mx-1 bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-[#590DE1] focus:border-[#590DE1] block p-2.5 mt-2" />

                            <input type="text" id="city" placeholder='City' value={city} onChange={(e)=>{setCity(e.target.value)}} className="w-1/4 mx-1 bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-[#590DE1] focus:border-[#590DE1] block p-2.5 mt-2" />

                            <input type="text" id="state" placeholder='State' value={state} onChange={(e)=>{setState(e.target.value)}} className="w-1/4 mx-1 bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-[#590DE1] focus:border-[#590DE1] block p-2.5 mt-2" />
                        </div>
                    </div>
                </div>
                {/* display of data */}
                <div className="h-fit relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm ">
                        <thead className="text-xs text-black uppercase bg-gray-300">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-center">
                                    Checkbox
                                </th>
                                <th scope="col" className="px-6 py-3 text-center">
                                    Village
                                </th>
                                <th scope="col" className="px-6 py-3 text-center">
                                    Sub-District
                                </th>
                                <th scope="col" className="px-6 py-3 text-center">
                                    City
                                </th>
                                <th scope="col" className="px-6 py-3 text-center">
                                    State
                                </th>
                                <th scope="col" className="px-6 py-3 text-center">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                villageData.map((element) => {
                                    return <ListVillage element={element} />
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            {/* Form  */}
            <div className='w-1/3 flex flex-col justify-start items-start p-5'>
                <h1 className='w-full text-center font-semibold text-xl'>ENTER DETAILS</h1>
                <div className='w-full flex justify-evenly items-center mt-2'>
                    <select value={Dropdown} onChange={handleDropdownChange} className='w-2/3 p-2 rounded-lg border-gray-600 border-2'>
                        <option value="Notice" className='w-full text-gray-700 block px-4 py-2 text-lg'>Notice</option>
                        <option value="News" className='w-full text-gray-700 block px-4 py-2 text-lg'>News</option>
                    </select>
                    {/* TODO: onclick action */}
                    <button className="bg-transparent hover:bg-[#590DE1] text-[#590DE1] font-normal px-5 py-1.5 hover:text-white border border-[#590DE1] hover:border-transparent rounded-lg">
                        Action
                    </button>
                    {/* <p>{`You selected ${Dropdown}`}</p> */}
                </div>
                <div className='w-full'>
                    {
                        Dropdown === "News" ? (
                            <div className='m-2 w-full'>
                                <h1 className='font-bold text-xl text-[#590DE1]'>URL</h1>
                                <input type="text" id="url" placeholder='enter your URL of news' className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-[#590DE1] focus:border-[#590DE1] block w-full p-2.5 mt-2" />
                            </div>
                        ) : (
                            <div className='m-2 w-full'>
                                <div className='mt-2'>
                                    <h1 className='font-bold text-xl text-[#590DE1]'>Heading</h1>
                                    <input type="text" id="heading" placeholder='Heading' className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-[#590DE1] focus:border-[#590DE1] block w-full p-2.5 mt-2" />
                                </div>
                                <div className='mt-2'>
                                    <h1 className='font-bold text-xl text-[#590DE1]'>Type</h1>
                                    <input type="text" id="type" placeholder='Type' className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-[#590DE1] focus:border-[#590DE1] block w-full p-2.5 mt-2" />
                                </div>
                                <div className='mt-2'>
                                    <h1 className='font-bold text-xl text-[#590DE1]'>Description</h1>
                                    <input type="textarea" id="desc" rows="4" placeholder='Description' className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-[#590DE1] focus:border-[#590DE1] block w-full p-2.5 mt-2 " />
                                </div>
                                <div className='mt-2'>
                                    <h1 className='font-bold text-xl text-[#590DE1]'>Image</h1>
                                    <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none text-md p-2" id="file_input" type="file" />
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>

    ) : (
        // Loader
        <div className="min-h-[70vh] p-2 flex justify-center items-start animate-pulse">
            <div className="h-fit relative overflow-x-auto shadow-md sm:rounded-lg w-3/4">
                <table className="w-full text-sm ">
                    <thead className="text-xs text-black uppercase bg-gray-300">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left">
                                Village
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3 text-right">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-gray-500 border-b">
                            <th scope="row" className="h-10">
                            </th>
                            <td className="h-10">
                            </td>
                            <td className="h-10">
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}



export default Village
