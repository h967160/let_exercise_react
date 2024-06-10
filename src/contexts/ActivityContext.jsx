import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { getAll, getActivity, create } from "@/apis/activity";
import { useParams } from "react-router-dom";
import { formatSearchDate } from "@/utils/format";
import { useArena } from "./ArenaContext";
import { useUser } from "./UserContext";

const ActivityContext = createContext();

export const useActivity = () => {
  return useContext(ActivityContext);
};

export const ActivityProvider = ({ children }) => {
  const [activities, setActivities] = useState([]);
  const [activity, setActivity] = useState(null);
  const [pagination, setPagination] = useState({ totalPage: 0 });
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useState({
    regionId: "",
    date: "",
    level: "",
  });
  const { id: activityId } = useParams();
  const { fetchArena } = useArena();
  const { fetchUserData } = useUser();

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
    setSearchParams((prevParams) => ({ ...prevParams, ...params }));
    setCurrentPage(1);
  };

  const fetchActivity = useCallback(
    async (activityId) => {
      try {
        const result = await getActivity(activityId);
        setActivity(result.data);
        const arenaId = result.data.arenaId;
        fetchArena(arenaId);
        const hostId = result.data.hostId;
        fetchUserData(hostId);
      } catch (error) {
        console.error("Error fetching single activity:", error);
      }
    },
    [fetchArena, fetchUserData]
  );

  useEffect(() => {
    if (activityId) {
      fetchActivity(activityId);
    }
  }, [activityId, fetchActivity]);

  const createActivity = async (activityData) => {
    try {
      console.log(
        "Activity data received in createActivity function:",
        activityData
      );
      const response = await create({
        ...activityData,
      });
      console.log("Response received after creating activity:", response);
      // 更新狀態，例如添加新創建的活動
      setActivities((prevActivities) => [...prevActivities, response.data]);
      return response.data;
    } catch (error) {
      console.error("Failed to create activity:", error);
      throw new Error("Failed to create activity: " + error.message);
    }
  };

  const value = {
    activities,
    activity,
    pagination,
    currentPage,
    setCurrentPage,
    goToPage,
    updateSearchParams,
    fetchActivity,
    createActivity,
  };

  return (
    <ActivityContext.Provider value={value}>
      {children}
    </ActivityContext.Provider>
  );
};
