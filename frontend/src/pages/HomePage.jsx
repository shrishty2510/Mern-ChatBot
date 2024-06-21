import React from "react";
import { Container, Box, Text, Tabs, TabList, TabPanels, Tab, TabPanel  } from "@chakra-ui/react";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";

const HomePage = () => {
  return (
    <>
      <section className="App">
        <Container maxW="xl" centerContent>
          <Box
            p={3}
            bg="white"
            w="100%"
            m="40px 0 15px 0"
            borderRadius="lg"
            borderWidth="1px"
          >
            <Text fontSize="4xl" textAlign="center" fontFamily="Work sans">
              Make a conversation
            </Text>
          </Box>
          <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
            <Tabs isFitted variant="soft-rounded">
              <TabList m="0.5em">
                <Tab width="50%">Login</Tab>
                <Tab width="50%">Sign Up</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Login/>
                </TabPanel>
                <TabPanel>
                  <Signup/>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </Container>
      </section>
    </>
  );
};

export default HomePage;
