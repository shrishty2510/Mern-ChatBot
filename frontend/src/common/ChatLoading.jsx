import { Stack, Skeleton } from "@chakra-ui/react";

const ChatLoading = ({ length }) => {
  let i = 0;
  const skeletonArray = [];
  while (i <= length) {
    skeletonArray.push(<Skeleton key={i} height="45px" endColor="blue.200" />);
    i++;
  }
  return (
    <Stack my={10} spacing={5}>
      {skeletonArray}
    </Stack>
  );
};

export default ChatLoading;
