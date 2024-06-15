import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { getAll, getActivity, create, getLevels } from "@/apis/activity";
import { useParams } from "react-router-dom";
import { formatSearchDate } from "@/utils/format";
import { useArena } from "./ArenaContext";
import { useUser } from "./UserContext";
import { useNavigate } from "react-router-dom";

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
  const [levels, setLevels] = useState([]);
  const { id: activityId } = useParams();
  const { fetchArena } = useArena();
  const { fetchUserData } = useUser();
  const navigate = useNavigate();

  // useEffect(() => {
  //   const fetchActivities = async () => {
  //     try {
  //       const { regionId, date, level } = searchParams;
  //       const result = await getAll(currentPage, regionId, date, level);
  //       if (result) {
  //         setActivities(result.data);
  //         setPagination(result.pagination);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching activities:", error);
  //     }
  //   };

  //   fetchActivities();
  // }, [currentPage, searchParams]);
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

  useEffect(() => {
    fetchActivities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      const response = await create({
        ...activityData,
      });
      // 更新狀態，例如添加新創建的活動
      setActivities((prevActivities) => [...prevActivities, response.data]);
      await fetchActivities();
      navigate("/activity", { replace: true });
      return response.data;
    } catch (error) {
      return { status: "Error", message: error.message };
    }
  };

  useEffect(() => {
    const fetchLevels = async () => {
      try {
        const result = await getLevels();
        setLevels(result.data);
      } catch (error) {
        console.error("Error fetching levels:", error);
      }
    };

    fetchLevels();
  }, []);

  // 根據id取得level名稱
  const getLevelName = (levelId) => {
    const levelName = levels.find((level) => level.id === levelId);
    return levelName ? levelName.level : "Unknown";
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
    levels,
    getLevelName,
    fetchActivities,
  };

  return (
    <ActivityContext.Provider value={value}>
      {children}
    </ActivityContext.Provider>
  );
};
