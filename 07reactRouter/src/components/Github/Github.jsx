import React, { useEffect, useState } from 'react'
import {useLoaderData} from "react-router-dom"

function Github() {
    // const [data, setData] = useState([])

    // useEffect(() => {
    //     fetch("https://api.github.com/users/hiteshchoudhary")
    //     .then(response => response.json())
    //     .then(response_data => {
    //         console.log(response_data);
    //         setData(response_data)
    //     })
    // }, [])

    const data = useLoaderData()

  return (
    <div className='text-center m-4 bg-gray-400 text-white p-4 text-3xl'>
        Github Followers: {data.followers}
        <img src={data.avatar_url} width={300} alt="" />
    </div>
  )
}

export default Github

export const githubInfoLoader = async () => {
    const response = await fetch("https://api.github.com/users/hiteshchoudhary")
    return response.json()
}