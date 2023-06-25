import React from 'react'

const Test = () => {
    return (
        <div className='flex justify-start items-center overflow-auto rounded-lg shadow-md'>
            <table className='w-full'>
                <thead className='bg-gray-50 border-b-2 border-gray-200'>
                    <tr>
                        <th className='w-1/7 tracking-wide px-6 py-3 bg-gray-50 text-center text-xs font-semibold text-black  uppercase'>
                            <input type="checkbox" name="checkbox" id="checkbox" />
                        </th>
                        <th className='w-1/7 tracking-wide px-6 py-3 bg-gray-50 text-center text-xs font-semibold text-black  uppercase'>
                            village
                        </th>
                        <th className='w-1/7 tracking-wide px-6 py-3 bg-gray-50 text-center text-xs font-semibold text-black  uppercase'>
                            subdistrict
                        </th>
                        <th className='w-1/7 tracking-wide px-6 py-3 bg-gray-50 text-center text-xs font-semibold text-black  uppercase'>
                            city
                        </th>
                        <th className='w-1/7 tracking-wide px-6 py-3 bg-gray-50 text-center text-xs font-semibold text-black  uppercase'>
                            state
                        </th>
                        <th className='w-1/7 tracking-wide px-6 py-3 bg-gray-50 text-center text-xs font-semibold text-black  uppercase'>
                            status
                        </th>
                        <th className='w-1/7 tracking-wide px-6 py-3 bg-gray-50 text-center text-xs font-semibold text-black  uppercase'>
                            action
                        </th>
                    </tr>
                </thead>
                <tbody className='divide-y divide-gray-100'>
                    <tr className='bg-white '>
                        <td className="p-3 text-sm text-gray-700 whitespace-normal text-center">
                            <input type="checkbox" name="" id="" />
                        </td>
                        <td className="p-3 text-sm text-gray-700 whitespace-normal text-center">
                            falla
                        </td>
                        <td className="p-3 text-sm text-gray-700 text-center whitespace-normal">
                            jamnagar
                        </td>
                        <td className="p-3 text-sm text-gray-700 whitespace-normal text-center">
                            jamnagar
                        </td>
                        <td className="p-3 text-sm text-gray-700 whitespace-normal text-center">
                            gujarat
                        </td>
                        <td className="p-3 text-sm text-gray-700 whitespace-normal text-center">
                            Subscribe
                        </td>
                        <td className="p-3 text-sm text-gray-700 whitespace-normal text-center">
                            more details
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Test