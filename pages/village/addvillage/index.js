import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import checkAuth from '@/pages/utils/checkAuth'
import Head from 'next/head'

const AddVillage = () => {

    const STATE = "state"
    const CITY = "city"
    const SUBDISTRICT = "subdistrict"
    const VILLAGE = "village"

    const [villageName, setVillageName] = useState("")

    const [subdistrictName, setSubdistrictName] = useState(undefined)
    const [AllSubdistrict, setAllSubdistrict] = useState([])

    const [cityName, setCityName] = useState(undefined)
    const [AllCity, setAllCity] = useState([])

    const [stateName, setStateName] = useState(undefined)
    const [AllState, setAllState] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!(villageName && cityName && stateName)) {
            toast.warning("All field are mandatory")
            return
        }

        try {
            const url = `${process.env.URL}/api/villages?populate=*`;
            const token = localStorage.getItem("UserToken")
            const body = {
                "data": {
                    "name": villageName,
                    "city": parseInt(cityName),
                    "sub_district": parseInt(subdistrictName),
                    "state": parseInt(stateName)
                }
            }
            console.log(JSON.stringify(body))
            const requestOptions = {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}`, 'Content-type': 'application/json' },
                body: JSON.stringify(body)
            }

            const jsonResponse = await fetch(url, requestOptions);
            const response = await jsonResponse.json();
            if (response?.data?.id) {
                toast.success("Village Added SuccessFull")
            }
            else {
                toast.error("Unable to add Village")
            }

        } catch (error) {
            console.log(error)
            console.log("Error in fetching Add Village")
            toast.error("Unable to Add village")
        }

    }

    const fetchstates = async () => {
        try {
            const url = `${process.env.URL}/api/states`;
            const token = localStorage.getItem("UserToken")
            const requestOptions = {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${token}`, 'Content-type': 'application/json' }
            }
            const jsonResponse = await fetch(url, requestOptions);
            const response = await jsonResponse.json();
            setAllState(response?.data)

        } catch (error) {
            console.log("Error in fetching States")
            toast.error("Unable to get State data")
        }
    }

    const fetchCity = async () => {
        try {
            const url = `${process.env.URL}/api/cities?filters[$or][0][state][id][$eq]=${stateName}`;
            const token = localStorage.getItem("UserToken")
            const requestOptions = {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${token}`, 'Content-type': 'application/json' }
            }
            const jsonResponse = await fetch(url, requestOptions);
            const response = await jsonResponse.json();
            setAllCity(response?.data)

        } catch (error) {
            console.log("Error in fetching City")
            toast.error("Unable to get City data")
        }
    }

    const fetchSubdistrict = async () => {
        try {
            const url = `${process.env.URL}/api/sub-districts?filters[$or][0][city][id][$eq]=${cityName}`;
            const token = localStorage.getItem("UserToken")
            const requestOptions = {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${token}`, 'Content-type': 'application/json' }
            }
            const jsonResponse = await fetch(url, requestOptions);
            const response = await jsonResponse.json();
            setAllSubdistrict(response?.data)

        } catch (error) {
            console.log("Error in fetching City")
            toast.error("Unable to get City data")
        }
    }

    const handleStates = (Name, e) => {
        switch (Name) {
            case STATE:
                setCityName(undefined)
                setSubdistrictName(undefined)
                setAllCity([])
                setAllSubdistrict([])
                setStateName(e.target.value)
                break;

            case CITY:
                setSubdistrictName(undefined)
                setAllSubdistrict([])
                setCityName(e.target.value)
                break;

            case SUBDISTRICT:
                setSubdistrictName(e.target.value)
                break;

            case VILLAGE:
                setVillageName(e.target.value)
                break;
            default:
                break;
        }
    }

    //  TODO: checking Auth 
    useEffect(() => {
        if (!checkAuth()) {
            router.push("/auth/login")
        }
        fetchstates()
    }, [])

    // Manage DropDown
    useEffect(() => {
        if (cityName) {
            fetchSubdistrict()
        }
        else if (stateName) {
            fetchCity()
        }
    }, [stateName, cityName])



    return (
        <div className='flex flex-col justify-center items-center'>
            <ToastContainer />
            <Head>
                <title>
                    Add Village
                </title>
                <link rel="shortcut icon" href="/favicon.png" type="image/x-icon" />
            </Head>
            <div className='w-full text-center text-4xl text-[#590DE1] font-bold mt-5 lg:mt-0'>
                Add Village
            </div>
            <div className='w-full flex flex-col lg:flex-row justify-start lg:justify-center items-center min-h-[70vh] p-2 my-2 lg:m-0'>
                <div className='w-full lg:w-1/2 flex justify-center items-center'>
                    <Image className="object-cover object-center border-b-2 border-black" alt="hero" width={500} height={500} src="/addvillage.svg" />
                </div>
                <div className='w-full lg:w-1/2 flex flex-col justify-start items-center'>
                    {/* Form */}
                    <div className='w-full px-2 py-5'>
                        <form action="" method="post">
                            {/* State */}
                            <div className="flex justify-between items-center my-5">
                                <label className="text-md font-semibold text-gray-900">State Name</label>
                                <select
                                    value={stateName}
                                    onChange={(e) => handleStates(STATE, e)}
                                    className="w-2/3 bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-[#590DE1] focus:border-[#590DE1] block p-2.5 mt-2"
                                >
                                    <option value={undefined} className="w-full text-gray-700 block px-4 py-2 text-lg" >Others</option>
                                    {
                                        AllState.map((state) => (
                                            <option
                                                value={state?.id}
                                                className="w-full text-gray-700 block px-4 py-2 text-lg"
                                            >
                                                {state?.attributes?.name}
                                            </option>
                                        ))
                                    }
                                </select>
                            </div>
                            {/* City */}
                            <div className="flex justify-between items-center my-5">
                                <label className="text-md font-semibold text-gray-900">City Name</label>
                                {
                                    (AllCity?.length > 0) ? (
                                        <select
                                            value={cityName}
                                            onChange={(e) => handleStates(CITY, e)}
                                            className="w-2/3 bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-[#590DE1] focus:border-[#590DE1] block p-2.5 mt-2"
                                        >
                                            <option value={undefined} className="w-full text-gray-700 block px-4 py-2 text-lg" >Others</option>
                                            {
                                                AllCity?.map((city) => (
                                                    <option
                                                        value={city?.id}
                                                        className="w-full text-gray-700 block px-4 py-2 text-lg"
                                                    >
                                                        {city?.attributes?.name}
                                                    </option>
                                                ))
                                            }
                                        </select>
                                    ) : (
                                        <input type="text" disabled placeholder='Data not avaliable' className='w-2/3 bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-[#590DE1] focus:border-[#590DE1] block p-2.5 mt-2' />
                                    )
                                }
                            </div>
                            {/* Sub-District */}
                            <div className="flex justify-between items-center my-5">
                                <label className="text-md font-semibold text-gray-900">Sub-District Name</label>
                                {
                                    (AllSubdistrict?.length > 0) ? (
                                        <select
                                            value={subdistrictName}
                                            onChange={(e) => handleStates(SUBDISTRICT, e)}
                                            className="w-2/3 bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-[#590DE1] focus:border-[#590DE1] block p-2.5 mt-2"
                                        >
                                            <option value={undefined} className="w-full text-gray-700 block px-4 py-2 text-lg" >Others</option>
                                            {
                                                AllSubdistrict.map((subdistrict) => (
                                                    <option
                                                        value={subdistrict?.id}
                                                        className="w-full text-gray-700 block px-4 py-2 text-lg"
                                                    >
                                                        {subdistrict?.attributes?.name}
                                                    </option>
                                                ))
                                            }
                                        </select>
                                    ) : (
                                        <input type="text" disabled placeholder='Data not avaliable' className='w-2/3 bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-[#590DE1] focus:border-[#590DE1] block p-2.5 mt-2' />
                                    )
                                }
                            </div>
                            {/* village Name */}
                            <div className="flex justify-between items-center my-5">
                                <label className="text-md font-semibold text-gray-900">Village Name</label>
                                <input type="text" id="village" value={villageName} onChange={(e) => setVillageName(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5 ml-5" placeholder="village" autoComplete='off' required />
                            </div>
                            {/* Image */}
                            <div className="flex justify-between items-center my-5">
                                <label className="text-md font-semibold text-gray-900">Images</label>
                                <input type="file" name="VillageImage" multiple accept="image/png, image/gif, image/jpeg" className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-black-500 focus:border-black-500 block w-2/3 p-2.5 ml-5" />
                            </div>
                            {/* Submit Button */}
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