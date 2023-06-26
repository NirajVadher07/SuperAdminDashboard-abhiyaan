import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import checkAuth from '@/pages/utils/checkAuth'
import Link from 'next/link'


export const getServerSideProps = async (context) => {
  const { query } = context;
  return { props: { query } };
}

const news = ({query}) => {
  const router = useRouter()
  const [newsId, setNewsId] = useState("")
  const [details, setDetails] = useState([])

  console.log(query)
  const fetchData = async () => {
    try {
      const Id = query.newsId;
      const url = `${process.env.URL}/api/news/${Id}`;
      const token = localStorage.getItem("UserToken")
      const requestOptions = {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` }
      }
      const jsonResponse = await fetch(url, requestOptions);
      const response = await jsonResponse.json();
      // console.log(response?.data)
      setNewsId(Id)
      setDetails(response?.data)
    } catch (error) {
      console.log("Fetch Data Error : ", error)
    }
  }


  useEffect(() => {
    if (!checkAuth()) {
      router.push("/auth/login")
    }
    else{
      fetchData()
    }
  }, [])
  
  return (
    <div>
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
                      <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-10 h-10" viewBox="0 0 24 24">
                        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
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