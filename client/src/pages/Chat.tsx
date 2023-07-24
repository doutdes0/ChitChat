import UserPanel from '../components/UserPanel';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import styled from 'styled-components';
import ChatWindow from '../components/ChatWindow';
import Welcome from '../components/Welcome';

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
        id={id}
        setChat={setSelectedChat}
      />
      <h2>ChitChAt</h2>
      {selectedChat ? (
        <ChatWindow
          id={id}
          selectedChat={selectedChat}
        />
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
  background-image: url('/src/assets/main-bg.svg');
  /* background by SVGBackgrounds.com */
  background-repeat: no-repeat;
  background-size: cover;
  display: grid;
  grid-template-columns: [first] 10% [line1] 25% [line2] 5% [line3] 50% [line4] 10% [last];
  grid-template-rows: [first] 10% [row1] auto [row2] 10% [last];
  & > h2 {
    font-family: var(--ms-family);
    grid-column-start:3;
    grid-column-end: 4;
    grid-row-start:2;
    grid-row-end:3;
    justify-self: center;
    align-self: center;
    writing-mode: vertical-lr;
    text-orientation: upright;
    color: var(--white);
    letter-spacing: 1.5rem;
    opacity: 0.5;
}
`;
