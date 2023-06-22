import React from 'react'
import Link from 'next/link'

const ListVillage = ({ element, checkedItems, handleCheckboxChange }) => {
    const id = element?.id;
    const attributes = element?.attributes
    
    return (
        <>
            <tr id={`${id}-Village`} className={`font-medium text-black ${attributes?.activated ? ("hover:bg-green-500 hover:text-white") : ("hover:bg-red-500 hover:text-white")}`}>
                <td scope="row" className=" text-center px-6 py-4 whitespace-nowrap">
                    <input type="checkbox" name="village" id={`Village${id}`}
                        // value={id}
                        // checked={checkedItems.includes(id)}
                        // onChange={handleCheckboxChange}
                        className='w-5 h-5 text-[#590DE1] rounded-md focus:ring-0' />
                </td>
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
                <td className="px-6 py-4 text-right font-semibold cursor-pointer">
                    <Link href={`/village/${id}`} className='p-2 rounded-lg'>
                        More Details...
                    </Link>
                </td>
            </tr>
        </>
    )
}

export default ListVillage
