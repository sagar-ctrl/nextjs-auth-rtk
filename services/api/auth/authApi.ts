import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface LoginPropsType{
    email:string,
    password:string
}
export interface RegisterPropsType{
    email:string,
    password:string,
    name:string
}

const authApi=createApi({
    reducerPath:"authApi",
    baseQuery:fetchBaseQuery({
        baseUrl:"https://reqres.in",
        prepareHeaders: (headers, { getState }) => {
            headers.set('Access-Control-Allow-Origin', '*')
            headers.set('Access-Control-Allow-Credentials', 'true');
            return headers
        }
    }),
    endpoints:(builder)=>({
        loginUser:builder.mutation({
            query:(body:LoginPropsType)=>({
                url:"/api/login",
                method:"post",
                body,
            })
        }),
        registerUser:builder.mutation({
            query:(body:RegisterPropsType)=>({
                url:"/api/register",
                method:"post",
                body,
            })
        }),
        getAllUser:builder.query({
            query:(id=1)=>({
                url:`/api/users?page=${id}`,
                method:"get"
            })
        })
    })
});

export const {useLoginUserMutation,useRegisterUserMutation,useGetAllUserQuery}=authApi
export default authApi