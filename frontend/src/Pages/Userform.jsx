import React, { useEffect, useState } from 'react'
import axios from "axios"

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Alert,
  AlertIcon,
 
  useToast,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import {getUsers, postUsers} from "../Redux/User/action"



const Userform = () => {
  const toast = useToast()
  const dispatch=useDispatch()
  const {users}=useSelector((store)=>store.users)
 

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    bio: "",
  })


  const [store, setStore] = useState([]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    //console.log(name, value);
    setData({ ...data, [name]: value });
  };

  const signup_Success =  ()=>{
    toast({
        title: 'Account Created',
        description: "You Have Successfully Created Account and Logged in!",
        status: 'success',
        duration: 5000,
        isClosable: true,
    });

}
const email_used =  ()=>{
    toast({
        title: 'Email Invalid',
        description: "Email is invalid or bind to another account, try different email.",
        status: 'error',
        duration: 5000,
        isClosable: true,
    })
}

const other =  (str)=>{
    toast({
        title: 'Error',
        description: `${str}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
    })
}
const toaster = {
    signup_Success,
    email_used,
    other,
}


 

  const handleSubmit = (e) => {
   
    e.preventDefault()
    const newData = {
      ...data
    }
    setStore([...store, newData])

    // axios.post(`http://localhost:8080/users`, data)
    //   .then((res) => {
    //     console.log(res.data)
    //   })
    //   .catch((err) => {
    //     console.log(err)
    //     alert("Email is already Exist")
    //   })

    //users.length 
   
   

     console.log(data.email)
    dispatch(postUsers(data))
    
}


  



  return (
    <div>
      <Text fontSize="4xl" as="b"> User Register Form</Text>
      <Box mt="50px">
        <Flex
          minH={'100vh'}
          align={'center'}
          justify={'center'}
          bg={useColorModeValue('gray.50', 'gray.800')}>
          <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
            <Stack align={'center'}>
              <Heading fontSize={'4xl'}>Sign in to your account</Heading>
              <Text fontSize={'lg'} color={'gray.600'}>
                to enjoy all of our cool <Link color={'blue.400'}>features</Link> ✌️
              </Text>
            </Stack>

            <Box
              rounded={'lg'}
              bg={useColorModeValue('white', 'gray.700')}
              boxShadow={'lg'}
              p={8}>
              <form action="" onSubmit={handleSubmit}>
                <Stack spacing={4}>
                  <FormControl id="name">
                    <FormLabel>Name</FormLabel>
                    <Input
                      type="text"
                      value={data.name}
                      name="name"
                      onChange={handleInput}
                      placeholder='Enter name'
                      required
                    />
                  </FormControl>
                  <FormControl id="email">
                    <FormLabel>Email address</FormLabel>
                    <Input
                      type="email"
                      value={data.email}
                      name="email"
                      onChange={handleInput}
                      placeholder='Enter Email'
                      required

                    />
                  </FormControl>
                  <FormControl id="password">
                    <FormLabel>Password</FormLabel>
                    <Input
                      type="password"
                      value={data.password}
                      name="password"
                      onChange={handleInput}
                      placeholder='Enter Password'
                      required
                    />
                  </FormControl>
                  <FormControl id="bio">
                    <FormLabel>Bio</FormLabel>
                    <Input
                      type="text"
                      value={data.bio}
                      name="bio"
                      onChange={handleInput}
                      placeholder='Enter Bio'
                      required
                    />
                  </FormControl>
                  <Stack spacing={10}>
                    <Stack
                      direction={{ base: 'column', sm: 'row' }}
                      align={'start'}
                      justify={'space-between'}>
                      <Checkbox>Remember me</Checkbox>
                      <Link color={'blue.400'}>Forgot password?</Link>
                    </Stack>
                    <Button
                      type="submit"
                      bg={'blue.400'}
                      color={'white'}
                      _hover={{
                        bg: 'blue.500',
                      }}>
                      Register
                    </Button>
                  </Stack>
                </Stack>
              </form>
            </Box>
          </Stack>
        </Flex>



      </Box>
    </div>
  )
}

export default Userform