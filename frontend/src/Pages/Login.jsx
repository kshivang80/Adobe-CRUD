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
    useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import { useState } from 'react';
import {Redirect, useNavigate} from "react-router-dom"


export default function Login() {
    const navigator = useNavigate();
    const toast = useToast();

    const [data, setData] = useState({
        email: "",
        password: ""
    })


    const handleInput = (e) => {
        const { name, value } = e.target;
        //console.log(name, value);
        setData({ ...data, [name]: value });
    };

    const handleSubmit=(e)=>{
        e.preventDefault()

      //  setData(data)
        axios.post(`http://localhost:8080/login`, data)
        .then((res) => {
            //console.log(res.data.token)
            localStorage.setItem("token", res.token)
           // console.log(data.token)
           console.log(res.data.Error)
            console.log(res.data.token)

           if(res.data =="Wrong Credentials" || res.data.Error =="Error While Login"){
            //alert(" Login UnSuccessfull Try again")
            toast({
                title: 'Wrong Password or Wrong Email',
                description: "Password or Email not matched",
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
           //console.log("jo")
           }else{
            toast({
            title: 'Logged In',
            description: "You are successfully logged in!",
            status: 'success',
            duration: 5000,
            isClosable: true,
        });
            navigator('/')
           }
          

        })
        .catch((err) => {
            console.log(err)
        })

    }

   









    return (

        <Box>


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
                                <Stack spacing={10}>
                                    <Stack
                                        direction={{ base: 'column', sm: 'row' }}
                                        align={'start'}
                                        justify={'space-between'}>
                                        <Checkbox>Remember me</Checkbox>
                                        <Link color={'blue.400'}>Forgot password?</Link>
                                    </Stack>
                                    <Button
                                        type='submit'
                                        bg={'blue.400'}
                                        color={'white'}
                                        _hover={{
                                            bg: 'blue.500',
                                        }}>
                                        Login
                                    </Button>
                                </Stack>
                            </Stack>
                        </form>
                    </Box>
                </Stack>
            </Flex>
        </Box>
    );
}