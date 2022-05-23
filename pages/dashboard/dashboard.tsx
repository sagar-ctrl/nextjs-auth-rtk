import { Box, Button, Container, Flex,Grid,HStack,Text, VStack} from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../features/store/hooks';
import WithAuth from '../../hoc';
import { useGetAllUserQuery } from '../../services/api/auth/authApi';
import { setUserList,logout } from '../../services/api/auth/authSlice';

const Dashboard = () => {
  const [pageNumber,setPage]=useState(1);
  const {isError,data,error,isSuccess}=useGetAllUserQuery(pageNumber)
  const dispatch=useAppDispatch();
  const router=useRouter()
  const authApiState=useAppSelector((state)=>state.auth);

  useEffect(()=>{
    if(isError)
    {
      toast.error("Not Listed")
    }
    if(isSuccess)
    {
      toast.success("User Listed Success Fully");
      dispatch(setUserList(data));  
    }
    
  },[isError,data])
  return (
    <Flex  w="100vw" h="100vh" bg="gray.100">
      <VStack w="100%"  align="center" >

        <HStack maxW={"7xl"} minW="xl" p={8} bg="white" boxShadow={"2xl"} rounded={"xl"} m={4}>
          <Text>{authApiState.token? authApiState.token :"Text"}</Text>
          <Button
          onClick={()=>{
            dispatch(logout(""));
            router.replace("/login");
          }}
          variant={"outline"} size="sm" rounded={"xl"} >
            Logout
          </Button>
        </HStack>
      {authApiState && authApiState.userList?.map((item)=>{
         return <VStack border="2px" borderColor="orange.200" maxW={"7xl"} minW="xl" key={item.id} p={4} bg="white" boxShadow={"2xl"} rounded={"xl"} m={4}>
           <Text>{item.first_name}</Text>
           <Text>{item.email}</Text>
        </VStack>
      })}
      {authApiState.userList && <Flex  justify={"space-between"} maxW={"7xl"}  minW="xl" p={4} bg="white" boxShadow={"2xl"} rounded={"xl"} m={4}>
      <Button color={"white"} bg="orange.300"
      onClick={()=>{
        if(pageNumber >1)
        {
          
          setPage(pageNumber-1);
        }
        
      }}
      >
        Previous
        </Button> 
        <Text>{authApiState.current} of {authApiState.total}</Text>  
        <Button color={"white"} bg="blue.500"
        onClick={()=>{
          if(authApiState.total && pageNumber < authApiState.total)
          {
            setPage(pageNumber+1);
          }   
        }}
        >
        next
        </Button>   
      </Flex>}
      </VStack>
    </Flex >
  );
}

export default WithAuth(Dashboard);