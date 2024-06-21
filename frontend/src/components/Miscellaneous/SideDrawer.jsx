import React, { useState, useRef, useCallback } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Flex,
  Input,
  Text
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/toast";
import ChatLoading from "../../common/ChatLoading";
import { Spinner } from "@chakra-ui/spinner";
import axios from "axios";
import { Search2Icon } from "@chakra-ui/icons";
import SearchUserList from "./SearchUserList"
import { ChatState } from "../../Context/ChatProvider";

const SideDrawer = ({ isOpen, onClose  }) => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  const toast = useToast();
  const btnRef = useRef();

  const {
    setSelectedChat,
    user,
    notification,
    setNotification,
    chats,
    setChats,
  } = ChatState();


  const handleSearch = useCallback(async (searchValue) => {
    if (!searchValue) {
      setSearchResult([]);
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`/api/user?search=${searchValue}`, config);
      setSearchResult(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  }, [search]);

  const accessChat = useCallback(async (userId) => {
    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(`/api/chats`, { userId }, config);
      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  },[]);
  return (
    <Drawer
      isOpen={isOpen}
      placement="left"
      onClose={onClose}
      finalFocusRef={btnRef}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton mt={1} />
        <DrawerBody 
        >
          <Flex>
            <Input
              mb={8}
              placeholder="Search by name or email"
              width={250}
              value={search}
              onChange={(e)=>{setSearch(e.target.value)
                handleSearch(e.target.value)
              }
              }
            />
            {/* <Search2Icon
              mt={3}
              ml={2}
              color={"gray"}
              // onClick={handleSearch}
            /> */}
          </Flex>

          {loading ? (
            <ChatLoading  length={searchResult.length}/>
          ) : (
            searchResult.length > 0? searchResult?.map((user) => (
              <SearchUserList
                key={user._id}
                user={user}
                handleFunction={() => accessChat(user._id)}
              />
            )): null
          )}
          {loadingChat && <Spinner ml="auto" d="flex" />}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default SideDrawer;
