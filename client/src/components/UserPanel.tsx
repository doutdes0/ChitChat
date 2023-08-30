import { styled } from "styled-components";
import parse from "html-react-parser";
import Contacts from "./Contacts";
import { selectedChat } from "../pages/Chat";
import lgicon from "../assets/logout-icon.svg";
import avaticon from "../assets/changeAvatar-icon.svg";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/useRedux";
import { logOut } from "../redux/reducers/authSlice";

type Props = {
  username: string;
  avatar: string;
  setChat: React.Dispatch<React.SetStateAction<selectedChat | null>>;
  selectedChatID: string | undefined;
};

const UserPanel: React.FC<Props> = ({
  username,
  avatar,
  setChat,
  selectedChatID,
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    sessionStorage.removeItem("user");
    dispatch(logOut());
  };
  return (
    <Container>
      <div className="user-wrapper">
        {parse(avatar)}
        <p>{username}</p>
      </div>
      <Contacts setChat={setChat} selectedChatID={selectedChatID} />
      <div className="button-panel">
        <img
          onClick={() => navigate("setAvatar", { state: true })}
          title="Change avatar"
          src={avaticon}
          alt="change_avatar-icon"
        />
        <img
          onClick={() => handleLogout()}
          title="Logout"
          src={lgicon}
          alt="logout-icon"
        />
      </div>
    </Container>
  );
};

export default UserPanel;

const Container = styled.div`
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: 2;
  grid-row-end: 3;
  display: grid;
  grid-template-rows: [first] 17% [row1] auto [row2] 10% [last];
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
    box-shadow: 0 1em 3em -2em hsla(0, 0%, 0%, 0.25);
    svg {
      width: 4rem;
    }
  }
  .button-panel {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    background-color: transparent;
    border-radius: 0 0 20px 20px;
    box-shadow: 0 -1em 5em -1em hsla(0, 0%, 0%, 0.25);
    img {
      height: 1.5rem;
      opacity: 0.8;
      cursor: pointer;
      &:hover {
        transform: scale(1.2);
        transition: 0.3s;
      }
    }
  }
  @media only screen and (max-width: 768px) {
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 2;
    grid-row-end: 3;
  }
`;
