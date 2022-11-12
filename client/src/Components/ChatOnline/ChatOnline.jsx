import { useEffect, useState } from "react";
import "./chatOnline.css";
import { getConversation, getFriednsConversation } from "../../api/index";
import defaultAvatar from "../../Images/noavator.png";

export default function ChatOnline({
  profileImg,
  onlineUsers,
  currentId,
  setCurrentChat,
}) {
  const [online, setOnline] = useState([]);
  useEffect(() => {
    setOnline(onlineUsers);
  }, [onlineUsers]);

  const handleClick = async (user) => {
    try {
      const res = await getFriednsConversation(currentId, user._id);
      setCurrentChat(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="chatOnline">
      <div className="chatMenu">
        <div className="chatMenuWrapper">
          <input
            onChange={({ target: { value } }) =>
              setOnline(
                onlineUsers.filter((record) =>
                  `${record.firstname?.toLowerCase()} ${record?.lastname?.toLowerCase()}`.includes(
                    value.toLowerCase()
                  )
                )
              )
            }
            placeholder="Search users"
            className="chatMenuInput"
          />
        </div>
      </div>
      {online.map((o) => (
        <div
          style={{
            pointerEvents: `${o._id === currentId ? "none" : "all"}`,
          }}
          className="chatOnlineFriend"
          onClick={() => handleClick(o)}
        >
          <div className="chatOnlineImgContainer">
            <img
              className="chatOnlineImg"
              src={o?.profileImg ? o.profileImg : defaultAvatar}
              alt=""
            />
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName">{`${o?.firstname} ${o?.lastname} ${
            o._id === currentId ? "(Me)" : ""
          }`}</span>
        </div>
      ))}
    </div>
  );
}
