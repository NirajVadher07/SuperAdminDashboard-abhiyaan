import React from 'react'
import Link from 'next/link'

const ListVillage = ({ element, checkedItems, handleCheckboxChange }) => {
    const id = element?.id;
    const attributes = element?.attributes
    return (
        <tr key={id} className={`bg-white text-gray-800 hover:text-white ${element?.attributes?.activated == true ? "hover:bg-green-500 " : "hover:bg-red-500"}`}>
            <td className="p-3 text-sm whitespace-normal text-center">
                <input type="checkbox" name="village"
                    value={element?.id}
                    checked={checkedItems.includes((element?.id.toString()))}
                    onChange={handleCheckboxChange}
                />
            </td>
            <td key={`name${id}`}  className="p-3 text-sm whitespace-normal text-center">
                {attributes.name ? attributes.name  : "---"}
            </td>
            <td key={`Subdistrictname${id}`} className="p-3 text-sm whitespace-normal text-center">
                {attributes?.sub_district?.data?.attributes?.name ? attributes?.sub_district?.data?.attributes?.name  : "---"}
            </td>
            <td key={`citynamename${id}`} className="p-3 text-sm whitespace-normal text-center">
                {attributes?.city?.data?.attributes?.name ? attributes?.city?.data?.attributes?.name  : "---"}
            </td>
            <td key={`statename${id}`} className="p-3 text-sm   whitespace-normal text-center">
                {attributes?.state?.data?.attributes?.name ? attributes?.state?.data?.attributes?.name  : "---"}
            </td>
            <td key={`status${id}`} className="p-3 text-sm   whitespace-normal text-center">
                {attributes?.activated ? "Subscribed"  : ("Unsubscribed" )}
            </td>
            <td key={`action${id}`} className="p-3 text-sm   whitespace-normal text-center">
                <Link href={`/village/${id}`} className='p-2 rounded-lg'>
                    More Details
                </Link>
            </td>
        </tr>
    )
}

export default ListVillage
