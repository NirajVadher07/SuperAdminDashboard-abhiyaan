import React from 'react'
import Link from 'next/link'

const ListVillage = ({ element }) => {
    const id = element?.id;
    const attributes = element?.attributes       
    return (
        <>
            <td className="p-3 text-sm   whitespace-normal text-center">
                {attributes.name ? attributes.name.toUpperCase() : "---"}
            </td>
            <td className="p-3 text-sm   whitespace-normal text-center">
                {attributes?.sub_district?.data?.attributes?.name ? attributes?.sub_district?.data?.attributes?.name.toUpperCase() : "---"}
            </td>
            <td className="p-3 text-sm whitespace-normal text-center">
                {attributes?.city?.data?.attributes?.name ? attributes?.city?.data?.attributes?.name.toUpperCase() : "---"}
            </td>
            <td className="p-3 text-sm   whitespace-normal text-center">
                {attributes?.state?.data?.attributes?.name ? attributes?.state?.data?.attributes?.name.toUpperCase() : "---"}
            </td>
            <td className="p-3 text-sm   whitespace-normal text-center">
                {attributes?.activated ? "Subscribed" : ("Unsubscribed")}
            </td>
            <td className="p-3 text-sm   whitespace-normal text-center">
                <Link href={`/village/${id}`} className='p-2 rounded-lg'>
                    More Details
                </Link>
            </td>
        </>
    )
}

export default ListVillage
