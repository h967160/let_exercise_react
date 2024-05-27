import { createContext, useContext, useState, useCallback } from "react";
import { getUserData } from "@/apis/user";

const UserContext = createContext();
export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const fetchUserData = useCallback(async (userId) => {
    if (userId) {
      const result = await getUserData(userId);
      if (result) {
        setUser(result.data.user);
      }
    }
  }, []);

  const value = {
    user,
    fetchUserData,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
