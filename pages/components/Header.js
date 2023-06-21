import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import checkAuth from '../utils/checkAuth'
import logout from '../utils/logout'
import { useRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const Header = () => {
    const [isAuth, setIsAuth] = useState(false)
    const router = useRouter()
    const isAutheticated = () => {
        if (checkAuth()) {            
            setIsAuth(true)
        }        
    }
    useEffect(() => {
        isAutheticated()
    }, [])

    const handleLogout = () => {
        logout(); 
        setIsAuth(false);
        toast.success("Log-Out Successfull")
        router.push("/")
    }

    return (
        <div className='flex justify-center items-center p-2'>
            <ToastContainer/>
            <div className='  w-1/4 flex justify-start items-center'>
                <Link href={"/"}>
                    <Image src={"/icon.png"} width={300} height={100} alt="Picture of the author" />
                </Link>
            </div>
            <div className='  w-2/4 flex justify-start items-center'>
                <Link href={"/village"}>
                    <h1 className='text-xl font-bold cursor-pointer transition-all hover:border-b-2  border-[#590DE1] px-3 py-2 mr-5'>
                        Village
                    </h1>
                </Link>
                <Link href={"/contact"}>
                    <h1 className='text-xl font-bold cursor-pointer transition-all hover:border-b-2  border-[#590DE1] px-3 py-2 mr-5'>
                        Contact Us
                    </h1>
                </Link>
                <Link href={"/about"}>
                    <h1 className='text-xl font-bold cursor-pointer transition-all hover:border-b-2  border-[#590DE1] px-3 py-2 mr-5'>
                        About
                    </h1>
                </Link>
            </div>
            <div className='w-1/4   flex justify-end items-center'>
                {/* TODO: Add condition of href */}
                {
                    (isAuth) ?
                        (
                            <button onClick={handleLogout} className="bg-transparent hover:bg-[#590DE1] text-[#590DE1] font-semibold hover:text-white py-2 px-10 border border-[#590DE1] hover:border-transparent rounded-lg">
                                Log-out
                            </button>
                        ) : (
                            <Link href={"/auth/login"} className="bg-transparent hover:bg-[#590DE1] text-[#590DE1] font-semibold hover:text-white py-2 px-10 border border-[#590DE1] hover:border-transparent rounded-lg">
                                Log-In
                            </Link>
                        )
                }
            </div>
        </div>
    )
}

export default Header
