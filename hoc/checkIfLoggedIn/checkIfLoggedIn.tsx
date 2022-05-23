import { NextComponentType } from 'next'
import { useRouter } from 'next/router'
import React from 'react'

const CheckIfLoggedIn = (Component:NextComponentType) => {
  return ()=>{
      const navigate=useRouter();
      if(typeof window !== 'undefined')
      {
          const token=JSON.parse(localStorage.getItem("token") ?? "{}");
          if(Object.keys(token).length !== 0 ){
            navigate.replace("/dashboard");  
          }
      }
      return (
          <Component />
      );
  }
}

export default CheckIfLoggedIn