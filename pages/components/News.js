import React from 'react'
// import Link from 'next/link'
import { useRouter } from 'next/router'
// import handler from '../api/hello'

const News = ({ index, newsId, villageId , image, title, description, source, url }) => {
  const router = useRouter()
  const HandleURL = () =>{
    if(url){
      router.push({
        pathname : url
      })
    }
    else{
      router.push({
        pathname: `/village/${villageId}/news`,
        query: { newsId : newsId },
      }, `/village/${villageId}/news`)
    }
  }
  return (
    <div id={index} className="sm:w-full lg:w-1/4 min-h-[600px] mx-2 my-2 rounded-lg flex flex-col justify-between overflow-hidden shadow-lg">
      <div>
        <img className="w-full h-[500px] lg:h-[250px]" src={image != null ? image : "/news.jpg"} alt="news image" />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{title?.substring(0, 100)}..</div>
          <p className="text-gray-700 text-base">
            {description?.substring(0, 230)}...
          </p>
        </div>
      </div>
      <div className="px-6 pb-4 flex justify-evenly items-center flex-wrap">
        <span className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 flex justify-center items-center">{source ? source : "NA"}</span>
        <button onClick={HandleURL} className=" cursor-pointer inline-block bg-[#590DE1] rounded-full px-3 py-1 text-sm font-semibold text-white my-2">Read More</button>
      </div>
    </div>
  )
}

export default News