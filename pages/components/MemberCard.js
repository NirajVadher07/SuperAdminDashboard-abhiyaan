import React from 'react'

const MemberCard = ({index, firstname,lastname,mobileNumber, occupation}) => {
    return (
        <div id='index' class="block w-1/3 lg:w-1/4 mx-2 my-2 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white break-all">
                {`${firstname} ${lastname}`}
            </h5>
            <p class="font-normal text-blue-800 dark:text-gray-400 flex flex-col lg:flex-row justify-between items-start lg:items-center">
                +91 {mobileNumber ? mobileNumber : "No avaliable"}
                <span class="bg-blue-100 text-blue-800 text-sm font-medium  mt-2 lg:mt-0 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 uppercase break-all">
                    {occupation ? occupation : "None"}
                </span>
            </p>
        </div>
    )
}

export default MemberCard