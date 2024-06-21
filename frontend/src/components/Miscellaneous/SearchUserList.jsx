import { Avatar } from "@chakra-ui/avatar";
import { Box, Text } from "@chakra-ui/layout";


const SearchUserList = ({ user, handleFunction }) => {
  return (
    <Box
      onClick={handleFunction}
      cursor="pointer"
      bg="whitesmoke"
      _hover={{
        background: "blue.500",
        color: "white",
      }}
      w="100%"
      color="black"
      px={2}
      mb={4}
      borderRadius="lg"
    >
      <Avatar
        mr={2}
        size="sm"
        cursor="pointer"
        name={user.name}
        src={user.pic}
      />
      <Box>
        <Text>{user.name}</Text>
        <Text fontSize="xs">
          <b>Email : </b>
          {user.email}
        </Text>
      </Box>
    </Box>
  );
};

export default SearchUserList;