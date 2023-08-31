import { styled } from "styled-components";
import logo from "../assets/logo-spiral.png";

type Props = {
  username: string;
};

const Welcome: React.FC<Props> = ({ username }) => {
  return (
    <Container>
      <div className="wrapper">
        <div className="bubble bubble__left">
          <h2>Welcome {username}!</h2>
        </div>
        <div className="bubble bubble__right">
          <p>Pick someone to start chatting</p>
        </div>
        <div className="bubble bubble__left">
          <img src={logo} alt="logo" />
        </div>
      </div>
    </Container>
  );
};
export default Welcome;

const Container = styled.div`
  grid-column-start: 4;
  grid-column-end: 5;
  grid-row-start: 2;
  grid-row-end: 3;
  border-radius: 20px;
  border: 1px solid var(--white_op90);
  background-color: var(--white_op90);
  display: grid;
  box-shadow: inset 0 0 7em 1em hsl(207, 97%, 40%, 0.2);
  .wrapper {
    place-self: center;
    height: 80%;
    width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 3rem;
    box-shadow: 0 0 4em 3em hsla(163, 58%, 48%, 0.2);
    background-color: hsla(163, 58%, 48%, 0.2);
    border-radius: 20px;
    .bubble {
      background-color: var(--white_op90);
      padding: 0.5rem 1rem;
      position: relative;
      h2 {
        background-image: linear-gradient(
          45deg,
          var(--light-green),
          var(--light-blue)
        );
        background-size: 100%;
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      img {
        width: 6rem;
        @keyframes rotate {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        animation: rotate linear infinite 2s;
      }
    }
    .bubble__left {
      border-radius: 0 20px 20px 20px;
      align-self: flex-start;
      &::before {
        content: "";
        width: 0px;
        height: 0px;
        position: absolute;
        border-left: 10px solid transparent;
        border-right: 10px solid var(--white_op90);
        border-top: 10px solid var(--white_op90);
        border-bottom: 10px solid transparent;
        top: 0;
        left: -18px;
      }
    }
    .bubble__right {
      align-self: flex-end;
      border-radius: 20px 0 20px 20px;
      &::before {
        content: "";
        width: 0px;
        height: 0px;
        position: absolute;
        border-right: 10px solid transparent;
        border-left: 10px solid var(--white_op90);
        border-top: 10px solid var(--white_op90);
        border-bottom: 10px solid transparent;
        top: 0;
        right: -18px;
      }
    }
  }
  @media only screen and (max-width: 768px) {
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 4;
    grid-row-end: 5;
  }
`;
