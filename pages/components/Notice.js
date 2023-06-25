import React from 'react'

const Notice = ({index,heading, description}) => {
    return (
        <div id={index} class="my-2 w-full flex flex-col lg:flex-row justify-center lg:items-start p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h5 class="w-full lg:w-1/4 mr-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {heading}
            </h5>
            <p class="w-full lg:w-3/4 sm:mt-2 lg:mt-0 font-normal text-gray-700 dark:text-gray-400 break-all">
                { description ?  description : "No decription Provided"}
            </p>
        </div>
    )
}

export default Notice