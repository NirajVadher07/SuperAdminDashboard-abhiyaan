import React, { useEffect, useState } from 'react'
import checkAuth from '@/pages/utils/checkAuth'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Loader from '@/pages/components/Loader'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import ImageSlider from '@/pages/components/ImageSlider'
import Notice from '@/pages/components/Notice'
import Complaint from '@/pages/components/Complaint'
import News from '@/pages/components/News'
import MemberCard from '@/pages/components/MemberCard'

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
            toast.error("Fetch Data Error");
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


    return (
        <div className='text-black'>
            <ToastContainer />
            {
                attributes ? (
                    <div className='min-h-[100vh] mt-2'>
                        {/* village name and other information */}
                        <div className={`p-2 flex justify-evenly items-center flex-wrap ${attributes?.activated ? ("bg-green-500") : ("bg-red-500")} bg-green-500 text-white`}>
                            <div className='sm:w-1/2 lg:w-1/4 sm:my-2 lg:my-0 sm:text-xl lg:text-3xl font-bold flex flex-col justify-center items-center'>
                                {attributes?.name ? (attributes?.name) : ("---")}
                                <span className='text-xs font-semibold text-gray-300'>Village</span>
                            </div>
                            <div className='sm:w-1/2 lg:w-1/4 sm:my-2 lg:my-0 sm:text-xl lg:text-3xl font-bold flex flex-col justify-center items-center'>
                                {attributes?.sub_district?.data?.attributes?.name ? (attributes?.sub_district?.data?.attributes?.name) : ("---")}
                                <span className='text-xs font-semibold text-gray-300'>Sub District</span>
                            </div>
                            <div className='sm:w-1/2 lg:w-1/4 sm:my-2 lg:my-0 sm:text-xl lg:text-3xl font-bold flex flex-col justify-center items-center'>
                                {attributes?.city?.data?.attributes?.name ? (attributes?.city?.data?.attributes?.name) : ("---")}
                                <span className='text-xs font-semibold text-gray-300'>City</span>
                            </div>
                            <div className='sm:w-1/2 lg:w-1/4 sm:my-2 lg:my-0 sm:text-xl lg:text-3xl font-bold flex flex-col justify-center items-center'>
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
                                    return (
                                        <MemberCard
                                            index={index}
                                            firstname={member?.attributes?.firstname}
                                            lastname={member?.attributes?.lastname}
                                            mobileNumber={member?.attributes?.mobile}
                                            occupation={member?.attributes?.occupation}
                                        />
                                    )
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
                                            <Notice
                                                index={index}
                                                heading={notice?.attributes?.heading}
                                                description={notice?.attributes?.description} />
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
                                        <Complaint 
                                        index={index} 
                                        title={complaint?.attributes?.title} 
                                        description={complaint?.attributes?.description} />                                        
                                        
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
                            <div className='w-full p-2 mt-2 flex flex-col lg:flex-row justify-evenly items-start'>
                                {attributes?.news?.data && attributes?.news?.data.length != 0 && attributes?.news?.data?.map((news, index) => {
                                    return index < 3 ?
                                        (
                                            <News 
                                            index={index} 
                                            image={news?.attributes?.image} 
                                            title={news?.attributes?.title} 
                                            description={news?.attributes?.description} 
                                            source={news?.attributes?.source} 
                                            url={news?.attributes?.url} />
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
                        <div>
                            <ImageSlider gallery={attributes?.gallery?.data} />
                        </div>
                    </div>
                ) : (
                    <Loader />
                )}
        </div>
    )
}



export default VillageDetails
