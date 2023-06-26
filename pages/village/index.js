import React, { useEffect, useMemo, useState } from 'react'
import checkAuth from '../utils/checkAuth'
import { useRouter } from 'next/router'
import ListVillage from '../components/ListVillage'
import { FaFilter } from "react-icons/fa"
import { BsDatabaseFillExclamation } from "react-icons/bs"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


//  TODO: DEFINING VARIABLES 
const SUBDISTRICT = "subdistrict"
const CITY = "city"
const STATE = "state"
const ACTIVATED = "activated"
const SUBSCRIBED = "subscribed"
const UNSUBSCRIBED = "unsubscribed"
const NOTICE = "notice"
const NEWS = "news"

const Village = () => {
    const router = useRouter()

    //  TODO: fetching intial data
    const [villageData, setVillageData] = useState([])

    //  TODO: Filters
    const [subdistrict, setSubdistrict] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [activated, setActivated] = useState("")
    const [filterData, setFilterData] = useState([])
    const [isSelectedAll, setIsSelectedAll] = useState(false)

    //  TODO: checkboxes
    const [checkedItems, setCheckedItems] = useState([]);

    //  TODO: dropdown 
    const [Dropdown, SetDropdown] = useState(NOTICE)

    //  TODO: NEWS URL state
    const [url, setUrl] = useState("")

    //  TODO: NOTICE state    


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

    const handleFilter = (e, Name) => {
        if (Name === SUBDISTRICT) {
            setSubdistrict(e.target.value);
        } else if (Name === CITY) {
            setCity(e.target.value);
        } else if (Name === STATE) {
            setState(e.target.value);
        } else if (Name === ACTIVATED) {
            setActivated(e.target.value);
        }
    };

    const FilterOutData = () => {
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
                activated === SUBSCRIBED
                    ? element?.attributes?.activated === true
                    : true;
            let CheckActivatedFalse =
                activated === UNSUBSCRIBED
                    ? element?.attributes?.activated === false
                    : true;

            // return true;

            return (
                CheckSubDistrict &&
                CheckCity &&
                CheckState &&
                CheckActivatedTrue &&
                CheckActivatedFalse
            );
        });

        setFilterData(temp);
    }

    const CheckIsSelectedAll = () => {
        if (isSelectedAll) {
            setCheckedItems([])
            setIsSelectedAll(!isSelectedAll)
        }
        else {
            if (filterData.length != 0) {
                filterData.map((element) => {
                    setCheckedItems((prevValues) => [...prevValues, (element?.id.toString())]);
                })
                setIsSelectedAll(!isSelectedAll)
            }
            else {
                toast.warning("No data Avaliable")
                return
            }

        }
    }

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setCheckedItems((prevValues) => [...prevValues, (value.toString())]);
        } else {
            setCheckedItems((prevValues) => prevValues.filter((val) => val !== (value.toString())));
        }
    };

    const handleDropdownChange = (e) => {
        SetDropdown(e.target.value);
    };

    //  TODO: HandleNoticeNews 
    const HandleNoticeNews = async () => {
        if (checkedItems.length == 0) {
            toast.warning("Please Select Any Villages")
            return;
        }

        if (Dropdown == NEWS) {
            if (url == "") {
                toast.warning("Empty URL")
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
                    toast.warning("Something went wrong")
                }

            } catch (error) {
                toast.error("Fail to Add News")
            }

        }
        else if (Dropdown == NOTICE) {
            console.log(NOTICE)
        }
    }

    //  TODO: checking Auth and fetching data
    useEffect(() => {
        if (checkAuth()) {
            fetchData()
        }
        else {
            router.push("/auth/login")
        }
    }, [])

    // TODO: filter Function
    useEffect(() => {
        FilterOutData()
    }, [subdistrict, city, state, activated]);


    return filterData ? (
        <div className='flex sm:flex-col lg:flex-row justify-center items-start'>
            <ToastContainer />
            {/*    Filters and Table Data */}
            <div className="sm:w-full lg:w-3/4 min-h-[70vh] p-2 flex flex-col justify-start items-center">
                {/*  Filters */}
                <div className="w-full mb-5 px-5 flex flex-col sm:flex-wrap lg:flex-nowrap lg:flex-row justify-center items-center">
                    <div className="flex justify-center items-center w-full lg:w-1/6">
                        <FaFilter className="text-2xl mx-2" />
                        <h1 className="text-lg font-semibold">Filter</h1>
                    </div>
                    <div className="flex justify-evenly items-center sm:flex-wrap lg:flex-nowrap w-full lg:w-5/6">
                        <input
                            type="text"
                            id="sub-district"
                            placeholder="Sub-District"
                            autoComplete="off"
                            value={subdistrict}
                            onChange={(e) => { handleFilter(e, "subdistrict") }}
                            className="w-1/3 lg:w-1/4 bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-[#590DE1] focus:border-[#590DE1] block p-2.5 mt-2 mx-1"
                        />
                        <input
                            type="text"
                            id="city"
                            placeholder="City"
                            autoComplete="off"
                            value={city}
                            onChange={(e) => { handleFilter(e, "city") }}
                            className="w-1/3 lg:w-1/4 bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-[#590DE1] focus:border-[#590DE1] block p-2.5 mt-2 mx-1"
                        />
                        <input
                            type="text"
                            id="state"
                            placeholder="State"
                            autoComplete="off"
                            value={state}
                            onChange={(e) => { handleFilter(e, "state") }}
                            className="w-1/3 lg:w-1/4 bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-[#590DE1] focus:border-[#590DE1] block p-2.5 mt-2 mx-1"
                        />
                        <select
                            value={activated}
                            onChange={(e) => { handleFilter(e, "activated") }}
                            className="w-1/3 lg:w-1/4 py-3 p-2.5 mt-2 lg:mx-1 rounded-lg border-gray-300 border-2 bg-gray-50 t-md"
                        >
                            <option value="" className="w-full text-gray-700 block px-4 py-2 text-lg">None</option>
                            <option value={SUBSCRIBED} className="w-full text-gray-700 block px-4 py-2 text-lg">Subscribed</option>
                            <option value={UNSUBSCRIBED} className="w-full text-gray-700 block px-4 py-2 text-lg">Unsubscribed</option>
                        </select>
                    </div>
                </div>
                {/*   display of data */}
                <div className='flex justify-start items-center overflow-auto rounded-lg shadow-md mx-2'>
                    <table className='w-full'>
                        <thead className='bg-gray-50 border-b-2 border-gray-200'>
                            <tr>
                                <th className='tracking-wide px-6 py-3 bg-gray-50 text-center text-xs font-semibold text-black  uppercase'>
                                    <input type="checkbox" name="checkbox" id="checkbox"
                                        checked={isSelectedAll}
                                        onChange={CheckIsSelectedAll} />
                                </th>
                                <th className='tracking-wide px-6 py-3 bg-gray-50 text-center text-xs font-semibold text-black  uppercase'>
                                    village
                                </th>
                                <th className='tracking-wide px-6 py-3 bg-gray-50 text-center text-xs font-semibold text-black  uppercase'>
                                    subdistrict
                                </th>
                                <th className='tracking-wide px-6 py-3 bg-gray-50 text-center text-xs font-semibold text-black  uppercase'>
                                    city
                                </th>
                                <th className='tracking-wide px-6 py-3 bg-gray-50 text-center text-xs font-semibold text-black  uppercase'>
                                    state
                                </th>
                                <th className='tracking-wide px-6 py-3 bg-gray-50 text-center text-xs font-semibold text-black  uppercase'>
                                    status
                                </th>
                                <th className='tracking-wide px-6 py-3 bg-gray-50 text-center text-xs font-semibold text-black  uppercase'>
                                    action
                                </th>
                            </tr>
                        </thead>
                        <tbody className='divide-y divide-gray-100'>
                            {
                                filterData.length != 0 ? (
                                    filterData.map((element) => {
                                        return (
                                            <tr className={`bg-white text-gray-700  hover:text-white ${element?.attributes?.activated == true ? "hover:bg-green-500 " : "hover:bg-red-500"}`}>
                                                <td className="p-3 text-sm whitespace-normal text-center">
                                                    <input type="checkbox" name="village"
                                                        value={element?.id}
                                                        checked={checkedItems.includes((element?.id.toString()))}
                                                        onChange={handleCheckboxChange}
                                                    />
                                                </td>
                                                <ListVillage element={element} />
                                            </tr>
                                        )
                                    })
                                ) : (
                                    <tr>
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
            {/*   Form  */}
            <div className="sm:w-full lg:w-1/4 flex flex-col justify-start items-start p-5">
                <h1 className="w-full text-center font-semibold text-xl">ENTER DETAILS</h1>
                <div className="w-full flex justify-evenly items-center mt-2">
                    <select
                        value={Dropdown}
                        onChange={handleDropdownChange}
                        className="w-1/3 lg:w-2/3 p-2 rounded-lg border-gray-600 border-2"
                    >
                        <option value={NOTICE} className="w-full text-gray-700 block px-4 py-2 text-lg">
                            Notice
                        </option>
                        <option value={NEWS} className="w-full text-gray-700 block px-4 py-2 text-lg">
                            News
                        </option>
                    </select>
                    <button
                        onClick={HandleNoticeNews}
                        className="bg-transparent hover:bg-[#590DE1] text-[#590DE1] font-normal px-5 py-1.5 hover:text-white border border-[#590DE1] hover:border-transparent rounded-lg"
                    >
                        Action
                    </button>
                </div>
                <div className="w-full">
                    {Dropdown === NEWS ? (
                        <div className="m-2 w-full">
                            <h1 className="font-bold text-xl text-[#590DE1]">URL</h1>
                            <input
                                type="text"
                                id="url"
                                placeholder="enter your URL of news"
                                value={url}
                                autoComplete="off"
                                onChange={(e) => {
                                    setUrl(e.target.value);
                                }}
                                className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-[#590DE1] focus:border-[#590DE1] block p-2.5 mt-2"
                            />
                        </div>
                    ) : (
                        <div className="m-2 w-full">
                            <div className="mt-2">
                                <h1 className="font-bold text-xl text-[#590DE1]">Heading</h1>
                                <input
                                    type="text"
                                    id="heading"
                                    placeholder="Heading"
                                    className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-[#590DE1] focus:border-[#590DE1] block p-2.5 mt-2"
                                />
                            </div>
                            <div className="mt-2">
                                <h1 className="font-bold text-xl text-[#590DE1]">Type</h1>
                                <input
                                    type="text"
                                    id="type"
                                    placeholder="Type"
                                    className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-[#590DE1] focus:border-[#590DE1] block p-2.5 mt-2"
                                />
                            </div>
                            <div className="mt-2">
                                <h1 className="font-bold text-xl text-[#590DE1]">Description</h1>
                                <input
                                    type="textarea"
                                    id="desc"
                                    rows="4"
                                    placeholder="Description"
                                    className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-[#590DE1] focus:border-[#590DE1] block p-2.5 mt-2"
                                />
                            </div>
                            <div className="mt-2">
                                <h1 className="font-bold text-xl text-[#590DE1]">Image</h1>
                                <input
                                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none text-md p-2"
                                    id="file_input"
                                    type="file"
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>

    ) : (
        //   Loader
        <div className="min-h-[70vh] p-2 flex justify-center items-start animate-pulse">
            <div className="h-fit relative overflow-x-auto shadow-md sm:rounded-lg w-3/4">
                <table className="w-full text-sm ">
                    <thead className="text-xs text-black uppercase bg-gray-300">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-center">
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
