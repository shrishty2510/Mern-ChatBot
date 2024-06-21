import React from "react";
import { Avatar, Flex, Text, Box, Badge, Tooltip } from "@chakra-ui/react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
  Button,
} from "@chakra-ui/react";
import { BellIcon } from "@chakra-ui/icons";
import SideDrawer from "./SideDrawer";
import ProfileModal from "./ProfileModal";
import { useDisclosure } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { ChatState } from "../../Context/ChatProvider";



const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const { user } = ChatState();

  const logoutHandler = () =>{
    localStorage.removeItem("userInfo");
    navigate("/");
  }

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth="2px"
      >
        <Tooltip
          hasArrow
          label="Search Users to chat"
          bg="blue.500"
          placement="bottom"
        >
          <Button onClick={onOpen}>
            <i className="fas fa-search"></i>
            <Text display={{ base: "none", md: "block" }} px="2">
              Search User
            </Text>
          </Button>
        </Tooltip>
        <Text fontSize="xl">Make a Conversation</Text>
        <div>
          <Menu>
            <MenuButton colorScheme="whitesmoke">
              <BellIcon m={"2"} p={"0.4"} fontSize={"3xl"} />
            </MenuButton>
          </Menu>
          <Menu>
            <MenuButton as={Button} colorScheme="whitesmoke">
              <Flex>
                <Avatar src={user.pic} />
                <Box m="3">
                  <Text fontWeight="bold" color={"black"}>
                    {user.name}
                  </Text>
                </Box>
              </Flex>
            </MenuButton>
            <MenuList>
              <ProfileModal user={user}>
                <MenuItem>My Profile</MenuItem>
              </ProfileModal>
              <MenuDivider />
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
        <SideDrawer isOpen={isOpen} onClose={onClose} />
      </Box>
    </>
  );
};

export default Header;
