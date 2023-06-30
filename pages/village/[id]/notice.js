import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import checkAuth from '@/pages/utils/checkAuth'
import Notice from '@/pages/components/Notice'
import Head from 'next/head'
import ApiCall from '@/pages/api/ApiCall'
import Loader from '@/pages/components/Loader'

export const getServerSideProps = async (context) => {
    const { query } = context;
    return { props: { query } };
}

const notice = ({ query }) => {
    const router = useRouter()    
    const [details, setDetails] = useState([])
    const fetchData = async () => {
        try {
            const Id = query.id;            
            const response = await ApiCall(
                'GET',
                `${process.env.URL}/api/villages/${Id}?populate=*`,
                {},
                null,
                "Error in Fetching Notice"
            )
            console.log(response)
            setDetails(response?.data?.attributes?.notices?.data)
        } catch (error) {
            console.log("Fetch Data Error : ", error)
        }
    }


    useEffect(() => {
        if (!checkAuth()) {
            router.push("/auth/login")
        }
        else {
            fetchData()
        }
    }, [])


    return (
        <div>
            <Head>
                <title>
                    Notices
                </title>
                <link rel="shortcut icon" href="/favicon.png" type="image/x-icon" />
            </Head>
            {
                details ?
                    (
                        <div className='flex flex-col justify-start items-start mt-5'>
                            <div className='flex justify-center items-center mx-5'>
                                <h1 className='text-3xl font-bold text-[#590DE1] '>
                                    Notices
                                </h1>
                            </div>
                            <div className='w-full p-2 mt-2'>
                                {details.map((detail, index) => {
                                    return (
                                        <div>
                                            <Notice
                                                index={index}
                                                heading={detail?.attributes?.heading}
                                                description={detail?.attributes?.description} />
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    ) : (
                        <Loader/>
                    )


            }
        </div>
    )
}

export default notice
