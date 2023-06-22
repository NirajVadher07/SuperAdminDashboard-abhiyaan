import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import checkAuth from '@/pages/utils/checkAuth'
import Link from 'next/link'

const MoreDetails = () => {
  const router = useRouter()
  const [name, setName] = useState("")
  const [details, setDetails] = useState([])
  const fetchData = async () => {
    try {
      const Id = router?.query?.Id;
      const Name = router?.query?.Name;
      console.log(Id, Name)
      const url = `${process.env.URL}/api/villages/${Id}?populate=*`;
      const token = localStorage.getItem("UserToken")
      const requestOptions = {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` }
      }
      const jsonResponse = await fetch(url, requestOptions);
      const response = await jsonResponse.json();
      setName(Name);
      if (Name == "notices")
        setDetails(response?.data?.attributes?.notices?.data)
      else if (Name == "complaints")
        setDetails(response?.data?.attributes?.complaints?.data)
      else if (Name == "news")
        setDetails(response?.data?.attributes?.news?.data)
      else
        setDetails(["Null"])
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
  }, [router?.query?.Id, router?.query?.Name])

  console.log(details)

  return (
    <div>
      {
        name != "news" ?
          (
            details ?
              (
                <div className='flex flex-col justify-start items-start mt-5'>
                  <div className='flex justify-center items-center mx-5'>
                    <h1 className='text-3xl font-bold text-[#590DE1] '>
                      {name == "notices" ? "Notices" : "Complaints"}
                    </h1>
                  </div>
                  <div className='w-full p-2 mt-2'>
                    {details.map((detail, index) => {
                      return (
                        <div id={index} className='flex justify-center items-center border-b-2 border-black p-2 mt-2'>
                          <div className='w-1/4 text-center text-2xl font-semibold px-2'>
                            {name === "notices" ? detail?.attributes?.heading : detail?.attributes?.title}
                          </div>
                          <div className='w-3/4'>
                            {detail?.attributes?.description ? detail?.attributes?.description : "No decription Provided"}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ) : (
                "Loading...."
              )

          ) : (
            details ?
              (
                <div className='flex flex-col justify-start items-start mt-5'>
                  <div className='flex justify-center items-center mx-5'>
                    <h1 className='text-3xl font-bold text-[#590DE1] '>
                      News
                    </h1>
                  </div>
                  <div className='w-full p-2 mt-2 flex flex-wrap justify-evenly items-start'>
                    {details.map((news, index) => {
                      return (
                        <div id={index} className="w-1/4 min-h-[600px] mx-2 flex flex-col justify-between rounded overflow-hidden shadow-lg my-2">
                          <div>
                            <img className="w-full" style={{ height: "250px" }} src={news?.attributes?.image != null ? news?.attributes?.image : "/news.jpg"} alt="news image" />
                            <div className="px-6 py-4">
                              <div className="font-bold text-xl mb-2">{news?.attributes?.title?.substring(0, 100)}..</div>
                              <p className="text-gray-700 text-base">
                                {news?.attributes?.description?.substring(0, 230)}...
                              </p>
                            </div>
                          </div>
                          <div className="px-6 pt-4 pb-2 flex justify-evenly flex-wrap">
                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{news?.attributes?.source ? news?.attributes?.source : "NA"}</span>
                            <Link href={news?.attributes?.url ? news?.attributes?.url : "#"} className=" cursor-pointer inline-block bg-[#590DE1] rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2">Read More</Link>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ) : (
                "Loading...."
              )
          )

      }
    </div>
  )
}

export default MoreDetails
