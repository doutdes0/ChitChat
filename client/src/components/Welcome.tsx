import { styled } from 'styled-components';
import logo from '../assets/logo-spiral.png'

type Props = {
  username: string;
};

const Welcome: React.FC<Props> = ({ username }) => {
  return <Container>
    <h2>Welcome {username}!</h2>
    <p>Pick someone to start chatting</p>
    <img src={logo} alt="logo" />
    </Container>;
};
export default Welcome;

const Container = styled.div`
  grid-column-start:4;
  grid-column-end: 5;
  grid-row-start:2;
  grid-row-end:3;
  border-radius: 20px;
  background-color: var(--white_op90);
  border: 1px solid var(--white_op90);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  box-shadow: 20px 20px 50px 10px pink inset;
  h2 {
    background-image: linear-gradient(45deg, var(--light-green), var(--light-blue));
    background-size: 100%;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  img {
    width: 6rem;
    
    }
`