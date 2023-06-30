'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router'
import Head from 'next/head'


const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter();
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (email == "" || password == "") {
            toast.error("Email and Passoword cannot be empty")
            return
        }
        const url = `${process.env.NEXT_PUBLIC_URL}/api/auth/local`
        const body = {
            "identifier": email,
            "password": password
        }

        const requestOptions = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        };

        const res = await fetch(url, requestOptions);
        const data = await res.json();

        if (data.jwt) {            
            localStorage.setItem("UserToken", data.jwt)
            let url = `${process.env.NEXT_PUBLIC_URL}/api/members?filters[mobile]=${data?.user?.mobile}`
            let requestOptions = {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${data.jwt}` }
            }
            const responseJson = await fetch(url, requestOptions);
            const response = await responseJson.json();            
            const memberId = response?.data?.[0]?.id
            console.log(memberId)
            localStorage.setItem("MemberId", memberId)
            router.push("/")
        }
        else {
            toast.error("Invalid Credentials")
        }

        setEmail("")
        setPassword("")
    }

    return (
        <div className='flex flex-col justify-center items-center min-h-screen'>
            <Head>
                <title>Login</title>
                <link rel="shortcut icon" href="/favicon.png" type="image/x-icon" />
            </Head>
            <ToastContainer />
            <div className="shadow-2xl rounded-lg w-full m-5 lg:w-1/3 p-5">
                <div className='flex justify-center items-center my-2'>
                    <Link href={"/"}>
                        <Image src={"/icon.png"} width={300} height={100} alt="Picture of the author" />
                    </Link>
                </div>
                <div className='h-fit px-5 py-2'>
                    <h1 className='text-2xl font-bold'>
                        Log in to your Account
                    </h1>
                    <form onSubmit={handleSubmit} method="post">
                        <div className='mt-5'>
                            <div>
                                <h1 className='text-lg font-bold py-2'>Email</h1>
                                <input type="text" name='email' id='email' autoComplete='off' value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder='name@company.com' className='text-lg p-2 w-full border-2 rounded-lg' />
                            </div>
                            <div>
                                <h1 className='text-lg font-bold py-2'>Passsword</h1>
                                <input type="password" name="password" id="password" autoComplete='off' value={password} onChange={(e) => { setPassword(e.target.value) }} placeholder='**********' className='text-lg p-2 w-full border-2 rounded-lg' />
                            </div>
                        </div>
                        <div className='py-5 flex justify-center items-center'>
                            <button type="submit" className="min-w-fit bg-transparent hover:bg-[#590DE1] text-[#590DE1] font-semibold hover:text-white py-2 px-5 lg:px-10 border border-[#590DE1] hover:border-transparent rounded-lg">Log-In</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
