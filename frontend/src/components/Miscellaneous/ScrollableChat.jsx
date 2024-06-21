import React, { useEffect, useRef } from "react";
import { Avatar } from "@chakra-ui/avatar";
import { Tooltip } from "@chakra-ui/tooltip";
import ScrollableFeed from "react-scrollable-feed";
import { ChatState } from "../../Context/ChatProvider";
import {
  isSameSender,
  isLastMessage,
  isSameSenderMargin,
  isSameUser,
} from "../../config/chatsLogics";

const ScrollableChat = (chat) => {
  const { selectedChat, setSelectedChat, user } = ChatState();
  return (
    <div>
       {
        chat?.chat?.map((m, i) => (
            <div style={{ display: "flex" }} key={m._id}>
            {(isSameSender(chat.chat, m, i, user._id) ||
                isLastMessage(chat.chat, i, user._id)) && (
                <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
                <Avatar
                    mt="7px"
                    mr={1}
                    size="sm"
                    cursor="pointer"
                    name={m.sender.name}
                    src={m.sender.pic}
                />
                </Tooltip>
            )}
            <span
                style={{
                backgroundColor: `${
                    m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"
                }`,
                marginLeft: isSameSenderMargin(chat.chat, m, i, user._id),
                marginTop: isSameUser(chat.chat, m, i, user._id) ? 3 : 10,
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "75%",
                }}
            >
                {m.content}
            </span>
            </div>
        ))
}

    </div>
  );
};

export default ScrollableChat;
