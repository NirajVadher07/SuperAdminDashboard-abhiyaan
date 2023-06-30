import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import checkAuth from '@/pages/utils/checkAuth'
import ApiCall from '@/pages/api/ApiCall'
import Image from 'next/image'


export const getServerSideProps = async (context) => {
  const { query } = context;
  return { props: { query } };
}

const news = ({ query }) => {
  const router = useRouter()
  const [details, setDetails] = useState([])
  const fetchData = async () => {
    try {
      const Id = query.id;
      const response = await ApiCall(
        'GET',
        `${process.env.URL}/api/news/${Id}`,
        {},
        null,
        "Unable to Fetch News"
      )
      setDetails(response?.data)
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
          News
        </title>
        <link rel="shortcut icon" href="/favicon.png" type="image/x-icon" />
      </Head>
      {
        details ? (
          <section className="text-gray-600 body-font">
            <div className="container px-5 py-5 mx-auto flex flex-col">
              <div className="lg:w-4/6 mx-auto">
                <div className="rounded-lg h-64 overflow-hidden">
                  <img alt="news image" className="object-cover object-center h-full w-full" src={details?.image ? details?.image : "/news.jpg"} />
                </div>
                <div className="flex flex-col sm:flex-row mt-10">
                  <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8">
                    <div className="w-20 h-20 rounded-full inline-flex items-center justify-center bg-gray-200 text-gray-400">
                      <Image src={"/avatar.png"} width={500} height={500} className='rounded-full'/>
                    </div>
                    <div className="flex flex-col items-center text-center justify-center">
                      <h2 className="font-medium title-font mt-4 text-gray-900 text-lg">{details?.attributes?.author ? details?.attributes?.author : "AUTHOR"}</h2>
                      <div className="w-12 h-1 bg-indigo-500 rounded mt-2 mb-4"></div>
                      <p className="text-base">Author</p>
                    </div>
                  </div>
                  <div className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
                    <h1 className='leading-relaxed text-lg text-[#590DE1]'>Title</h1>
                    <p className="leading-relaxed text-lg mb-4">
                      {details?.attributes?.title ? details?.attributes?.title : "No Title"}
                    </p>
                    <h1 className='leading-relaxed text-lg text-[#590DE1]'>Description</h1>
                    <p className="leading-relaxed text-lg mb-4">
                      {details?.attributes?.description ? details?.attributes?.description : "No Description"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <div className='flex flex-col justify-center items-center h-[70vh]'>
            <h1 className='text-gray-500 font-bold italic text-3xl'>
              No data Found
            </h1>
            <Link href={"/village"} className="text-blue-700 font-semibold text-xl cursor-pointer mt-5">Go Back To Village</Link>
          </div>
        )
      }
    </div>
  )
}

export default news