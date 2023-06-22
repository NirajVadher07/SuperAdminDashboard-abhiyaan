import React from 'react'
import Link from 'next/link'

const ListVillage = ({ element }) => {
    const id = element?.id;
    const attributes = element?.attributes

    return (
        <>
            <td scope="row" className=" text-center px-6 py-4 whitespace-nowrap">
                {attributes.name ? attributes.name.toUpperCase() : "---"}
            </td>
            <td scope="row" className=" text-center px-6 py-4  whitespace-nowrap">
                {attributes?.sub_district?.data?.attributes?.name ? attributes?.sub_district?.data?.attributes?.name.toUpperCase() : "---"}
            </td>
            <td scope="row" className=" text-center px-6 py-4  whitespace-nowrap">
                {attributes?.city?.data?.attributes?.name ? attributes?.city?.data?.attributes?.name.toUpperCase() : "---"}
            </td>
            <td scope="row" className=" text-center px-6 py-4  whitespace-nowrap">
                {attributes?.state?.data?.attributes?.name ? attributes?.state?.data?.attributes?.name.toUpperCase() : "---"}
            </td>
            <td scope="row" className=" text-center px-6 py-4  whitespace-nowrap">
                {attributes?.activated ? "Subscribed" : ("Unsubscribed")}
            </td>
            <td className="px-6 py-4 text-right font-semibold cursor-pointer">
                <Link href={`/village/${id}`} className='p-2 rounded-lg'>
                    More Details
                </Link>
            </td>
        </>
    )
}

export default ListVillage
