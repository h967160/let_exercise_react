import { createContext, useContext, useState, useCallback } from "react";
import { getUserData } from "@/apis/user";

const UserContext = createContext();
export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const fetchUserData = useCallback(async (userId) => {
    try {
      const result = await getUserData(userId);
      setUser(result.data.user); // 假設 API 返回的數據結構中有一個 user 屬性
      return result.data.user; // 返回 user 數據
    } catch (error) {
      console.error("Error fetching user data:", error);
      return null;
    }
  }, []);

  const value = {
    user,
    fetchUserData,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
