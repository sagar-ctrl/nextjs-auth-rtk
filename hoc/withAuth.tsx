import { NextComponentType } from "next"
import { useRouter } from "next/router"
import React from "react"

export const WithAuth=(Component:NextComponentType)=>{

   
    return ()=>{
        const navigate=useRouter();
        if (typeof window !== 'undefined') {
            const token=JSON.parse(localStorage.getItem("token") ?? "{}");
            if(!token || Object.keys(token).length ===0)
            {
                navigate.push("/login");  
            }
            // 👉️ can use localStorage here
          } else {
            console.log('You are on the server')
            // 👉️ can't use localStorage
          }
        
        return (<Component />)
    }
}