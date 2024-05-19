import { createContext, useContext, useEffect, useState } from "react";
import { getAll } from "@/apis/activity";
import { formatSearchDate } from "@/utils/dateFormat";

const ActivityContext = createContext();

export const useActivity = () => {
  return useContext(ActivityContext);
};

export const ActivityProvider = ({ children }) => {
  const [activities, setActivities] = useState([]);
  const [pagination, setPagination] = useState({ totalPage: 0 }); // 初始化 pagination 對象
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useState({
    regionId: "",
    date: "",
    level: "",
  });

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const { regionId, date, level } = searchParams;
        const result = await getAll(currentPage, regionId, date, level);
        if (result) {
          setActivities(result.data);
          setPagination(result.pagination);
        }
      } catch (error) {
        console.error("Error fetching activities:", error);
      }
    };

    fetchActivities();
  }, [currentPage, searchParams]);

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const updateSearchParams = (params) => {
    if (params.date) {
      params.date = formatSearchDate(params.date);
    }
    console.log(currentPage);
    console.log(params);

    setSearchParams((prevParams) => ({ ...prevParams, ...params }));
    setCurrentPage(1);
  };

  const value = {
    activities,
    pagination,
    currentPage,
    setCurrentPage,
    goToPage,
    updateSearchParams,
  };

  return (
    <ActivityContext.Provider value={value}>
      {children}
    </ActivityContext.Provider>
  );
};
