import { getArena, getArenas } from "@/apis/arena";
import {
  createContext,
  useContext,
  useCallback,
  useState,
  useEffect,
} from "react";

const ArenaContext = createContext();

export const useArena = () => {
  return useContext(ArenaContext);
};

export const ArenaProvider = ({ children }) => {
  const [arena, setArena] = useState(null);
  const [arenas, setArenas] = useState([]);
  const [regions, setRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [arenaSearch, setArenaSearch] = useState("");
  const [filteredArenas, setFilteredArenas] = useState([]);

  const fetchArena = useCallback(async (arenaId) => {
    const result = await getArena(arenaId);
    setArena(result.data);
  }, []);

  // 取得所有場館
  const fetchArenas = useCallback(async () => {
    try {
      const result = await getArenas();
      setArenas(result.data);

      // 使用 Map 組合縣市
      const regionsMap = new Map();
      result.data.forEach((arena) => {
        if (!regionsMap.has(arena.regionId)) {
          regionsMap.set(arena.regionId, {
            regionId: arena.regionId,
            region: arena.region,
          });
        }
      });

      // Map轉為Array,取得各縣市唯一值
      const uniqueRegions = Array.from(regionsMap.values());
      setRegions(uniqueRegions);
    } catch (error) {
      console.error("Error fetching arenas:", error);
    }
  }, []);

  useEffect(() => {
    fetchArenas();
  }, [fetchArenas]);

  useEffect(() => {
    const filterArenas = () => {
      let filteredArenasResult = [...arenas];

      // 根據縣市id篩選場館
      if (selectedRegion) {
        filteredArenasResult = filteredArenasResult.filter(
          (arena) => arena.regionId === parseInt(selectedRegion)
        );
      }

      // 根據關鍵字篩選場館
      if (arenaSearch.trim() !== "") {
        filteredArenasResult = filteredArenasResult.filter(
          (arena) =>
            arena.name.includes(arenaSearch) ||
            arena.address.includes(arenaSearch)
        );
      }

      // 根據縣市+關鍵字篩選場館
      if (selectedRegion && arenaSearch.trim() !== "") {
        filteredArenasResult = filteredArenasResult.filter(
          (arena) =>
            arena.regionId === parseInt(selectedRegion) &&
            (arena.name.includes(arenaSearch) ||
              arena.address.includes(arenaSearch))
        );
      }

      // 設置篩選後的結果
      setFilteredArenas(filteredArenasResult);
    };

    // 檢查是否進行了縣市選擇或者關鍵字輸入
    if (selectedRegion || arenaSearch.trim() !== "") {
      filterArenas();
    }
  }, [arenas, selectedRegion, arenaSearch]);

  const value = {
    arena,
    arenas,
    regions,
    selectedRegion,
    setSelectedRegion,
    arenaSearch,
    setArenaSearch,
    filteredArenas,
    fetchArena,
    fetchArenas,
  };

  return (
    <ArenaContext.Provider value={value}>{children}</ArenaContext.Provider>
  );
};
