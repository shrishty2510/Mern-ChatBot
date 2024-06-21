import {
  Container,
  Stack,
  Box,
  Text,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  VStack,
} from "@chakra-ui/react";
import React, {useState} from "react";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ShowHide from "../../common/ShowHide";

const Signup = () => {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({ name:"", email: "", password: "", confirmPassword:"", pic:""});
  const [picLoading, setPicLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();


  const { name, email, password, confirmPassword, pic } = formData;
  const handleClick = () => {
    console.log(show.show,'ss')
    setShow(!show);
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    if(name !== 'pic'){
          setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const setpicImage = (pics) =>{
    setPicLoading(true);
    if(pic === undefined){
        toast({
            title: "Please Select an Image!",
            status: "warning",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
          return;
    }
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
        const data = new FormData();
        data.append('file',pics);
        data.append('upload_preset','file-upload');
        data.append('cloud_name','diokdtg2i');

        fetch("https://api.cloudinary.com/v1_1/diokdtg2i/image/upload",{
            method:'post',
            body:data
        }).then((res)=>res.json())
        .then((data)=>{
            const result = data.url.toString()
            setFormData(prevData => ({
                ...prevData,
                pic: result
            }));
            setPicLoading(false);
        })
        .catch((err)=>{
            console.log(Error,err);
            setPicLoading(false);
        })

    }else {
        toast({
          title: "Please Select an Image!",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        setPicLoading(false);
        return;
      }
  }

  const handleSubmit = async (event) => {
    setPicLoading(true);
    event.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
        toast({
          title: "Please Fill all the Feilds",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        return;
      }
      if (password !== confirmPassword) {
        toast({
          title: "Passwords Do Not Match",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        return;
      }

      try{
        const config = {
            Headers:{
                "Content-type":"application/son"
            }
        }
        const { data } = await axios.post("/api/user",formData,config);
        toast({
          title: "Registration Successful",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        localStorage.setItem("userInfo", JSON.stringify(data));
        setPicLoading(false);
        navigate("/chats");
      }catch (error) {
        toast({
          title: "Error Occured!",
          description: error.response.data.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        setPicLoading(false);
      }
  };
  console.log(formData,'kkl')
  return (
    <Container>
      <VStack spacing={3}>
        <FormControl id="name" isRequired>
          <FormLabel>Name:</FormLabel>

          <InputGroup size="md">
            <Input
              name="name"
              value={name}
              p="1rem"
              type="text"
              placeholder="Enter your name"
              onChange={handleChange}
              borderRadius={8}
            />
          </InputGroup>
        </FormControl>

        <FormControl id="user-email" isRequired>
          <FormLabel>Email Address:</FormLabel>

          <InputGroup size="md">
            <Input
              p="1rem"
              name="email"
              value={email}
              onChange={handleChange}
              type="email"
              placeholder="Enter your email"
              borderRadius={8}
            />
          </InputGroup>
        </FormControl>
        <FormControl id="user-password" isRequired>
          <FormLabel>Password:</FormLabel>

          <InputGroup size="md">
            <Input
              p="1rem"
              name="password"
              value={password}
              onChange={handleChange}
              type={show ? "text" : "password"}
              placeholder="Enter your password"
              borderRadius={8}
            />
            <InputRightElement width="4.5rem" p="0.5rem">
               <ShowHide key="password" handleClick={handleClick} show={show}/>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <FormControl id="confirm_password" isRequired>
          <FormLabel>Confirm Password:</FormLabel>

          <InputGroup size="md">
            <Input
              p="1rem"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleChange}
              type={show ? "text" : "password"}
              placeholder="Confirm password"
              borderRadius={8}
            />
            <InputRightElement width="4.5rem" p="0.5rem">
              <ShowHide key="confirm_password" handleClick={handleClick} show={show}/>
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <FormControl id="pic">
        <FormLabel>Upload your Picture</FormLabel>
        <InputGroup size="md">
        <Input
          type="file"
          pt="1rem" pb="2rem"
          accept="image/*"
          name="pic"
          borderRadius={8}
          onChange={(e) => setpicImage(e.target.files[0])}
        />

        </InputGroup>
      </FormControl>
      </VStack>
      <Stack my={5}>
        <Button colorScheme="blue" variant="solid" onClick={handleSubmit} isLoading={picLoading}>
          Signup
        </Button>
      </Stack>
    </Container>
  );
};

export default Signup;
