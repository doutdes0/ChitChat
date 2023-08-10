import { selectedChat } from "../pages/Chat";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import { receive_msg } from "../redux/reducers/messagesSlice";
import { Payload_Msg } from "../redux/reducers/messagesSlice";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import { styled } from "styled-components";
import { socket } from "../utils/socket";
import { useEffect } from "react";
import { getAllMsgs } from "../redux/thunks";
type Props = {
  selectedChat: selectedChat;
  id: string;
};

const ChatWindow: React.FC<Props> = ({ selectedChat, id }) => {
  const msgs = useAppSelector((state) => state.messages[selectedChat._id]);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (id) {
      const handleReceiveMsg = (data: Payload_Msg) => {
        console.log("handleRecMSG:data: ", data);
        dispatch(receive_msg(data));
      };
      socket.emit("connect", { userID: id });
      socket.on("receive_msg", handleReceiveMsg);
      return () => {
        socket.off("receive_msg", handleReceiveMsg);
      };
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (!msgs) {
      dispatch(getAllMsgs({ from: id, to: selectedChat._id }));
    }
  }, [msgs]);

  return (
    <Container>
      <ChatHeader contact={selectedChat} />
      <div className="chat-window">
        {msgs.map((msg) =>
          msg.isFromSelf ? (
            <div className="chat-window__msg chat-window__msg-self">
              {msg.msg}
            </div>
          ) : (
            <div className="chat-window__msg chat-window__msg-alien">
              {msg.msg}
            </div>
          )
        )}
      </div>
      <ChatInput from={id} to={selectedChat._id} />
    </Container>
  );
};

export default ChatWindow;

const Container = styled.div`
  grid-column-start: 4;
  grid-column-end: 5;
  grid-row-start: 2;
  grid-row-end: 3;
  display: grid;
  grid-template-rows: [first] 17% [row1] auto [row2] 10% [last];
  background-color: var(--white_op90);
  border-radius: 20px;
  border: 1px solid var(--white_op90);
  .chat-window {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow-y: scroll;
    position: relative;
    .chat-window__msg {
      display: inline-block;
      min-height: 1rem;
      max-width: 80%;
      min-width: 2rem;
      background-color: var(--light-blue);
      color: white;
      border-radius: 20px;
    }
    .chat-window__msg-self {
      justify-content: end;
    }
    .chat-window__msg-alien {
      justify-content: start;
    }
  }
`;
