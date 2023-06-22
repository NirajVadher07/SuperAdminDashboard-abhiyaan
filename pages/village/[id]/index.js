import React, { useEffect, useState } from 'react'
import checkAuth from '@/pages/utils/checkAuth'
import { useRouter } from 'next/router'
import Carosuel from '@/pages/components/Carosuel'
import Link from 'next/link'
import Loader from '@/pages/components/Loader'

const VillageDetails = () => {
    const router = useRouter()
    const [id, setId] = useState(null)
    const [attributes, setAttributes] = useState({})

    const fetchData = async () => {
        try {
            const Id = router?.query?.id;
            const url = `${process.env.URL}/api/villages/${Id}?populate=*`;
            const token = localStorage.getItem("UserToken")
            const requestOptions = {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${token}` }
            }
            const jsonResponse = await fetch(url, requestOptions);
            const response = await jsonResponse.json();
            setId(response?.data?.id)
            setAttributes(response?.data?.attributes)
        } catch (error) {
            console.log("Fetch Data Error : ", error)
        }
    }

    useEffect(() => {
        if (!checkAuth()) {
            router.push("/auth/login")
        }
    }, [])

    useEffect(() => {
        fetchData()
    }, [router?.query?.id])

    // attributes?.members?.data?.map((member)=>{
    //     console.log(member?.id, "-",member?.attributes?.lastname)
    // })

    return (
        <div className='text-black'>
            {
                attributes ? (
                    <div className='min-h-[100vh] mt-2'>
                        {/* village name and other information */}
                        <div className={`p-2 flex justify-evenly items-center ${attributes?.activated ? ("bg-green-500") : ("bg-red-500")} bg-green-500 text-white`}>
                            <div className='text-3xl font-bold flex flex-col justify-center items-center'>
                                {attributes?.name ? (attributes?.name) : ("---")}
                                <span className='text-xs font-semibold text-gray-300'>Village</span>
                            </div>
                            <div className='text-3xl font-bold flex flex-col justify-center items-center'>
                                {attributes?.sub_district?.data?.attributes?.name ? (attributes?.sub_district?.data?.attributes?.name) : ("---")}
                                <span className='text-xs font-semibold text-gray-300'>Sub District</span>
                            </div>
                            <div className='text-3xl font-bold flex flex-col justify-center items-center'>
                                {attributes?.city?.data?.attributes?.name ? (attributes?.city?.data?.attributes?.name) : ("---")}
                                <span className='text-xs font-semibold text-gray-300'>City</span>
                            </div>
                            <div className='text-3xl font-bold flex flex-col justify-center items-center'>
                                {attributes?.state?.data?.attributes?.name ? (attributes?.state?.data?.attributes?.name) : ("---")}
                                <span className='text-xs font-semibold text-gray-300'>State</span>
                            </div>
                        </div>
                        {/* member */}
                        <div className='flex flex-col justify-start items-start mt-5'>
                            <div className='flex justify-center items-center mx-5'>
                                <h1 className='text-3xl font-bold text-[#590DE1] '>
                                    Members
                                </h1>
                            </div>
                            <div className='p-2 flex flex-wrap justify-evenly items-center'>
                                {/* {attributes?.members?.data.length} */}
                                {attributes?.members?.data && attributes?.members?.data.length != 0 && attributes?.members?.data?.map((member, index) => {
                                    return (<div id={index} className='flex flex-col justify-center item-center border-2 border-gray-600 rounded-lg p-2 min-w-[200px] mx-2 my-1'>
                                        <h1 className='text-center text-lg'>
                                            {`${member?.attributes?.firstname} ${member?.attributes?.lastname}`}
                                        </h1>
                                        <h2 className='text-center text-md'>
                                            {member?.attributes?.mobile ? member?.attributes?.mobile : "---"}
                                        </h2>
                                        <h3 className='text-center text-xs'>
                                            {member?.attributes?.occupation ? member?.attributes?.occupation : "---"}
                                        </h3>
                                    </div>)
                                })}
                            </div>
                            {attributes?.members?.data.length === 0 ? (
                                <div className='text-center italic font-bold text-xl w-full text-gray-600'>
                                    No Member
                                </div>
                            ) : ("")}
                        </div>
                        {/* Notices */}
                        <div className='flex flex-col justify-start items-start mt-5'>
                            <div className='flex justify-center items-center mx-5'>
                                <h1 className='text-3xl font-bold text-[#590DE1] '>
                                    Notices
                                </h1>
                            </div>
                            <div className='w-full p-2 mt-2'>
                                {attributes?.notices?.data && attributes?.notices?.data.length != 0 && attributes?.notices?.data?.map((notice, index) => {
                                    return index < 5 ? (
                                        (
                                            <div id={index} className='flex justify-center items-center border-b-2 border-black p-2 mt-2'>
                                                <div className='w-1/4 text-center text-2xl font-semibold px-2'>
                                                    {notice?.attributes?.heading}
                                                </div>
                                                <div className='w-3/4'>
                                                    {notice?.attributes?.description ? notice?.attributes?.description : "No decription Provided"}
                                                </div>
                                            </div>
                                        )
                                    ) : (
                                        ""
                                    )
                                })}
                                {attributes?.notices?.data.length != 0 && attributes?.notices?.data.length > 5 ? (
                                    <Link href={{
                                        pathname: `/village/${id}/moredetails`,
                                        query: { Id: id, Name: "notices" },
                                    }}>
                                        <button className="bg-transparent hover:bg-[#590DE1] text-[#590DE1] font-semibold hover:text-white py-2 px-10 my-5 border border-[#590DE1] hover:border-transparent rounded-lg">
                                            More Details..
                                        </button>
                                    </Link>
                                ) : ("")}
                                {attributes?.notices?.data.length === 0 ? (
                                    <div className='text-center italic font-bold text-xl w-full text-gray-600'>
                                        No Notices
                                    </div>
                                ) : ("")}
                            </div>
                        </div>
                        {/* Complaints */}
                        <div className='flex flex-col justify-start items-start mt-5'>
                            <div className='flex justify-center items-center mx-5'>
                                <h1 className='text-3xl font-bold text-[#590DE1] '>
                                    Complaints
                                </h1>
                            </div>
                            <div className='w-full p-2 mt-2'>
                                {attributes?.complaints?.data && attributes?.complaints?.data.length != 0 && attributes?.complaints?.data?.map((complaint, index) => {
                                    return index < 5 ? (
                                        <div id={index} className='flex justify-center items-center border-b-2 border-black p-2 mt-2'>
                                            <div className='w-1/4 text-center text-2xl font-semibold px-2'>
                                                {complaint?.attributes?.title}
                                            </div>
                                            <div className='w-3/4'>
                                                {complaint?.attributes?.description ? complaint?.attributes?.description : "No decription Provided"}
                                            </div>
                                        </div>
                                    ) : (
                                        ""
                                    )
                                })}
                                {attributes?.complaints?.data.length != 0 && attributes?.complaints?.data.length > 5 ? (
                                    <Link href={{
                                        pathname: `/village/${id}/moredetails`,
                                        query: { Id: id, Name: "complaints" },
                                    }}>
                                        <button className="bg-transparent hover:bg-[#590DE1] text-[#590DE1] font-semibold hover:text-white py-2 px-10 my-5 border border-[#590DE1] hover:border-transparent rounded-lg">
                                            More Details..
                                        </button>
                                    </Link>
                                ) : ("")}
                                {attributes?.complaints?.data.length === 0 ? (
                                    <div className='text-center italic font-bold text-xl w-full text-gray-600'>
                                        No Complaint
                                    </div>
                                ) : ("")}
                            </div>
                        </div>
                        {/* News */}
                        <div className='flex flex-col justify-start items-start mt-5'>
                            <div className='flex justify-center items-center mx-5'>
                                <h1 className='text-3xl font-bold text-[#590DE1] '>
                                    News
                                </h1>
                            </div>
                            <div className='w-full p-2 mt-2 flex justify-evenly items-start'>
                                {attributes?.news?.data && attributes?.news?.data.length != 0 && attributes?.news?.data?.map((news, index) => {
                                    return index < 3 ?
                                        (
                                            <div className="w-1/4 min-h-[600px] mx-2 my-2 rounded flex flex-col justify-evenly overflow-hidden shadow-lg">
                                                <img className="w-full" style={{ height: "250px" }} src={news?.attributes?.image != null ? news?.attributes?.image : "/news.jpg"} alt="news image" />
                                                <div className="px-6 py-4">
                                                    <div className="font-bold text-xl mb-2">{news?.attributes?.title.substring(0, 100)}..</div>
                                                    <p className="text-gray-700 text-base">
                                                        {news?.attributes?.description.substring(0, 230)}...
                                                    </p>
                                                </div>
                                                <div className="px-6 pt-4 pb-2 flex justify-evenly">
                                                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{news?.attributes?.source ? news?.attributes?.source : "NA"}</span>
                                                    <Link href={news?.attributes?.url ? news?.attributes?.url : "#"} className=" cursor-pointer inline-block bg-[#590DE1] rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2">Read More</Link>
                                                </div>
                                            </div>
                                        ) : (
                                            " "
                                        )
                                })}
                            </div>
                            <div>
                                {attributes?.news?.data.length != 0 && attributes?.news?.data.length > 3 ? (
                                    <Link href={{
                                        pathname: `/village/${id}/moredetails`,
                                        query: { Id: id, Name: "news" },
                                    }} className='p-2 mt-2 '>
                                        <button className="bg-transparent hover:bg-[#590DE1] text-[#590DE1] font-semibold hover:text-white py-2 px-10 my-5 border border-[#590DE1] hover:border-transparent rounded-lg">
                                            More Details..
                                        </button>
                                    </Link>
                                ) : ("")}
                                {attributes?.news?.data.length === 0 ? (
                                    <div className='text-center italic font-bold text-xl w-[100vw] text-gray-600'>
                                        <div>
                                            No news
                                        </div>
                                    </div>
                                ) : ("")}
                            </div>
                        </div>
                        {/* Carousel */}
                        {/* <div className='h-[60vh]'>
                            <Carosuel gallery={attributes?.gallery?.data}/>
                        </div> */}
                    </div>
                ) : (
                    <Loader/>
                )}
        </div>
    )
}



export default VillageDetails
