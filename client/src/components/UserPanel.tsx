import { styled } from 'styled-components';
import { useAppSelector, useAppDispatch } from '../hooks/useRedux';
import parse from 'html-react-parser';
import Contacts from './Contacts';
import { selectedChat } from '../pages/Chat';

type Props = {
  username: string;
  avatar: string;
  id: string;
  setChat: React.Dispatch<React.SetStateAction<selectedChat | null>>;
};

const UserPanel: React.FC<Props> = ({ username, avatar, id, setChat }) => {
  return (
    <Container>
      <div className="user-wrapper">
        {parse(avatar)}
        <p>{username}</p>
      </div>
      <Contacts
        id={id}
        setChat={setChat}
      />
    </Container>
  );
};

export default UserPanel;

const Container = styled.div`
  grid-column-start:2;
  grid-column-end: 3;
  grid-row-start:2;
  grid-row-end:3;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  border-radius: 20px;
  background-color: var(--white_op90);
  border: 1px solid var(--white_op90);
  .user-wrapper {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: start;
    padding: 1rem 0 1rem 1rem;
    gap: 1rem;
    box-shadow: 0 1em 1em -1em hsla(0, 0%, 0%, 0.25);
    svg {
      width: 4rem;
    }
  }
`;
