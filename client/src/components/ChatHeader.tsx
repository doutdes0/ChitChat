import { selectedChat } from '../pages/Chat';
import parse from 'html-react-parser';
import { styled } from 'styled-components';
import defIcon from '../assets/defIcon.png'; 

type Props = {
  contact: selectedChat;
};

const ChatHeader: React.FC<Props> = ({ contact }) => {
  return (
    <Container>
      {contact.avatar ? parse(contact.avatar) : <img src={defIcon} />}
      <p>{contact.username}</p>
    </Container>
  );
};
export default ChatHeader;

const Container = styled.div`
box-shadow: 0 1em 1em -1em hsla(0, 0%, 0%, 0.25);
display: flex;
align-items: center;
justify-content: flex-start;
padding: 2rem 0 2rem 1rem;
gap: 1rem;
svg, img {
      width: 2rem;
    }
`;
