import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import checkAuth from '../utils/checkAuth'
import logout from '../utils/logout'
import { useRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { GiHamburgerMenu } from "react-icons/gi"

const Header = () => {
    const [isAuth, setIsAuth] = useState(false)    
    const router = useRouter()
    
    useEffect(() => {
        if (checkAuth()) {
            setIsAuth(true)
        }
    }, [])

    const handleLogout = () => {
        logout();
        setIsAuth(false);
        toast.success("Log-Out Successfull")
        router.push("/")
    }

    // TODO: TOGGLER
    function removeClassName(classList, classNameToRemove) {
        return classList.filter(className => className !== classNameToRemove);
    }

    function addClassName(classList, classNameToAdd) {
        if (!classList.includes(classNameToAdd)) {
            classList.push(classNameToAdd);
        }
        return classList;
    }

    function toggleClassName(elementId, className) {
        const element = document.getElementById(elementId);
        if (element) {
            const classList = element.className.split(' ');

            if (classList.includes(className)) {
                const updatedClassList = removeClassName(classList, className);
                element.className = updatedClassList.join(' ');
            } else {
                const updatedClassList = addClassName(classList, className);
                element.className = updatedClassList.join(' ');
            }
        }
    }

    const toggler = () => {
        toggleClassName("NavbarMenu", "hidden")        
    }

    return (
        <div className='flex  flex-col lg:flex-row justify-center items-center p-2'>
            <ToastContainer />
            <div className='w-full lg:w-1/4 flex lg:justify-start justify-between items-center'>
                <Link href={"/"}>
                    <Image src={"/icon.png"} width={300} height={100} alt="Picture of the author" />
                </Link>
                <div className='text-center lg:hidden'>
                    <GiHamburgerMenu id='menu' className='text-3xl cursor-pointer' onClick={toggler} />
                </div>
            </div>
            <div id='NavbarMenu' className={`w-full lg:3/4 hidden lg:flex lg:flex-row flex-col lg:ml-5 shadow-2xl lg:shadow-none py-2 px-2 lg:p-0 rounded-lg lg:rounded-none transition-shadow`}>
                <div className='w-full lg:w-3/4 flex flex-col lg:flex-row justify-start items-start lg:items-center'>
                    <Link href={"/village"}>
                        <h1 className='text-xl font-bold cursor-pointer transition-all lg:hover:border-b-2  border-[#590DE1] px-3 py-2 mr-5'>
                            Village
                        </h1>
                    </Link>
                    <Link href={"/contact"}>
                        <h1 className='text-xl font-bold cursor-pointer transition-all lg:hover:border-b-2  border-[#590DE1] px-3 py-2 mr-5'>
                            Contact Us
                        </h1>
                    </Link>
                    <Link href={"/about"}>
                        <h1 className='text-xl font-bold cursor-pointer transition-all lg:hover:border-b-2  border-[#590DE1] px-3 py-2 mr-5'>
                            About
                        </h1>
                    </Link>
                </div>
                <div className=' w-full lg:w-1/4 flex justify-end items-center'>
                    {/* TODO: Add condition of href */}
                    {
                        (isAuth) ?
                            (
                                <button onClick={handleLogout} className="min-w-fit bg-transparent hover:bg-[#590DE1] text-[#590DE1] font-semibold hover:text-white py-2 px-10 border border-[#590DE1] hover:border-transparent rounded-lg">
                                    Log-out
                                </button>
                            ) : (
                                <Link href={"/auth/login"} className="min-w-fit bg-transparent hover:bg-[#590DE1] text-[#590DE1] font-semibold hover:text-white py-2 px-10 border border-[#590DE1] hover:border-transparent rounded-lg">
                                    Log-In
                                </Link>
                            )
                    }
                </div>
            </div>

        </div>
    )
}

export default Header
