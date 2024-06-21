import React,{useState} from "react";
import { ChatState } from "../Context/ChatProvider";
import { Container, Flex } from "@chakra-ui/react";
import Header from "../components/Miscellaneous/Header";
import SideDrawer from "../components/Miscellaneous/SideDrawer";
import MyChats from "../components/Miscellaneous/MyChats";
import Chatbox from "../components/Miscellaneous/Chatbox";
import { Box } from "@chakra-ui/react";

const Chats = () => {
    const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = ChatState();
  return (
    <>
      <Box w="100%" className="App">
        {user && <Header />}
        <Box
          display="flex"
          justifyContent="space-between"
          w="100%"
          h="91.5vh"
          p="10px"
        >
          {user && <MyChats fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
          {user && <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
        </Box>
      </Box>
    </>
  );
};

export default Chats;
