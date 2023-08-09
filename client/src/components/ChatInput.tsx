import { styled } from "styled-components";
import { useState, useEffect } from "react";
import { socket } from "../utils/socket";
import send_icon from "../assets/send-icon.svg";
import smiles_icon from "../assets/smiles-icon.svg";
import { useAppDispatch } from "../hooks/useRedux";
import { send_msg_io } from "../redux/reducers/messagesSlice";
import { sendMsgAPI } from "../redux/thunks";

type Props = {
  from: string;
  to: string;
};

const ChatInput: React.FC<Props> = ({ from, to }) => {
  const dispatch = useAppDispatch();
  const [msg, setMsg] = useState("");

  useEffect(() => {
    setMsg("");
  }, [to]);

  const handleSend = () => {
    setMsg("");
    socket.emit("send_msg", { from, to, msg });
    dispatch(send_msg_io({ userID: to, msg }));
    dispatch(sendMsgAPI({ from, to, msg }));
  };

  return (
    <Container>
      <img src={smiles_icon} alt="smiles" />
      <textarea
        onChange={(e) => setMsg(e.target.value)}
        value={msg}
        placeholder="Type your message here"
      />
      <img onClick={() => handleSend()} src={send_icon} alt="send message" />
    </Container>
  );
};

export default ChatInput;

const Container = styled.div`
  display: grid;
  grid-template-columns: [first] 4% [line1] 10% [line2] auto [line3] 4% [line4] 10% [last];
  box-shadow: 0 1em 1em 1em hsla(0, 0%, 0%, 0.25);
  border-radius: 0 0 20px 20px;
  img[alt*="smiles"] {
    grid-column-start: 2;
    grid-column-end: 3;
    align-self: center;
    height: 2rem;
    opacity: 0.4;
  }
  img[alt*="send message"] {
    grid-column-start: 5;
    grid-column-end: 6;
    align-self: center;
    height: 2.3rem;
    cursor: pointer;
  }
  textarea {
    grid-column-start: 3;
    grid-column-end: 4;
    align-self: center;
    border: none;
    outline: none;
    height: 70%;
    padding: 0.6rem 1rem 0;
    border-radius: 20px;
    resize: none;
    &:focus::placeholder {
      color: transparent;
    }
  }
`;
