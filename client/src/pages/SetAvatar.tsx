import axios from "axios";
import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../hooks/useRedux";
import { useNavigate, useLocation } from "react-router-dom";
import { setAvatar } from "../redux/thunks";
import { styled } from "styled-components";
import { ToastContainer, ToastOptions, toast } from "react-toastify";
import { AuthState } from "../redux/reducers/authSlice";
import "react-toastify/ReactToastify.css";
import parse from "html-react-parser";
import loader from "../assets/loader.svg";

const SetAvatar: React.FC = () => {
  const [avatars, setAvatars] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setselectedAvatar] = useState<number | null>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const id = useAppSelector((state) => state.auth.id);
  const avatar = useAppSelector((state) => state.auth.avatar);
  const source = axios.CancelToken.source();
  const getAvatars = async () => {
    setIsLoading(true);
    const data: string[] = [];
    for (let i = 0; i < 4; i++) {
      const rando = Math.floor(Math.random() * 10000);
      try {
        const res = await axios.get(`https://api.multiavatar.com/${rando}`, {
          headers: { "Content-Type": "text/html" },
          cancelToken: source.token,
        });
        data.push(res.data);
      } catch (e) {
        console.log(e);
      }
    }
    if (data.length < 4) {
      toast.error("Too many requests, please wait a minute😟", toastOptions);
    }
    setAvatars(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (avatar && !location.state) navigate("/");
    getAvatars();
    return () => {
      source.cancel("GetAvatars request cancelled");
    };
  }, []);

  const handleClickAvatar = (i: number) => {
    if (selectedAvatar === i) {
      setselectedAvatar(null);
    } else {
      setselectedAvatar(i);
    }
  };

  const handleSelectAvatar = () => {
    if (selectedAvatar !== null) {
      dispatch(setAvatar({ userID: id, avatar: avatars[selectedAvatar] }))
        .unwrap()
        .then((avatar) => {
          if (sessionStorage.getItem("user")) {
            const user: AuthState = JSON.parse(
              sessionStorage.getItem("user") as string
            );
            user.avatar = avatar;
            sessionStorage.setItem("user", JSON.stringify(user));
          }
          toast.success("Success!🎉 Taking you to chat", toastOptions);
          setTimeout(() => {
            navigate("/");
          }, 3000);
        })
        .catch((e) => {
          toast.error(e, toastOptions);
        });
    } else {
      toast.error("You haven't picked anything😡", toastOptions);
    }
  };

  const toastOptions: ToastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  };

  return (
    <>
      {isLoading ? (
        <Container>
          <div className="loader-wrapper">
            <img src={loader} alt="loader" />
          </div>
        </Container>
      ) : (
        <Container>
          <h1>Pick your avatar</h1>
          <div className="avatar-wrapper">
            {avatars.map((avatar, i) => {
              return (
                <div
                  onClick={() => handleClickAvatar(i)}
                  className={`avatar ${selectedAvatar === i ? "selected" : ""}`}
                  key={avatar}
                >
                  {parse(avatar)}
                </div>
              );
            })}
          </div>
          <div className="button-wrapper">
            <button onClick={() => handleSelectAvatar()}>Select avatar</button>
            <button onClick={() => getAvatars()}>Show me more</button>
          </div>
        </Container>
      )}
      <ToastContainer />
    </>
  );
};
export default SetAvatar;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  gap: 4rem;
  background-image: url("/src/assets/main-bg.svg");
  /* background by SVGBackgrounds.com */
  background-repeat: no-repeat;
  background-size: cover;
  .avatar-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    width: 100%;
    padding: 0 2rem;
    .avatar {
      height: auto;
      width: 10rem;
      background-color: #ffffff;
      border-radius: 100px;
      padding: 6px;
      cursor: pointer;
    }
    .selected {
      @keyframes bounce {
        0% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(10px);
        }
        100% {
          transform: translateY(0);
        }
      }
      animation: bounce 2s infinite;
    }
    svg {
      position: relative;
      top: 2px;
    }
  }
  .button-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    button {
      background-color: #ffffff;
      color: var(--light-green);
      padding: 0.8rem 2rem;
      border: none;
      font-weight: bold;
      cursor: pointer;
      border-radius: 0.5rem;
      transition: all 0.3s;
      &:hover {
        transform: scale(1.1);
      }
    }
  }
  .loader-wrapper {
    background-color: #ffffff;
    padding: 0 5rem;
    border-radius: 30px;
    img {
      height: 5rem;
    }
  }
  h1 {
    color: #ffffff;
    font-weight: 800;
    letter-spacing: 2px;
  }
`;
