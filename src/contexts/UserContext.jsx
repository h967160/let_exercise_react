import { createContext, useContext, useState, useCallback } from "react";
import { getUserActivities, getUserData } from "@/apis/user";

const UserContext = createContext();
export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userActivities, setUserActivities] = useState([]);

  const fetchUserData = useCallback(async (userId) => {
    try {
      const result = await getUserData(userId);
      setUser(result.data.user);
      return result.data.user;
    } catch (error) {
      console.error("Error fetching user data:", error);
      return null;
    }
  }, []);

  const fetchUserActivities = useCallback(async (userId) => {
    try {
      const result = await getUserActivities(userId);
      setUserActivities(result.data);
      return result.data;
    } catch (error) {
      console.error("Error fetching user activities:", error);
      return null;
    }
  }, []);

  const value = {
    user,
    userActivities,
    fetchUserData,
    fetchUserActivities,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
