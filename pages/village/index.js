import React, { useEffect, useMemo, useState } from 'react'
import checkAuth from '../utils/checkAuth'
import { useRouter } from 'next/router'
import ListVillage from '../components/ListVillage'
import { FaFilter } from "react-icons/fa"
import { BsDatabaseFillExclamation } from "react-icons/bs"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
// import { FormData } from 'formdata-node';


//  TODO: DEFINING VARIABLES 
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

const Village = () => {
    const router = useRouter()

    //  TODO: fetching intial data
    const [villageData, setVillageData] = useState([])
    const [allnewscategory, setAllNewsCategory] = useState([])
    const [allnoticecategory, setAllNoticeCategory] = useState([])
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
    const [newtype, setNewtype] = useState(WITHURL)
    const [url, setUrl] = useState("")
    const [newstitle, setNewsTitle] = useState("")
    const [newsdescription, setNewsDescription] = useState("")
    const [newsauthor, setNewsAuthor] = useState("")
    const [newssource, setNewsSource] = useState("")
    const [newscategory, setNewsCategory] = useState(allnewscategory[0]?.id);
    const [newsimage, setNewsImage] = useState()

    //  TODO: NOTICE state    
    const [noticeheading, setNoticeHeading] = useState("")
    const [noticetype, setNoticeType] = useState("")
    const [noticedescription, setNoticeDescription] = useState("")
    const [noticecategory, setNoticeCategory] = useState(allnoticecategory[0]?.id)
    const [noticeimage, setNoticeImage] = useState()


    const fetchData = async () => {
        try {
            let url = `${process.env.NEXT_PUBLIC_URL}/api/villages?populate=*`
            const token = localStorage.getItem("UserToken")
            let requestOptions = {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${token}` }
            }
            const responseJson = await fetch(url, requestOptions);
            const response = await responseJson.json();
            setVillageData(response.data);
            setFilterData(response.data);


            url = `${process.env.NEXT_PUBLIC_URL}/api/news-categories`
            const newCatorgoryResponseJson = await fetch(url, requestOptions)
            const newCatorgoryResponse = await newCatorgoryResponseJson.json()
            setAllNewsCategory(newCatorgoryResponse.data)

            url = `${process.env.NEXT_PUBLIC_URL}/api/notice-categories`
            const noticeCatorgoryResponseJson = await fetch(url, requestOptions)
            const noticeCatorgoryResponse = await noticeCatorgoryResponseJson.json()
            setAllNoticeCategory(noticeCatorgoryResponse.data)

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

    const handleImage = (Name) => {
        switch (Name) {
            case NOTICE:
                let NoticefileInput = document.getElementById('FileNoticeInput');
                let Noticeimage = NoticefileInput.files[0];
                setNoticeImage(Noticeimage)
                // uploadImage(Noticeimage, 1)
                break;
            case NEWS:
                let NewsfileInput = document.getElementById('FileNewsInput');
                let Newsimage = NewsfileInput.files[0];
                setNewsImage(Newsimage)
                break;
            default:
                toast.warning("Unexpected Handle Image Call")
                break;
        }
    }

    const hanldeFocus = (condition) => {
        const newsform = document.getElementById("NewsForm")
        const urlDiv = document.getElementById("urlDiv")
        if (condition == "url") {
            newsform?.classList.add("opacity-30")
            urlDiv?.classList.remove("opacity-30")
            setNewtype(WITHURL)
        }
        else if (condition == "noturl") {
            urlDiv?.classList.add("opacity-30")
            newsform?.classList.remove("opacity-30")
            setNewtype(WITHOUTURL)
        }
    }

    const uploadImage = async (image, villageId) => {
        try {
            const url = `${process.env.NEXT_PUBLIC_URL}/api/upload`
            const token = localStorage.getItem("UserToken")
            let isUploaded = -99999

            let formdata = new FormData();
            formdata.append("files", image);
            formdata.append("village", villageId);

            // console.log(image)
            // formdata.forEach((value, key) => {
            //     console.log("key %s: value %s", key, value);
            // })

            var requestOptions = {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` },
                body: formdata,

            };
            const responseJson = await fetch(url, requestOptions)
            const response = await responseJson.json()
            response.map((element) => {
                if (element?.id) {
                    isUploaded = element?.id
                }
            })

            return isUploaded

        } catch (error) {
            console.log(error)
            return false
        }
    }

    //  TODO: HandleNoticeNews 
    const HandleNoticeNews = async () => {
        if (checkedItems.length == 0) {
            toast.warning("Please Select Any Villages")
            return;
        }
        else {
            if (Dropdown == NEWS) {
                if (newtype === WITHURL) {
                    if (url == "") {
                        toast.warning("Empty URL")
                        return;
                    }

                    const body = {
                        data: {
                            url
                        }
                    }
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
                else if (newtype === WITHOUTURL) {
                    if (!(newstitle && newsdescription && newscategory && newsimage && newsauthor && newssource)) {
                        toast.warning("All fields are mandatory")
                        return
                    }

                    const body = {
                        data: {
                            "title": newstitle,
                            "description": newsdescription,
                            "news_category": newscategory,
                            "village": checkedItems,
                            "author": newsauthor,
                            "source": newssource,
                            "member": 86,
                            "newsImage": newsimage,
                        }
                    }
                    try {
                        const url = `${process.env.NEXT_PUBLIC_URL}/api/news`;
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
                        if (response?.data?.id) {
                            toast.success("News Added SuccessFully")
                        }
                        else {
                            toast.warning("Something went wrong")
                        }

                    } catch (error) {
                        toast.error("Fail to Add News")
                    }
                }
            }
            else if (Dropdown == NOTICE) {
                if (!(noticeheading && noticetype && noticedescription && noticeimage)) {
                    toast.warning("All fields are mandatory")
                    return
                }
                try {
                    checkedItems.map(async (villageId) => {
                        const imageId = await uploadImage(noticeimage, parseInt(villageId, 10))

                        if (imageId) {
                            let url = `${process.env.NEXT_PUBLIC_URL}/api/announcements`
                            let token = localStorage.getItem("UserToken")
                            // let memberId = localStorage.getItem("UserDetails").id
                            const body = {
                                "data": {
                                    "heading": noticeheading,
                                    "type": noticetype,
                                    "description": noticedescription,
                                    "village": [
                                        villageId
                                    ],
                                    "notice_category": noticecategory,
                                    "images": imageId,
                                    // TODO: "member": ,
                                    "status": "compose"
                                }
                            }
                            var requestOptions = {
                                method: 'POST',
                                headers: { 'Authorization': `Bearer ${token}` },
                                body: JSON.stringify(body),

                            };
                            const responseJson = await fetch(url, requestOptions)
                            const response = await responseJson.json()
                            console.log(response)
                        }
                        else {
                            toast.error(`Unable to upload Image in Village ID: ${villageId}`)
                            return;
                        }
                    })

                    toast.success("SuccessFully Added Notice to All villages")

                } catch (error) {
                    console.log(error)
                    toast.error("Unable to Public Notice")
                }


            }
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



    return (filterData && allnewscategory && allnoticecategory) ? (
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
                <div className='relative flex justify-start items-center rounded-lg shadow-md'>
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
                                            <ListVillage element={element} checkedItems={checkedItems} handleCheckboxChange={handleCheckboxChange} />
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
                                    value={url}
                                    autoComplete="off"
                                    onChange={(e) => {
                                        setUrl(e.target.value);
                                    }}
                                    onFocus={(e) => hanldeFocus("url")}
                                    className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-[#590DE1] focus:border-[#590DE1] block p-2.5 mt-2"
                                />
                            </div>
                            <div className='my-1 text-md text-center font-bold text-gray-600'>
                                OR
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
                                    />
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div >

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