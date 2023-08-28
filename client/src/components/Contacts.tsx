import { useEffect } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import { getAllUsers } from "../redux/thunks";
import parse from "html-react-parser";
import defIcon from "../assets/defIcon.png";
import { selectedChat } from "../pages/Chat";

type Props = {
  setChat: React.Dispatch<React.SetStateAction<selectedChat | null>>;
  selectedChatID: string | undefined;
};

const Contacts: React.FC<Props> = ({ setChat, selectedChatID }) => {
  const dispatch = useAppDispatch();
  const contacts = useAppSelector((state) => state.users.list);
  useEffect(() => {
    dispatch(getAllUsers());
  }, []);
  return (
    <Container>
      <p>All users ({contacts.length})</p>
      {contacts.map((contact) => (
        <div
          onClick={() => setChat(contact)}
          key={contact._id}
          className={
            selectedChatID === contact._id
              ? "contact-item contact-item__selected"
              : "contact-item"
          }
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
  height: 100%;
  width: 100%;
  overflow-y: auto;
  padding-top: 1rem;

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
  .contact-item__selected {
    background-color: var(--white_op90);
    transition: 0.5s;
  }
  & > p {
    padding-left: 1rem;
    margin-bottom: 1rem;
    font-size: 0.9rem;
  }
`;
