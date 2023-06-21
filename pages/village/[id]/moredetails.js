import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import checkAuth from '@/pages/utils/checkAuth'

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
        details ? (
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
        ) : 
        ("Loading")
      }
    </div>
  )
}

export default MoreDetails
