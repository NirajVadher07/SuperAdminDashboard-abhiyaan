import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import checkAuth from '@/pages/utils/checkAuth'
import News from '@/pages/components/News'
import Head from 'next/head'
import ApiCall from '@/pages/api/ApiCall'
import Loader from '@/pages/components/Loader'

export const getServerSideProps = async (context) => {
  const { query } = context;
  return { props: { query } };
}

const news = ({ query }) => {
  const router = useRouter()
  const [name, setName] = useState("")
  const [details, setDetails] = useState([])
  const fetchData = async () => {
    try {
      const Id = query.id;
      const response = await ApiCall(
        "GET",
        `${process.env.URL}/api/villages/${Id}?populate=*`,
        {},
        null,
        "Error in fetching News"
      )
      setDetails(response?.data?.attributes?.news?.data)

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
                      newsId={news?.id}
                      villageId={router?.query?.id}
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
            <Loader/>
          )
      }
    </div>
  )
}

export default news
