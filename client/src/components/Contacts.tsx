import { useEffect } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { getAllUsers } from '../redux/thunks';
import parse from 'html-react-parser';
import defIcon from '../assets/defIcon.png';
import { selectedChat } from '../pages/Chat';

type Props = {
  id: string;
  setChat: React.Dispatch<React.SetStateAction<selectedChat | null>>;
};

const Contacts: React.FC<Props> = ({ id, setChat }) => {
  const dispatch = useAppDispatch();
  const contacts = useAppSelector((state) => state.users.list);
  useEffect(() => {
    dispatch(getAllUsers());
  }, []);
  return (
    <Container>
      <p>Contacts({contacts.length})</p>
      {contacts.map((contact) => (
        <div
          onClick={() => setChat(contact)}
          key={contact._id}
          className="contact-item"
        >
          {contact.avatar ? parse(contact.avatar) : <img src={defIcon} />}
          <p>{contact.username}</p>
        </div>
      ))}
    </Container>
  );
};
export default Contacts;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    width: 10px;
    height: 3px;
    background-color: var(--white);
    border-radius: 100px;
  }
  &::-webkit-scrollbar-track {
    background-color: var(--light-grey);
  }
  .contact-item {
    display: flex;
    align-items: center;
    justify-content: start;
    padding: 1rem 0 1rem 1rem;
    border-bottom: solid 1px var(--light-grey_op40);
    gap: 0.5rem;
    cursor: pointer;
    svg,
    img {
      width: 2rem;
    }
    &:nth-child(2) {
      border-top: solid 1px var(--light-grey_op40);
    }
  }
  & > p {
    padding-left: 1rem;
    margin-bottom: 1rem;
    font-size: 0.9rem;
  }
`;
