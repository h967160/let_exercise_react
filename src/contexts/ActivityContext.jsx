import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import {
  getAll,
  getActivity,
  create,
  update,
  getLevels,
  deleteActivity as deleteActivityAPI,
} from "@/apis/activity";
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
        return result.data;
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
        return result.data;
      } catch (error) {
        console.error("Error fetching single activity:", error);
        throw new Error(`Failed to fetch activity: ${error.message}`);
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
      navigate("/activities", { replace: true });
      return response.data;
    } catch (error) {
      return { status: "Error", message: error.message };
    }
  };

  const updateActivity = async (activityId, updatedData) => {
    try {
      const response = await update(activityId, updatedData);

      if (response.status === 200 && response.data.status === "Success") {
        // 從後端重新獲取最新的活動資料
        const updatedActivity = await getActivity(activityId);
        setActivity(updatedActivity.data); // 更新單個活動

        // 更新活動列表或其他相關狀態
        setActivities((prevActivities) => {
          const existingIndex = prevActivities.findIndex(
            (act) => act.id === updatedActivity.data.id
          );
          if (existingIndex !== -1) {
            // 如果活動已存在於列表中，更新它
            prevActivities[existingIndex] = updatedActivity.data;
          } else {
            // 否則將更新後的活動新增到列表中
            prevActivities.push(updatedActivity.data);
          }
          return [...prevActivities]; // 返回更新後的新狀態陣列
        });
        navigate("/activities", { replace: true });

        return { status: "Success", message: response.data.message };
      } else {
        return { status: "Error", message: response.data.message };
      }
    } catch (error) {
      return { status: "Error", message: error.message };
    }
  };

  const deleteActivity = async (activityId) => {
    try {
      const response = await deleteActivityAPI(activityId);
      console.log("response: ", response);
      if (response.status === "Success") {
        // 更新活動列表狀態
        setActivities((prevActivities) =>
          prevActivities.filter((activity) => activity.id !== activityId)
        );
        return { status: "Success", message: "活動已刪除" };
      } else {
        return { status: "Error", message: response.message };
      }
    } catch (error) {
      return { status: "Error", message: error.message };
    }
  };

  useEffect(() => {
    if (activityId) {
      fetchActivity(activityId);
    }
  }, [activityId, fetchActivity]);

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
    updateActivity,
    deleteActivity,
  };

  return (
    <ActivityContext.Provider value={value}>
      {children}
    </ActivityContext.Provider>
  );
};
