import React, { useEffect, useState } from 'react'
import checkAuth from '../utils/checkAuth'
import { useRouter } from 'next/router'
import ListVillage from '../components/ListVillage'

const Village = () => {
    const router = useRouter()
    const [villageData, setVillageData] = useState([])
    const fetchData = async () => {
        try {
            const url = `${process.env.NEXT_PUBLIC_URL}/api/villages`
            const token = localStorage.getItem("UserToken")
            const requestOptions = {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${token}` }
            }

            const res = await fetch(url, requestOptions);
            const data = await res.json();
            setVillageData(data.data);
        } catch (error) {
            console.log("Fetch Data Error : ", error)
        }
    }

    useEffect(() => {
        if (checkAuth()) {
            fetchData()
        }
        else {
            router.push("/auth/login")
        }
    }, [])


    return (
        <div className="min-h-[70vh] p-2 flex justify-center items-start">
            <div className="h-fit relative overflow-x-auto shadow-md sm:rounded-lg w-3/4">
                <table className="w-full text-sm ">
                    <thead className="text-xs text-black uppercase bg-gray-300">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3 text-right">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            villageData.map((element) => {
                                return <ListVillage key={element.id}{...element} />
                            })
                        }                    
                    </tbody>
                </table>
            </div>

        </div>
    )
}



export default Village