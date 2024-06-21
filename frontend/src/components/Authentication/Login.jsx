import React, { useState, useEffect } from "react";
import {
  Container,
  Stack,
  Box,
  Text,
  Input,
  InputGroup,
  InputRightElement,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Button,
} from "@chakra-ui/react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import ShowHide from "../../common/ShowHide";

const Login = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const { email, password } = formData;
  const toast = useToast();
  const navigate = useNavigate();
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    if (!email || !password) {
      toast({
        title: "Please Fill all the Fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: { "Content-type": "application/json" },
      };

      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        config
      );
      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      console.log(data,'pppppppp')
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate("/chats")
    } catch (error) {
      toast({
        title: "Error Occured",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  return (
    <Container>
      <Box my={3}>
        <FormControl id="email" isRequired>
          <FormLabel>Email address:</FormLabel>
          <InputGroup size="md">
            <Input
              p="1rem"
              value={email}
              type="email"
              name="email"
              placeholder="Enter Your Email Address"
              onChange={handleChange}
              borderRadius={8}
            />
          </InputGroup>
          <FormHelperText>We'll never share your email.</FormHelperText>
        </FormControl>
      </Box>
      <Box my={3}>
        <FormControl id="password" isRequired>
          <FormLabel>Password:</FormLabel>

          <InputGroup size="md">
            <Input
              p="1rem"
              value={password}
              onChange={handleChange}
              name="password"
              type={show ? "text" : "password"}
              placeholder="Enter password"
              borderRadius={8}
            />
            <InputRightElement width="4.5rem" p="0.5rem">
               <ShowHide handleClick={handleClick} show={show}/>
            </InputRightElement>
          </InputGroup>
        </FormControl>
      </Box>
      <Stack direction="column" spacing={4} py={4}>
        <Button
          colorScheme="blue"
          variant="solid"
          onClick={handleSubmit}
          isLoading={loading}
        >
          Login
        </Button>
        <Button
          colorScheme="red"
          variant="outline"
          onClick={() => {
            setFormData((prevData) => ({
              ...prevData,
              email: "guest@example.com",
              password: "123456",
            }));
          }}
        >
          Get Guest User Credentials
        </Button>
      </Stack>
    </Container>
  );
};

export default Login;
