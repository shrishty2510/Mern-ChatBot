import React, { useState, useCallback, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  useDisclosure,
  Button,
  Input,
  Box,
} from "@chakra-ui/react";
import axios from "axios";
import { useToast } from "@chakra-ui/toast";
import { ChatState } from "../../Context/ChatProvider";
import SearchUserList from "./SearchUserList";
import UserBadgeItem from "./UserBadgeItem";

const GroupChatModal = ({ children }) => {
  const [groupChatName, setGroupChatName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

  const toast = useToast();

  useEffect(() => {
    if (!search) {
      setSearchResult([]);
    }
  }, [onOpen]);

  const handleSearchUser = useCallback(
    async (searchValue) => {
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

        const { data } = await axios.get(
          `/api/user?search=${searchValue}`,
          config
        );
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
    },
    [search]
  );

  const handleGroup = (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) {
      toast({
        title: "User already added",
        status: "warning",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    setSelectedUsers([...selectedUsers, userToAdd]);
  };
  const handleDelete = (deleteUser) => {
    const result = selectedUsers.filter((user) => user._id !== deleteUser._id);
    setSelectedUsers(result);
  };

  const handleSubmit = async () => {
    if (!groupChatName || !selectedUsers) {
      toast({
        title: "Please fill all the feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post("/api/chats/creategroup",
      {
        name: groupChatName,
        users: JSON.stringify(selectedUsers.map((u) => u._id)),
      },config)
      setChats([data, ...chats]);
      setSearch("");
      setSelectedUsers([]);
      setGroupChatName("");
      setSearchResult([]);
      onClose();
      toast({
        title: "New Group Chat Created!",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "bottom",
      });
    } catch (error) {
      toast({
        title: "Failed to Create the Chat!",
        description: error.response.data,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
    }
  };
  return (
    <>
      <span onClick={onOpen}>{children}</span>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your Group Chat</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Chat Name:</FormLabel>
              <Input
                value={groupChatName}
                onChange={(e) => setGroupChatName(e.target.value)}
                placeholder="chat name"
              />
            </FormControl>

            <FormControl mt={4} mb={2}>
              <FormLabel>Add Users:</FormLabel>
              <Input
                onChange={(e) => {
                  handleSearchUser(e.target.value);
                  setSearch(e.target.value);
                }}
                value={search}
                placeholder="search user to add"
              />
              <FormHelperText>add minimum two users</FormHelperText>
            </FormControl>
            <Box w="100%" d="flex" flexWrap="wrap">
              {selectedUsers.map((u) => (
                <UserBadgeItem
                  key={u._id}
                  user={u}
                  handleFunction={() => handleDelete(u)}
                />
              ))}
            </Box>

            {loading ? (
              <div>Loading...</div>
            ) : (
              searchResult
                ?.slice(0, 4)
                .map((user) => (
                  <SearchUserList
                    key={user._id}
                    user={user}
                    handleFunction={() => handleGroup(user)}
                  />
                ))
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              Create
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GroupChatModal;
