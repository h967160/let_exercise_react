import { getAll } from "@/apis/shuttlecock";
import { createContext, useContext, useState, useEffect } from "react";

const ShuttlecockContext = createContext();

export const useShuttlecock = () => {
  return useContext(ShuttlecockContext);
};

export const ShuttlecockProvider = ({ children }) => {
  const [shuttlecocks, setShuttlecocks] = useState([]);

  useEffect(() => {
    const fetchShuttlecocks = async () => {
      try {
        const result = await getAll();
        setShuttlecocks(result.data); // 將 API 回傳的資料設置到狀態中
        console.log("result.data: ", result.data); // 輸出從 API 取得的資料
      } catch (error) {
        console.error("Error fetching shuttlecocks:", error);
      }
    };

    fetchShuttlecocks(); // 執行資料取得函數
  }, []); // 空的依賴項目，只執行一次

  const value = {
    shuttlecocks,
  };

  return (
    <ShuttlecockContext.Provider value={value}>
      {children}
    </ShuttlecockContext.Provider>
  );
};
