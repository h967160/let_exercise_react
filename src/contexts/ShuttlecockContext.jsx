import { getAll } from "@/apis/shuttlecock";
import { createContext, useContext, useState, useEffect } from "react";

const ShuttlecockContext = createContext();

export const useShuttlecock = () => {
  return useContext(ShuttlecockContext);
};

export const ShuttlecockProvider = ({ children }) => {
  const [shuttlecocks, setShuttlecocks] = useState([]);
  const [filteredShuttlecocks, setFilteredShuttlecocks] = useState([]);
  const [shuttlecockSearch, setShuttlecockSearch] = useState("");

  useEffect(() => {
    const fetchShuttlecocks = async () => {
      try {
        const result = await getAll();
        setShuttlecocks(result.data); // 將 API 回傳的資料設置到狀態中
        setFilteredShuttlecocks(result.data); // 初始化時，設置篩選後的羽毛球資料與全部資料相同
      } catch (error) {
        console.error("Error fetching shuttlecocks:", error);
      }
    };

    fetchShuttlecocks(); // 執行資料取得函數
  }, []); // 空的依賴項目，只執行一次

  useEffect(() => {
    // 當搜尋關鍵字改變時進行篩選
    if (shuttlecockSearch.trim() === "") {
      setFilteredShuttlecocks(shuttlecocks); // 如果關鍵字為空，顯示全部羽毛球資料
    } else {
      // 使用關鍵字篩選羽毛球資料
      const filteredData = shuttlecocks.filter((shuttlecock) =>
        shuttlecock.name.toLowerCase().includes(shuttlecockSearch.toLowerCase())
      );
      setFilteredShuttlecocks(filteredData);
    }
  }, [shuttlecockSearch, shuttlecocks]); // 監聽searchKeyword和shuttlecocks的變化

  const value = {
    shuttlecocks,
    filteredShuttlecocks,
    setShuttlecockSearch,
  };

  return (
    <ShuttlecockContext.Provider value={value}>
      {children}
    </ShuttlecockContext.Provider>
  );
};
