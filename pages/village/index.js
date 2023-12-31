import React, { useEffect, useMemo, useState } from 'react'
import checkAuth from '../utils/checkAuth'
import { useRouter } from 'next/router'
import ListVillage from '../components/ListVillage'
import ApiCall from '../api/ApiCall'
import UploadImage from '../utils/UploadImage'

import { FaFilter } from "react-icons/fa"
import { BsDatabaseFillExclamation } from "react-icons/bs"
import { LuPlusCircle } from "react-icons/lu";
import { CiSquareRemove } from "react-icons/ci"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Head from 'next/head'
import Link from 'next/link'

// DEFINING VARIABLES 
const SUBDISTRICT = "subdistrict"
const CITY = "city"
const STATE = "state"
const ACTIVATED = "activated"
const SUBSCRIBED = "subscribed"
const UNSUBSCRIBED = "unsubscribed"
const NOTICE = "notice"
const NEWS = "news"
const WITHURL = 'withurl'
const WITHOUTURL = "withouturl"


// export const getServerSideProps = async (context) => {
//     const response = await ApiCall(
//         'GET',
//         `${process.env.NEXT_PUBLIC_URL}/api/villages?populate=*`,
//         {},
//         null,
//         "Unable to Fetch Village Data"
//     )

//     // News Category
//     const newsCatorgoryResponse = await ApiCall(
//         'GET',
//         `${process.env.NEXT_PUBLIC_URL}/api/news-categories`,
//         {},
//         null,
//         "Unable to Fetch News Category"
//     )
//     // Notice Category
//     const noticeCatorgoryResponse = await ApiCall(
//         'GET',
//         `${process.env.NEXT_PUBLIC_URL}/api/notice-categories`,
//         {},
//         null,
//         "Unable to Fetch Notice Category"
//     )

//     return {
//         props: {
//             villagedata: response.data,
//             news_category: newsCatorgoryResponse.data,
//             notice_category: noticeCatorgoryResponse.data
//         }
//     }
// }

