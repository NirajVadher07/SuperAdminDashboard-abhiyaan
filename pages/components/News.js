import React from 'react'
import Link from 'next/link'
const News = ({ index, image, title, description, source, url }) => {
  return (
    <div id={index} className="sm:w-full lg:w-1/4 min-h-[600px] mx-2 my-2 rounded flex flex-col justify-between overflow-hidden shadow-lg">
      <div>
        <img className="w-full h-[500px] lg:h-[250px]" src={image != null ? image : "/news.jpg"} alt="news image" />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{title?.substring(0, 100)}..</div>
          <p className="text-gray-700 text-base">
            {description?.substring(0, 230)}...
          </p>
        </div>
      </div>
      <div className="px-6 pt-4 pb-2 flex justify-evenly">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{source ? source : "NA"}</span>
        <Link href={url ? url : "#"} className=" cursor-pointer inline-block bg-[#590DE1] rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2">Read More</Link>
      </div>
    </div>
  )
}

export default News