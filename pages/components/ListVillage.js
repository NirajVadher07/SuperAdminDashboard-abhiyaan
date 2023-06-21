import React from 'react'
import Link from 'next/link'
const ListVillage = (element) => {
    const { id, attributes } = element;
    return (
        <>
            <tr id={id} className="bg-white border-b hover:bg-[#590DE1] hover:text-white">
                <th scope="row" className=" text-left px-6 py-4 font-medium whitespace-nowrap">
                    {attributes.name}
                </th>
                <td className="px-6 py-4 text-center font-semibold">
                    {attributes.activated ? (
                        <div className='flex justify-center items-center'>
                            <h1 className='w-1/3'>Subscribed</h1>
                            <div className='w-[18px] h-[18px] bg-green-500 rounded-full ml-5'></div>
                        </div>
                    ) : (
                        <div className='flex justify-center items-center'>
                            <h1 className='w-1/3'>Unsubscribed</h1>
                            <div className='w-[18px] h-[18px] bg-red-500 rounded-full ml-5'></div>
                        </div>
                    )}
                </td>
                <td className="px-6 py-4 text-right font-semibold cursor-pointer">
                    <Link href={`/village/${id}`} className='border-2 p-2 rounded-lg border-white '>
                        More Details...
                    </Link>
                </td>
            </tr>
        </>
    )
}

export default ListVillage
