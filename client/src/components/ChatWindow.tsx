import { selectedChat } from '../pages/Chat';
import ChatHeader from './ChatHeader';
import ChatInput from './ChatInput';
import { styled } from 'styled-components';

type Props = {
  selectedChat: selectedChat;
  id: string;
};

const ChatWindow: React.FC<Props> = ({ selectedChat, id }) => {
  return (
    <Container>
      <ChatHeader contact={selectedChat} />
      <ChatInput
        from={id}
        to={selectedChat._id}
      />
    </Container>
  );
};

export default ChatWindow;

const Container = styled.div`
  grid-column-start:4;
  grid-column-end: 5;
  grid-row-start:2;
  grid-row-end:3;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: var(--white_op90);
  border-radius: 20px;
  border: 1px solid var(--white_op90);
`;
