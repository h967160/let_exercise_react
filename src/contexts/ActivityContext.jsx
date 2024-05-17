import { createContext, useContext, useEffect, useState } from "react";
import { getAll } from "@/apis/activity";

const ActivityContext = createContext();

export const useActivity = () => {
  return useContext(ActivityContext);
};

export const ActivityProvider = ({ children }) => {
  const [activities, setActivities] = useState([]);
  const [pagination, setPagination] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const result = await getAll(currentPage);
        if (result) {
          setActivities(result.data);
          setPagination(result.pagination);
        }
      } catch (error) {
        console.error("Error fetching activities:", error);
      }
    };

    fetchActivities();
  }, [currentPage]);
  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const value = {
    activities,
    pagination,
    currentPage,
    setCurrentPage,
    goToPage,
  };

  return (
    <ActivityContext.Provider value={value}>
      {children}
    </ActivityContext.Provider>
  );
};
