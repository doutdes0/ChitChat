import { styled } from "styled-components";
import { useState, useEffect, useRef } from "react";
import { socket } from "../utils/socket";
import send_icon from "../assets/send-icon.svg";
import smiles_icon from "../assets/smiles-icon.svg";
import { useAppDispatch } from "../hooks/useRedux";
import { send_msg_io } from "../redux/reducers/messagesSlice";
import { sendMsgAPI } from "../redux/thunks";
import EmojiPicker from "emoji-picker-react";
import {
  EmojiClickData,
  EmojiStyle,
} from "emoji-picker-react/dist/types/exposedTypes";

type Props = {
  from: string;
  to: string;
};

const ChatInput: React.FC<Props> = ({ from, to }) => {
  const dispatch = useAppDispatch();
  const emojiRef = useRef<HTMLDivElement | null>(null);
  const [msg, setMsg] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  useEffect(() => {
    setMsg("");
  }, [to]);
  useEffect(() => {
    const listener = (e: MouseEvent) => {
      const img = e.target as HTMLImageElement;
      if (
        emojiRef.current &&
        e.target &&
        img.getAttribute("alt") !== "smiles" &&
        !emojiRef.current.contains(e.target as Node)
      ) {
        setShowEmojiPicker(false);
      }
    };
    document.addEventListener("click", listener);

    return () => {
      document.removeEventListener("click", listener);
    };
  }, []);

  const handleSend = () => {
    setMsg("");
    if (msg) {
      socket.emit("send_msg", { from, to, msg });
      dispatch(send_msg_io({ userID: to, msg }));
      dispatch(sendMsgAPI({ from, to, msg }));
    }
  };
  const handleEnter = (e: KeyboardEvent) => {
    if (e.key === "Enter" && e.shiftKey) {
      const textarea = e.target as HTMLTextAreaElement;
      const currentCursorPosition = textarea.selectionStart;
      const textBeforeCursor = textarea.value.slice(0, currentCursorPosition);
      const textAfterCursor = textarea.value.slice(currentCursorPosition);
      textarea.value = textBeforeCursor + "\n" + textAfterCursor;
      textarea.selectionStart = textarea.selectionEnd =
        currentCursorPosition + 1;
      e.preventDefault();
    } else if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    window.addEventListener("keypress", handleEnter);
    return () => {
      window.removeEventListener("keypress", handleEnter);
    };
  });

  return (
    <Container>
      <img
        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
        src={smiles_icon}
        alt="smiles"
      />
      {showEmojiPicker && (
        <div ref={emojiRef} className="emoji-picker">
          <EmojiPicker
            onEmojiClick={(data: EmojiClickData) =>
              setMsg((prevVal) => prevVal + data.emoji)
            }
            emojiStyle={"native" as EmojiStyle.NATIVE}
          />
        </div>
      )}
      <textarea
        onChange={(e) => setMsg(e.target.value)}
        value={msg}
        placeholder="Type your message here"
      />
      <img onClick={() => handleSend()} src={send_icon} alt="send message" />
    </Container>
  );
};

export default ChatInput;

const Container = styled.div`
  display: grid;
  grid-template-columns: [first] 4% [line1] 10% [line2] auto [line3] 4% [line4] 10% [last];
  box-shadow: 0 -1em 5em -1em hsla(0, 0%, 0%, 0.25);
  border-radius: 0 0 20px 20px;
  position: relative;
  img[alt*="smiles"] {
    grid-column-start: 2;
    grid-column-end: 3;
    align-self: center;
    height: 1.6rem;
    opacity: 0.4;
    cursor: pointer;
  }
  img[alt*="send message"] {
    grid-column-start: 5;
    grid-column-end: 6;
    align-self: center;
    height: 1.9rem;
    cursor: pointer;
  }
  textarea {
    grid-column-start: 3;
    grid-column-end: 4;
    align-self: center;
    border: none;
    outline: none;
    height: 70%;
    padding: 0.6rem 1rem 0;
    border-radius: 20px;
    resize: none;
    &:focus::placeholder {
      color: transparent;
    }
    &::-webkit-scrollbar {
      display: none;
    }
  }
  .emoji-picker {
    position: absolute;
    bottom: 90%;
    left: 5%;
  }
`;
