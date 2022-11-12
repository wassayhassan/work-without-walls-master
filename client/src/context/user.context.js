import React, { createContext, useEffect, useState } from "react";
//deeply nested components so useContext
const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const data = localStorage.getItem("user");

  const [user, setuser] = useState(data ? JSON.parse(data) : null);

  useEffect(() => {
    setuser(user);
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setuser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
