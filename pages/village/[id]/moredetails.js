import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import checkAuth from '@/pages/utils/checkAuth'
import Link from 'next/link'
import Notice from '@/pages/components/Notice'
import Complaint from '@/pages/components/Complaint'
import News from '@/pages/components/News'

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
                        <div>
                          {name == "notices" ? (
                            <Notice
                              index={index}
                              heading={detail?.attributes?.heading}
                              description={detail?.attributes?.description} />
                          ) : (
                            <Complaint
                              index={index}
                              title={detail?.attributes?.title}
                              description={detail?.attributes?.description} />
                          )}
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
                        <News
                          index={index}
                          image={news?.attributes?.image}
                          title={news?.attributes?.title}
                          description={news?.attributes?.description}
                          source={news?.attributes?.source}
                          url={news?.attributes?.url} />                                       
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
