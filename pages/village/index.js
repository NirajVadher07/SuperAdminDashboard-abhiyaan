import React, { useEffect, useMemo, useState } from 'react'
import checkAuth from '../utils/checkAuth'
import { useRouter } from 'next/router'
import ListVillage from '../components/ListVillage'
import { FaFilter } from "react-icons/fa"
import { BsDatabaseFillExclamation } from "react-icons/bs"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const Village = () => {
    const router = useRouter()

    // TODO: fetching intial data
    const [villageData, setVillageData] = useState([])
    const fetchData = async () => {
        try {
            const url = `${process.env.NEXT_PUBLIC_URL}/api/villages?populate=*`
            const token = localStorage.getItem("UserToken")
            const requestOptions = {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${token}` }
            }
            const responseJson = await fetch(url, requestOptions);
            const response = await responseJson.json();
            setVillageData(response.data);
            setFilterData(response.data);
        } catch (error) {
            toast.error("Fail to Fetech data")
            console.log("Fetch Data Error : ", error)
        }
    }

    // TODO: checking Auth and fetching data
    useEffect(() => {
        if (checkAuth()) {
            fetchData()
        }
        else {
            router.push("/auth/login")
        }
    }, [])


    // TODO: Filters
    const [subdistrict, setSubdistrict] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [activated, setActivated] = useState("")
    const [filterData, setFilterData] = useState([])


    const handleFilter = (e, Name) => {
        if (Name === "subdistrict") {
            setSubdistrict(e.target.value);
        } else if (Name === "city") {
            setCity(e.target.value);
        } else if (Name === "state") {
            setState(e.target.value);
        } else if (Name === "activated") {
            setActivated(e.target.value);
        }
    };

    useEffect(() => {
        let temp = villageData.filter((element) => {
            let CheckSubDistrict =
                subdistrict !== ""
                    ? element?.attributes?.sub_district?.data?.attributes?.name
                        .toLowerCase()
                        .includes(subdistrict.toLowerCase())
                    : true;
            let CheckCity =
                city !== ""
                    ? element?.attributes?.city?.data?.attributes?.name
                        .toLowerCase()
                        .includes(city.toLowerCase())
                    : true;
            let CheckState =
                state !== ""
                    ? element?.attributes?.state?.data?.attributes?.name
                        .toLowerCase()
                        .includes(state.toLowerCase())
                    : true;
            let CheckActivatedTrue =
                activated === "Subscribed"
                    ? element?.attributes?.activated === true
                    : true;
            let CheckActivatedFalse =
                activated === "Unsubscribed"
                    ? element?.attributes?.activated === false
                    : true;

            return (
                CheckSubDistrict &&
                CheckCity &&
                CheckState &&
                CheckActivatedTrue &&
                CheckActivatedFalse
            );
        });

        setFilterData(temp);
    }, [subdistrict, city, state, activated]);



    // TODO: checkboxes
    const [checkedItems, setCheckedItems] = useState([]);
    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setCheckedItems((prevValues) => [...prevValues, parseInt(value)]);
        } else {
            setCheckedItems((prevValues) => prevValues.filter((val) => val !== parseInt(value)));
        }
    };

    // TODO: dropdown 
    const [Dropdown, SetDropdown] = useState("Notice")
    const handleDropdownChange = (e) => {
        SetDropdown(e.target.value);
    };

    // TODO: URL state
    const [url, setUrl] = useState("")

    // TODO: HandleNoticeNews 
    const HandleNoticeNews = async () => {
        if (Dropdown == "news") {
            if (checkedItems.length == 0) {
                toast.error("Please Select Any Villages")
                return;
            }
            if (url == "") {
                toast.error("Empty URL")
                return;
            }

            const body = {
                data: {
                    url
                }
            }
            // console.log(JSON.stringify(body))
            try {
                const url = `${process.env.NEXT_PUBLIC_URL}/api/fetch-metadata`;
                const token = localStorage.getItem("UserToken")
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Authorization': `Bearer ${token}`, 'Content-type': 'application/json' },
                    body: JSON.stringify(body),
                }
                const responseJson = await fetch(url, requestOptions);
                console.log({ responseJson });
                const response = await responseJson.json();
                console.log(response)
                if (response?.id) {
                    toast.success("News Added SuccessFully")
                }
                else {
                    toast.error("Something went wrong")
                }

            } catch (error) {
                toast.error("Fail to Add News")
            }

        }
    }


    return filterData ? (
        <div className='flex justify-center items-start'>
            <ToastContainer />
            <div className="w-3/4 min-h-[70vh] p-2 flex flex-col justify-start items-center">
                {/* Filters */}
                <div className='w-full mb-5 px-5 flex justify-center items-center'>
                    <div className='flex justify-center items-center w-1/6'>
                        <FaFilter className='text-2xl mx-2' />
                        <h1 className='text-lg font-semibold'>
                            Filter
                        </h1>
                    </div>
                    <div className='flex justify-evenly items-center w-5/6'>
                        <input type="text" id="sub-district" placeholder='Sub-District' value={subdistrict} onChange={(e) => { handleFilter(e, "subdistrict") }} className="w-1/4 mx-1 bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-[#590DE1] focus:border-[#590DE1] block p-2.5 mt-2" />

                        <input type="text" id="city" placeholder='City' value={city} onChange={(e) => { handleFilter(e, "city") }} className="w-1/4 mx-1 bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-[#590DE1] focus:border-[#590DE1] block p-2.5 mt-2" />

                        <input type="text" id="state" placeholder='State' value={state} onChange={(e) => { handleFilter(e, "state") }} className="w-1/4 mx-1 bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-[#590DE1] focus:border-[#590DE1] block p-2.5 mt-2" />

                        <select value={activated} onChange={(e) => { handleFilter(e, "activated") }} className='w-1/4 mx-1 py-3 p-2.5 mt-2 rounded-lg border-gray-300 border-2 bg-gray-50 text-md'>
                            <option value="" className='w-full text-gray-700 block px-4 py-2 text-lg'>None</option>
                            <option value="Subscribed" className='w-full text-gray-700 block px-4 py-2 text-lg'>Subscribed</option>
                            <option value="Unsubscribed" className='w-full text-gray-700 block px-4 py-2 text-lg'>Unsubscribed</option>
                        </select>
                    </div>
                </div>
                {/* display of data */}
                <div className="h-fit relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm ">
                        <thead className="text-xs text-black uppercase bg-gray-300">
                            <tr id='headingrow'>
                                <th scope="col" className="px-6 py-3 text-center">
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
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3 text-center">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                filterData.length != 0 ? (
                                    filterData.map((element) => {
                                        return (
                                            <tr id={element?.id} className={`font-medium text-black ${element?.attributes?.activated ? ("hover:bg-green-500 hover:text-white") : ("hover:bg-red-500 hover:text-white")}`}>
                                                <td scope="row" className=" text-center px-6 py-4 whitespace-nowrap">
                                                    <input type="checkbox" name="village"
                                                        value={element?.id}
                                                        checked={checkedItems.includes(parseInt(element?.id))}
                                                        onChange={handleCheckboxChange}
                                                        className='w-5 h-5 text-[#590DE1] rounded-md focus:ring-0' />
                                                </td>
                                                <ListVillage element={element} />
                                            </tr>)
                                    })
                                ) : (
                                    <tr className='font-medium text-black' id="empty">
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td className='text-center text-gray-500 font-bold flex justify-evenly items-center px-6 py-4 whitespace-nowrap'>
                                            <BsDatabaseFillExclamation className='text-3xl mr-2' />No Data
                                        </td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            {/* Form  */}
            <div className='w-1/4 flex flex-col justify-start items-start p-5'>
                <h1 className='w-full text-center font-semibold text-xl'>ENTER DETAILS</h1>
                <div className='w-full flex justify-evenly items-center mt-2'>
                    <select value={Dropdown} onChange={handleDropdownChange} className='w-2/3 p-2 rounded-lg border-gray-600 border-2'>
                        <option value="notice" className='w-full text-gray-700 block px-4 py-2 text-lg'>Notice</option>
                        <option value="news" className='w-full text-gray-700 block px-4 py-2 text-lg'>News</option>
                    </select>
                    {/* TODO: onclick action */}
                    <button onClick={HandleNoticeNews} className="bg-transparent hover:bg-[#590DE1] text-[#590DE1] font-normal px-5 py-1.5 hover:text-white border border-[#590DE1] hover:border-transparent rounded-lg">
                        Action
                    </button>
                    {/* <p>{`You selected ${Dropdown}`}</p> */}
                </div>
                <div className='w-full'>
                    {
                        Dropdown === "news" ? (
                            <div className='m-2 w-full'>
                                <h1 className='font-bold text-xl text-[#590DE1]'>URL</h1>
                                <input type="text" id="url" placeholder='enter your URL of news' value={url} onChange={(e) => { setUrl(e.target.value) }} className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-[#590DE1] focus:border-[#590DE1] block w-full p-2.5 mt-2" />
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
