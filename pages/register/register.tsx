import React, { useEffect } from 'react'
import {Flex,Grid,FormControl, VStack, FormLabel, Input, Button, Text} from "@chakra-ui/react"
import { useRegisterUserMutation } from '../../services/api/auth/authApi'
import { toast } from 'react-toastify'
import Link from 'next/link'
import CheckIfLoggedIn from '../../hoc/checkIfLoggedIn'
const Register = () => {
    const [registerUser,{isError,isLoading,data,error,isSuccess}]=useRegisterUserMutation()

    useEffect(()=>{
        if(isError)
        {
            toast.error("some thing went wrong")
        }

        if(isSuccess)
        {
            toast.success("register success");
        }
       
    },[isError,data,isSuccess])

  return (
    <Grid h={"100vh"} w="100vw" bg="green.300" placeItems={"center"}>
        <form onSubmit={async(e)=>{
          e.preventDefault()
          await registerUser({email:"eve.holt@reqres.in",password:"pistols",name:"sagar dev"});
        }}>
            
        <VStack bg={"white"} gap="8" p={12} borderRadius={"xl"} boxShadow="2xl">
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input size="lg" variant={"outline"} w="450px" placeholder='Email Here' boxShadow={"md"} />
          </FormControl>

          <FormControl >
            <FormLabel>name</FormLabel>
            <Input size="lg" variant={"outline"} w="450px" placeholder='Name Here' boxShadow={"md"} />
          </FormControl>

          <FormControl >
            <FormLabel>Password</FormLabel>
            <Input size="lg" type={"password"} variant={"outline"} w="450px" placeholder='Passsword Here' boxShadow={"md"} />
          </FormControl>

          <Button  type='submit' w={"100%"} bg="green.400" color={"white"} size="lg">Submit</Button>
          <Flex>
            <Link color='blue' href="/login"><a>
            Already  have an account sign in
                </a></Link>
          </Flex>
          </VStack>
        </form>
      </Grid>
  )
}

export default CheckIfLoggedIn(Register);