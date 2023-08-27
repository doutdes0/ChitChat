import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import { receive_msg } from "../redux/reducers/messagesSlice";
import { Payload_Msg } from "../redux/reducers/messagesSlice";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import { styled } from "styled-components";
import { socket } from "../utils/socket";
import { useEffect, Fragment } from "react";
import { getAllMsgs } from "../redux/thunks";
import { selectedChat } from "../pages/Chat";
import { v4 as uuidv4 } from "uuid";

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
      socket.emit("connected", { userID: id });
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
  }, [msgs, dispatch]);

  return (
    <Container>
      <ChatHeader contact={selectedChat} />
      <div className="chat-window">
        {msgs ? (
          msgs.map((msg) =>
            msg.isFromSelf ? (
              <div
                key={uuidv4()}
                className="chat-window__msg chat-window__msg-self"
              >
                {msg.msg.split("\n").map((line, i) => (
                  <Fragment key={i}>
                    {line}
                    <br />
                  </Fragment>
                ))}
              </div>
            ) : (
              <div
                key={uuidv4()}
                className="chat-window__msg chat-window__msg-alien"
              >
                {msg.msg.split("\n").map((line, i) => (
                  <Fragment key={i}>
                    {line}
                    <br />
                  </Fragment>
                ))}
              </div>
            )
          )
        ) : (
          <></>
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
  height: 100%;
  grid-template-rows: [first] 17% [row1] auto [row2] 10% [last];
  background-color: var(--white_op90);
  border-radius: 20px;
  border: 1px solid var(--white_op90);
  .chat-window {
    display: flex;
    flex-direction: column-reverse;
    gap: 1rem;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 0.5rem 1rem;
    &::-webkit-scrollbar {
      width: 5px;
    }
    &::-webkit-scrollbar-thumb {
      width: 10px;
      background: linear-gradient(
        hsl(164, 60%, 29%, 0.6),
        hsl(164, 58%, 49%, 0.6)
      );
      opacity: 0.1;
      border-radius: 100px;
    }
    &::-webkit-scrollbar-track {
      background-color: transparent;
    }
    .chat-window__msg {
      padding: 0.5rem 1rem;

      color: var(--white);
      border-radius: 15px;
      max-width: 50%;
      font-size: 0.9rem;
      text-align: left;
      word-break: break-word;
      min-width: 10%;
    }
    .chat-window__msg-self {
      align-self: flex-end;
      background-color: #28a299;
    }
    .chat-window__msg-alien {
      align-self: flex-start;
      background-color: #1c7a93;
    }
  }
  @media only screen and (max-width: 768px) {
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 4;
    grid-row-end: 5;
  }
`;
