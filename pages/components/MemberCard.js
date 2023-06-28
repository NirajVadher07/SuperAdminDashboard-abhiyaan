import React from 'react'

const MemberCard = ({ index, firstname, lastname, mobileNumber, occupation }) => {
    return (
        <div id='index'  className="flex w-4/5 lg:w-1/4 mx-1 my-1  bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
            <div className='flex flex-col justify-start items-start w-2/3 p-6'>
                <h5  className="mb-2 text-md font-bold tracking-tight text-gray-900 dark:text-white break-all">
                    {`${firstname} ${lastname}`}
                </h5>
                <p  className="font-normal text-md text-blue-800 dark:text-gray-400 flex flex-col lg:flex-row justify-between items-start lg:items-center">
                    +91 {mobileNumber ? mobileNumber : "No avaliable"}
                </p>
            </div>
            <div className='w-1/3 flex justify-end items-end rounded-r-lg'
                style={{
                    backgroundImage: `url("https://marketplace.canva.com/EAFEits4-uw/1/0/1600w/canva-boy-cartoon-gamer-animated-twitch-profile-photo-oEqs2yqaL8s.jpg")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover'
                }}
            >
                <span  className="w-full text-center rounded-br-lg bg-gray-100 text-[#590DE1] text-xs font-semibold px-2.5 py-0.5 uppercase break-all opacity-70">
                    {occupation ? occupation : "None"}
                </span>
            </div>
        </div>
    )
}

export default MemberCard