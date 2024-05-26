import { getArena } from "@/apis/arena";
import { createContext, useContext, useCallback, useState } from "react";

const ArenaContext = createContext();

export const useArena = () => {
  return useContext(ArenaContext);
};

export const ArenaProvider = ({ children }) => {
  const [arena, setArena] = useState(null);

  // 使用 useCallback 确保 fetchArena 的稳定性
  const fetchArena = useCallback(async (arenaId) => {
    try {
      const result = await getArena(arenaId);
      console.log("result.data: ", result.data);
      setArena(result.data);
    } catch (error) {
      console.error("Error fetching single arena:", error);
    }
  }, []);

  const value = {
    arena,
    fetchArena,
  };

  return (
    <ArenaContext.Provider value={value}>{children}</ArenaContext.Provider>
  );
};