const Village = () => {
    // console.log({ villagedata, news_category, notice_category })
    const router = useRouter()
    // Fetching intial data
    const [villageData, setVillageData] = useState([])
    const [allnewscategory, setAllNewsCategory] = useState([])
    const [allnoticecategory, setAllNoticeCategory] = useState([])

    //  State's used during Filter
    const [subdistrict, setSubdistrict] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [activated, setActivated] = useState("")
    const [filterData, setFilterData] = useState([])
    const [isSelectedAll, setIsSelectedAll] = useState(false)

    //  Array of ID's of all ticked village Eg. ["1","27", ...]
    const [checkedItems, setCheckedItems] = useState([]);

    //  dropdown State
    const [Dropdown, SetDropdown] = useState(NOTICE)

    // States used for News
    const [newstype, setNewsType] = useState(WITHURL)
    const [newsurl, setNewsUrl] = useState("")
    const [newstitle, setNewsTitle] = useState("")
    const [newsdescription, setNewsDescription] = useState("")
    const [newsauthor, setNewsAuthor] = useState("")
    const [newssource, setNewsSource] = useState("")
    const [newscategory, setNewsCategory] = useState(allnewscategory[0]?.id);
    const [newsimage, setNewsImage] = useState()

    // States used for Notice
    const [noticeheading, setNoticeHeading] = useState("")
    const [noticetype, setNoticeType] = useState("")
    const [noticedescription, setNoticeDescription] = useState("")
    const [noticecategory, setNoticeCategory] = useState(allnoticecategory[0]?.id)
    const [noticeimage, setNoticeImage] = useState()


    //initial Fetching of data includes : Village Data, News Category, & Notice Category
    const fetchData = async () => {
        try {
            // Village data
            const response = await ApiCall(
                'GET',
                `${process.env.NEXT_PUBLIC_URL}/api/villages?populate=*`,
                {},
                null,
                "Unable to Fetch Village Data"
            )
            setVillageData(response.data);
            setFilterData(response.data);

            // News Category
            const newsCatorgoryResponse = await ApiCall(
                'GET',
                `${process.env.NEXT_PUBLIC_URL}/api/news-categories`,
                {},
                null,
                "Unable to Fetch News Category"
            )
            setAllNewsCategory(newsCatorgoryResponse.data)

            // Notice Category
            const noticeCatorgoryResponse = await ApiCall(
                'GET',
                `${process.env.NEXT_PUBLIC_URL}/api/notice-categories`,
                {},
                null,
                "Unable to Fetch Notice Category"
            )
            setAllNoticeCategory(noticeCatorgoryResponse.data)

        } catch (error) {
            console.log("Fetch Error : ", error)
        }
    }

    // Updates state of filter on change
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

    // Filter Logic
    const FilterOutData = () => {
        let temp = villageData.filter((element) => {

            if (subdistrict && !element?.attributes?.sub_district?.data?.attributes?.name
                .toLowerCase()
                .includes(subdistrict.toLowerCase())) {
                return false;
            }
            if (city && !element?.attributes?.city?.data?.attributes?.name
                .toLowerCase()
                .includes(city.toLowerCase())) {
                return false;
            }
            if (state && !element?.attributes?.state?.data?.attributes?.name
                .toLowerCase()
                .includes(state.toLowerCase())) {
                return false;
            }
            if (activated === SUBSCRIBED && !(element?.attributes?.activated === true)) {
                return false
            }
            if (activated === UNSUBSCRIBED && !(element?.attributes?.activated === false)) {
                return false
            }

            return true
        });

        setFilterData(temp);
    }

    // reseting the filters 
    const ClearFilter = () => {
        if (!(subdistrict || city || state || activated)) {
            toast.info("Already Clear", { autoClose: 1000 })
        }
        else {
            setSubdistrict("")
            setCity("")
            setState("")
            setActivated("")
        }
    }

    // logic for selecting all avaliable filterdata
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

    // Update state of CheckedItems 
    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setCheckedItems((prevValues) => [...prevValues, (value.toString())]);
        } else {
            setCheckedItems((prevValues) => prevValues.filter((val) => val !== (value.toString())));
        }
    };

    // Update states of News and Notice image
    const handleImage = (Name) => {
        switch (Name) {
            case NOTICE:
                let NoticefileInput = document.getElementById('FileNoticeInput');
                let Noticeimage = NoticefileInput.files;
                setNoticeImage(Noticeimage)
                break;
            case NEWS:
                let NewsfileInput = document.getElementById('FileNewsInput');
                let Newsimage = NewsfileInput.files;
                setNewsImage(Newsimage)
                break;
            default:
                toast.warning("Unexpected Handle Image Call")
                break;
        }
    }

    // Selection of News(post) method
    const hanldeFocus = (condition) => {
        const newsform = document.getElementById("NewsForm")
        const urlDiv = document.getElementById("urlDiv")
        if (condition == "url") {
            newsform?.classList.add("opacity-30")
            urlDiv?.classList.remove("opacity-30")
            setNewsType(WITHURL)
        }
        else if (condition == "noturl") {
            urlDiv?.classList.add("opacity-30")
            newsform?.classList.remove("opacity-30")
            setNewsType(WITHOUTURL)
        }
    }

    // OnClick of Action Button
    const HandleNoticeNews = async () => {
        if (checkedItems.length == 0) {
            toast.warning("Please Select Any Villages")
            return;
        }
        else {
            if (Dropdown == NEWS) {
                if (newstype === WITHURL) {
                    if (url == "") {
                        toast.warning("Empty URL")
                        return;
                    }

                    const body = {
                        data: {
                            url: newsurl,
                            village: checkedItems
                        }
                    }
                    try {
                        const response = await ApiCall(
                            'POST',
                            `${process.env.NEXT_PUBLIC_URL}/api/fetch-metadata`,
                            {},
                            body,
                            "Fail to Add News"
                        )

                        if (response?.id) {
                            toast.success("News Added SuccessFully")
                        }
                        else {
                            toast.warning("Something went wrong")
                        }

                    } catch (error) {
                        console.log(error)
                    }
                }
                else if (newstype === WITHOUTURL) {
                    if (!(newstitle && newsdescription && newscategory && newsimage && newsauthor && newssource)) {
                        toast.warning("All fields are mandatory")
                        return
                    }
                    try {
                        toast.info('Adding News...', { autoClose: false });
                        const imageIds = await UploadImage(NEWS, newsimage, checkedItems)
                        const memberid = localStorage.getItem("MemberId")
                        const body = {
                            data: {
                                "title": newstitle,
                                "description": newsdescription,
                                "news_category": newscategory,
                                "village": checkedItems,
                                "author": newsauthor,
                                "source": newssource,
                                "member": memberid,
                                "newsImage": imageIds,
                            }
                        }
                        console.log(body)
                        const response = await ApiCall(
                            'POST',
                            `${process.env.NEXT_PUBLIC_URL}/api/news`,
                            {},
                            body,
                            "Fail to Add News"
                        )
                        if (response?.data?.id) {
                            toast.dismiss()
                            toast.success("News Added SuccessFully")
                        }
                        else {
                            toast.dismiss()
                            toast.warning("Something went wrong")
                        }

                    } catch (error) {
                        toast.dismiss()
                        console.log(error)
                    }
                }
            }
            else if (Dropdown == NOTICE) {
                if (!(noticeheading && noticetype && noticedescription && noticeimage && noticecategory)) {
                    toast.warning("All fields are mandatory")
                    return
                }
                try {
                    toast.info('Adding Notice...', { autoClose: false });
                    const imageIds = await UploadImage(NOTICE, noticeimage, checkedItems)
                    const body = {
                        "data": {
                            "heading": noticeheading,
                            "type": noticetype,
                            "description": noticedescription,
                            "village": checkedItems,
                            "notice_category": noticecategory,
                            "images": imageIds,
                            "member": localStorage.getItem("MemberId"),
                            "status": "compose"
                        }
                    }

                    const response = await ApiCall(
                        'POST',
                        `${process.env.NEXT_PUBLIC_URL}/api/announcements`,
                        {},
                        body,
                        "Unable to Add Notice"
                    )
                    if (response?.data?.id) {
                        toast.dismiss()
                        toast.success("SuccessFully Added Notice")
                        ClearAllStateValue()
                    }
                    else {
                        toast.dismiss()
                        toast.error("Unable to add")
                    }

                } catch (error) {
                    toast.dismiss()
                    console.log(error)
                    toast.error("Unable to Public Notice")
                }
            }
        }
    }

    // Clear all state value 
    const ClearAllStateValue = () => {
        setSubdistrict("")
        setCity("")
        setState("")
        setActivated("")
        setIsSelectedAll(false)
        setCheckedItems([])
        if (Dropdown === NOTICE) {
            setNoticeHeading("")
            setNoticeType("")
            setNoticeDescription("")
            setNoticeCategory(allnoticecategory[0]?.id)
            setNoticeImage(null)
        }
        else {
            setNewsType(WITHURL)
            setNewsUrl("")
            setNewsTitle("")
            setNewsDescription("")
            setNewsAuthor("")
            setNewsSource("")
            setNewsCategory(allnewscategory[0]?.id)
            setNewsImage(null)
        }
    }

    // checking Auth and fetching data
    useEffect(() => {
        if (checkAuth()) {
            fetchData()
        }
        else {
            router.push("/auth/login")
        }
    }, [])


    // filter Function on change of values
    useEffect(() => {
        FilterOutData()
    }, [subdistrict, city, state, activated]);


    return (filterData && allnewscategory && allnoticecategory) ? (
        <>
            {/* Head */}
            <Head>
                <title>Village List</title>
                <link rel="shortcut icon" href="/favicon.png" type="image/x-icon" />
            </Head>
            {/* Body */}
            <div className='flex flex-col lg:flex-row min-h-fit'>
                <ToastContainer />
                {/*    Add Village , Filters and Table Data */}
                <div className="sm:w-full lg:w-3/4 min-h-[70vh] p-2 flex flex-col justify-start items-center">
                    {/*  Filters */}
                    <div className="w-full mb-5 flex flex-col sm:flex-wrap lg:flex-nowrap lg:flex-row justify-center items-center">
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
                                className="w-1/3 lg:w-1/4 bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-[#590DE1] focus:border-[#590DE1] block p-2.5 sm:mt-2 lg:mt-0 mx-1"
                            />
                            <input
                                type="text"
                                id="city"
                                placeholder="City"
                                autoComplete="off"
                                value={city}
                                onChange={(e) => { handleFilter(e, "city") }}
                                className="w-1/3 lg:w-1/4 bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-[#590DE1] focus:border-[#590DE1] block p-2.5 sm:mt-2 lg:mt-0 mx-1"
                            />
                            <input
                                type="text"
                                id="state"
                                placeholder="State"
                                autoComplete="off"
                                value={state}
                                onChange={(e) => { handleFilter(e, "state") }}
                                className="w-1/3 lg:w-1/4 bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-[#590DE1] focus:border-[#590DE1] block p-2.5 sm:mt-2 lg:mt-0 mx-1"
                            />
                            <select
                                value={activated}
                                onChange={(e) => { handleFilter(e, "activated") }}
                                className="w-1/3 lg:w-1/4 py-3 p-2.5 sm:mt-2 lg:mt-0 lg:mx-1 rounded-lg border-gray-300 border-2 bg-gray-50 t-md"
                            >
                                <option value="" className="w-full text-gray-700 block px-4 py-2 text-lg">None</option>
                                <option value={SUBSCRIBED} className="w-full text-gray-700 block px-4 py-2 text-lg">Subscribed</option>
                                <option value={UNSUBSCRIBED} className="w-full text-gray-700 block px-4 py-2 text-lg">Unsubscribed</option>
                            </select>
                        </div>
                        <div className='w-full lg:w-fit flex justify-end items-center p-2'>
                            <div className='flex flex-col justify-center items-center cursor-pointer hover:text-red-700' onClick={ClearFilter}>
                                <CiSquareRemove className='text-3xl' />
                                <h1 className="text-xs text-center">
                                    Clear
                                </h1>
                            </div>
                        </div>
                    </div>
                    {/* Add Village */}
                    <div className='text-black w-full p-2 flex justify-start lg:justify-end items-center'>
                        <Link href={"/village/addvillage"} className="min-w-fit bg-transparent hover:bg-[#590DE1] text-[#590DE1] font-semibold hover:text-white text-sm py-2 px-5 border border-[#590DE1] hover:border-transparent rounded-lg flex justify-between items-center">
                            Add Village
                            <LuPlusCircle className='text-lg font-bold ml-2' />
                        </Link>
                    </div>
                    {/* Table data */}
                    <div className="w-full overflow-x-auto p-2 flex justify-center items-center">
                        <table className="whitespace-nowrap w-4/5">
                            <thead>
                                <tr key='HeaderRow'>
                                    <th className='  px-6 py-3 bg-gray-300 text-center text-xs font-semibold text-black  uppercase'>
                                        <input type="checkbox" name="checkbox" id="checkbox"
                                            checked={isSelectedAll}
                                            onChange={CheckIsSelectedAll} />
                                    </th>
                                    <th className='  px-6 py-3 bg-gray-300 text-center text-xs font-semibold text-black  uppercase'>
                                        village
                                    </th>
                                    <th className='  px-6 py-3 bg-gray-300 text-center text-xs font-semibold text-black  uppercase'>
                                        subdistrict
                                    </th>
                                    <th className='  px-6 py-3 bg-gray-300 text-center text-xs font-semibold text-black  uppercase'>
                                        city
                                    </th>
                                    <th className='  px-6 py-3 bg-gray-300 text-center text-xs font-semibold text-black  uppercase'>
                                        state
                                    </th>
                                    <th className='  px-6 py-3 bg-gray-300 text-center text-xs font-semibold text-black  uppercase'>
                                        status
                                    </th>
                                    <th className='  px-6 py-3 bg-gray-300 text-center text-xs font-semibold text-black  uppercase'>
                                        action
                                    </th>
                                </tr>
                            </thead>
                            <tbody className='divide-y divide-gray-100'>
                                {
                                    filterData.length != 0 ? (
                                        filterData.map((element) => {
                                            return (
                                                <ListVillage element={element} checkedItems={checkedItems} handleCheckboxChange={handleCheckboxChange} />
                                            )
                                        })
                                    ) : (
                                        <tr key={"Loading"}>
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
                    {/* DropDown */}
                    <div className="w-full flex justify-evenly items-center mt-2">
                        <select
                            value={Dropdown}
                            onChange={(e) => { SetDropdown(e.target.value); }}
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
                        {/* NEWS */}
                        {Dropdown === NEWS ? (
                            <div className='mx-2 w-full'>
                                <div className="my-1 w-full" id='urlDiv'>
                                    <h1 className="font-bold text-xl text-[#590DE1]">URL</h1>
                                    <input
                                        type="text"
                                        id="url"
                                        placeholder="enter your URL of news"
                                        value={newsurl}
                                        autoComplete="off"
                                        onChange={(e) => {
                                            setNewsUrl(e.target.value);
                                        }}
                                        onFocus={(e) => hanldeFocus("url")}
                                        className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-[#590DE1] focus:border-[#590DE1] block p-2.5 mt-2"
                                    />
                                </div>
                                <div className='my-1 text-md text-center font-bold text-gray-600 flex justify-center items-center'>
                                    <div className='w-2/5 border-2 border-gray-600 h-0'>
                                    </div>
                                    <div className='w-1/5'>
                                        OR
                                    </div>
                                    <div className='w-2/5 border-2 border-gray-600 h-0'>
                                    </div>
                                </div>
                                <div>
                                    <form action="post" id='NewsForm'>
                                        <div className="">
                                            <h1 className="font-bold text-xl text-[#590DE1]">Title</h1>
                                            <input
                                                type="text"
                                                id="title"
                                                placeholder="Title"
                                                value={newstitle}
                                                onChange={(e) => { setNewsTitle(e.target.value) }}
                                                onFocus={(e) => hanldeFocus("noturl")}
                                                className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-[#590DE1] focus:border-[#590DE1] block p-2.5 mt-2"
                                            />
                                        </div>
                                        <div className="mt-2">
                                            <h1 className="font-bold text-xl text-[#590DE1]">Description</h1>
                                            <input
                                                type="text"
                                                id="description"
                                                placeholder="Description"
                                                autoComplete='off'
                                                value={newsdescription}
                                                onChange={(e) => { setNewsDescription(e.target.value) }}
                                                onFocus={(e) => hanldeFocus("noturl")}
                                                className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-[#590DE1] focus:border-[#590DE1] block p-2.5 mt-2"
                                            />
                                        </div>
                                        <div className='mt-2'>
                                            <h1 className="font-bold text-xl text-[#590DE1]">News Category</h1>
                                            <select
                                                value={newscategory}
                                                onChange={(e) => { setNewsCategory(e.target.value); }}
                                                className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-[#590DE1] focus:border-[#590DE1] block p-2.5 mt-2"
                                                onFocus={(e) => hanldeFocus("noturl")}
                                            >
                                                <option value={null} className="w-full text-gray-400 block px-4 py-2 text-lg">No Selected</option>
                                                {
                                                    allnewscategory.map((category) => (
                                                        <option
                                                            value={category?.id}
                                                            className="w-full text-gray-700 block px-4 py-2 text-lg"
                                                        >
                                                            {category?.attributes?.name}
                                                        </option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                        <div className="">
                                            <h1 className="font-bold text-xl text-[#590DE1]">Author</h1>
                                            <input
                                                type="text"
                                                id="author"
                                                placeholder="Author"
                                                value={newsauthor}
                                                onChange={(e) => { setNewsAuthor(e.target.value) }}
                                                onFocus={(e) => hanldeFocus("noturl")}
                                                className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-[#590DE1] focus:border-[#590DE1] block p-2.5 mt-2"
                                            />
                                        </div>
                                        <div className="">
                                            <h1 className="font-bold text-xl text-[#590DE1]">Source</h1>
                                            <input
                                                type="text"
                                                id="source"
                                                placeholder="Source"
                                                value={newssource}
                                                onChange={(e) => { setNewsSource(e.target.value) }}
                                                onFocus={(e) => hanldeFocus("noturl")}
                                                className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-[#590DE1] focus:border-[#590DE1] block p-2.5 mt-2"
                                            />
                                        </div>
                                        <div className="mt-2">
                                            <h1 className="font-bold text-xl text-[#590DE1]">Image</h1>
                                            <input
                                                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none text-md p-2"
                                                id="FileNewsInput"
                                                name='InputImage'
                                                onChange={(e) => handleImage(NEWS)}
                                                onFocus={(e) => hanldeFocus("noturl")}
                                                type="file"
                                                multiple
                                                accept="image/png, image/gif, image/jpeg"
                                            />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        ) : (
                            // Notice
                            <div className="m-2 w-full">
                                <form method="post" id='NoticeForm'>
                                    <div className="mt-2">
                                        <h1 className="font-bold text-xl text-[#590DE1]">Heading</h1>
                                        <input
                                            type="text"
                                            id="heading"
                                            placeholder="Heading"
                                            value={noticeheading}
                                            onChange={(e) => { setNoticeHeading(e.target.value) }}
                                            className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-[#590DE1] focus:border-[#590DE1] block p-2.5 mt-2"
                                        />
                                    </div>
                                    <div className="mt-2">
                                        <h1 className="font-bold text-xl text-[#590DE1]">Type</h1>
                                        <input
                                            type="text"
                                            id="type"
                                            placeholder="Type"
                                            value={noticetype}
                                            onChange={(e) => { setNoticeType(e.target.value) }}
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
                                            value={noticedescription}
                                            onChange={(e) => { setNoticeDescription(e.target.value) }}
                                            className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-[#590DE1] focus:border-[#590DE1] block p-2.5 mt-2"
                                        />
                                    </div>
                                    <div className='mt-2'>
                                        <h1 className="font-bold text-xl text-[#590DE1]">Notice Category</h1>
                                        <select
                                            value={noticecategory}
                                            onChange={(e) => { setNoticeCategory(e.target.value); }}
                                            className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-[#590DE1] focus:border-[#590DE1] block p-2.5 mt-2"
                                            onFocus={(e) => hanldeFocus("noturl")}
                                        >
                                            <option value={null} className="w-full text-gray-400 block px-4 py-2 text-lg">No Selected</option>
                                            {
                                                allnoticecategory.map((category) => (
                                                    <option
                                                        value={category?.id}
                                                        className="w-full text-gray-700 block px-4 py-2 text-lg"
                                                    >
                                                        {category?.attributes?.name}
                                                    </option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    <div className="mt-2">
                                        <h1 className="font-bold text-xl text-[#590DE1]">Image</h1>
                                        <input
                                            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none text-md p-2"
                                            id="FileNoticeInput"
                                            name='InputImage'
                                            onChange={(e) => handleImage(NOTICE)}
                                            type="file"
                                            multiple
                                            accept="image/png, image/gif, image/jpeg"
                                        />
                                    </div>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            </div >
        </>

    ) : (
        //   Loader
        <div className="min-h-[70vh] p-2 flex justify-center items-start animate-pulse">
            <div className='w-2/3 bg-gray-500 mx-2 rounded-lg'>

            </div>
            <div className='w-1/3 bg-gray-500 mx-2 rounded-lg'>

            </div>
        </div>
    )
}



export default Village