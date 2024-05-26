import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { getAll, getActivity } from "@/apis/activity";
import { useParams } from "react-router-dom";
import { formatSearchDate } from "@/utils/format";
import { useArena } from "./ArenaContext";

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
      } catch (error) {
        console.error("Error fetching single activity:", error);
      }
    },
    [fetchArena]
  );

  useEffect(() => {
    if (activityId) {
      fetchActivity(activityId);
    }
  }, [activityId, fetchActivity]);

  const value = {
    activities,
    activity,
    pagination,
    currentPage,
    setCurrentPage,
    goToPage,
    updateSearchParams,
    fetchActivity,
  };

  return (
    <ActivityContext.Provider value={value}>
      {children}
    </ActivityContext.Provider>
  );
};
