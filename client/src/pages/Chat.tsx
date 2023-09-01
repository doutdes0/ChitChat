import UserPanel from "../components/UserPanel";
import { useState } from "react";
import { useAppSelector } from "../hooks/useRedux";

import styled from "styled-components";
import ChatWindow from "../components/ChatWindow";
import Welcome from "../components/Welcome";

export interface selectedChat {
  _id: string;
  avatar: string;
  username: string;
}

const Chat: React.FC = () => {
  const avatar = useAppSelector((state) => state.auth.avatar);
  const username = useAppSelector((state) => state.auth.username);
  const id = useAppSelector((state) => state.auth.id);

  const [selectedChat, setSelectedChat] = useState<selectedChat | null>(null);

  return (
    <Container>
      <UserPanel
        username={username}
        avatar={avatar}
        setChat={setSelectedChat}
        selectedChatID={selectedChat?._id}
      />
      <h2>ChitChAt</h2>
      {selectedChat ? (
        <ChatWindow id={id} selectedChat={selectedChat} />
      ) : (
        <Welcome username={username} />
      )}
    </Container>
  );
};
export default Chat;

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background-image: url("/src/assets/main-bg.svg");
  /* background by SVGBackgrounds.com */
  background-repeat: no-repeat;
  background-size: cover;
  display: grid;
  grid-template-columns: [first] 10% [line1] 25% [line2] 5% [line3] 50% [line4] 10% [last];
  grid-template-rows: [first] 10% [row1] 80% [row2] 10% [last];
  & > h2 {
    font-family: var(--ms-family);
    grid-column-start: 3;
    grid-column-end: 4;
    grid-row-start: 2;
    grid-row-end: 3;
    justify-self: center;
    align-self: center;
    writing-mode: vertical-lr;
    text-orientation: upright;
    color: var(--white);
    letter-spacing: 1.5rem;
    opacity: 0.5;
  }
  @media only screen and (max-width: 768px) {
    width: 100%;
    overflow-y: auto;
    grid-template-columns: [first] 5% [line2] 90% [line3] 5% [last];
    grid-template-rows: [first] 10% [row2] 70% [row3] 10% [row4] 70% [row5] 10% [last];
    & > h2 {
      grid-column-start: 2;
      grid-column-end: 3;
      grid-row-start: 3;
      grid-row-end: 4;
      writing-mode: initial;
      text-orientation: initial;
    }
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
  }
`;
