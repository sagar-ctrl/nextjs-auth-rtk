import React, { useEffect, useState } from 'react'
import {Flex,Grid,FormControl, VStack, FormLabel, Input, Button,Text} from "@chakra-ui/react"
import { useLoginUserMutation } from '../../services/api/auth/authApi'
import { toast } from 'react-toastify';
import { useAppDispatch } from '../../features/store/hooks';
import { setToken } from '../../services/api/auth/authSlice';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import Link from 'next/link';
import CheckIfLoggedIn from '../../hoc/checkIfLoggedIn';
const Login = () => {

  const [loginUser,{isLoading,isError,data,error,isSuccess}]=useLoginUserMutation();
  const dispatch=useAppDispatch();
  const navigate=useRouter();
  const [showLoginDetail,setLoginDetail]=useState(true);
  const formik=useFormik(
    {
      initialValues:{
        email:"",
        password:""
      },onSubmit:async({email,password})=>{
        await loginUser({email,
          password,});
      }
    }
  );

  setTimeout(()=>{
    setLoginDetail(false);
  },8000)
 useEffect(()=>{
   if(isError)
   {
     
     toast.error(error?.data?.error ?? "Something went Wrong");
   }
   if(isSuccess)
   {
     dispatch(setToken(data.token));
     toast.success("Login Success full")
     navigate.push("/dashboard");
   }
   
},[isError,data])

  return (
      <Grid h={"100vh"} w="100vw" bg="green.300" placeItems={"center"}>
        {/* login info */}
        <VStack display={showLoginDetail?"":"none"} textAlign={"start"} align="start" justify={"start"} position={"fixed"} top={12} left="20px" p={8} bg="white" rounded={"lg"}>
          <Text textAlign={"start"} >Email :  eve.holt@reqres.in</Text>
          <Text textAlign={"start"}>password :  cityslicka</Text>
          <Text>loginurl: https://reqres.in/api/login</Text>
          <Text>Throws error while password is not provided</Text>
            </VStack>
        <form onSubmit={formik.handleSubmit}>
        <VStack bg={"white"} gap="8" p={12} borderRadius={"xl"} boxShadow="2xl">
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input name="email" onChange={formik.handleChange} size="lg" variant={"outline"} w="450px" placeholder='Email Here' boxShadow={"md"} />
          </FormControl>

          <FormControl >
            <FormLabel>Password</FormLabel>
            <Input name="password" onChange={formik.handleChange}  size="lg" variant={"outline"} w="450px" placeholder='Passsword Here' boxShadow={"md"} />
          </FormControl>

          <Button  type='submit' w={"100%"} bg="green.400" color={"white"} size="lg">Submit</Button>
          <Flex>
            <Text as={Link} href="/register">dont have an account signup</Text>
          </Flex>
          </VStack>
        </form>
      </Grid>
  )
}

export default CheckIfLoggedIn(Login);