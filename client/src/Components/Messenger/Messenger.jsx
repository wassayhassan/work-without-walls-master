import "./Messenger.css";
import SellerNavbar from "../navbars/sellerNavbar";
import Conversation from "../Coversation/Conversation";
import Message from "../Message/Message";
import ChatOnline from "../ChatOnline/ChatOnline";
import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../context/user.context";
import { AddMessages, getMessage, getConversation, getBidsById } from "../../api/index";
import { io } from "socket.io-client";

export default function Messenger() {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [offers, setOffers] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef();
  const { user } = useContext(UserContext);
  const scrollRef = useRef();

  useEffect(() => {
    socket.current = io("ws://localhost:7900"); //

    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        mtype: data.mtype,
        createdAt: Date.now(),
      });
    });
  }, [user?._id]);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.find(
        (record) => record?._id === arrivalMessage.sender
      ) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", { user: user._id });
    socket.current.on("getUsers", (users) => {
      if (users[user?._id])
        setOnlineUsers(Object.entries(users).map((r) => r[1]));
    });
  }, [user?._id]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await getConversation(user._id);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user._id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await getMessage(currentChat?._id);
        const res2 = await getBidsById(user._id);
        if(res && res2){
          let newArr = [...res.data, ...res2.data];
          console.log(newArr)
          setMessages(newArr);
          // newArr.sort()

        }
        
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );

    socket.current.emit("sendMessage", {
      mtype: "message",
      senderId: user._id,
      receiverId,
      text: newMessage,
      conversationId: currentChat?._id,
    });

    try {
      console.log('---------')
      console.log(message);
      console.log('---------')
      const res = await AddMessages(message);
      const newEntry = messages[0];
      newEntry.text = newMessage;
      newEntry.mtype = "message";
      setMessages([...messages, newEntry]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    socket.current.emit("join", {
      conversationId: currentChat?._id,
    });
  }, [currentChat]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <SellerNavbar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            {conversations.map((c, idx) => (
              <div onClick={() => setCurrentChat(c)} key={idx}>
                <Conversation conversation={c} currentUser={user}  />
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                 
                  {messages.map((m) => (
                    <div ref={scrollRef} key={m._id}>
                      <Message currentChat={currentChat}
                        
                        member={currentChat.members.find(
                          (m) => m._id !== user?._id
                        )}
                        message={m}
                        own={m.sender === user._id}
                      />
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="write something..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversationText">
                Open a conversation to start a chat.
              </span>
            )}
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline
              onlineUsers={onlineUsers}
              currentId={user._id}
              setCurrentChat={setCurrentChat}
            />
          </div>
        </div>
      </div>
    </>
  );
}
