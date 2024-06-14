import { getArena, getArenas, getRegions } from "@/apis/arena";
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
  const [selectedArenaId, setSelectedArenaId] = useState(null);

  const fetchArena = useCallback(async (arenaId) => {
    const result = await getArena(arenaId);
    setArena(result.data);
  }, []);

  // 取得所有場館
  const fetchArenas = useCallback(async () => {
    try {
      const result = await getArenas();
      const arenasData = result.data.map((arena) => ({
        ...arena,
        arenaId: arena.id, // 将 id 赋值给 arenaId
      }));
      setArenas(arenasData);
    } catch (error) {
      console.error("Error fetching arenas:", error);
    }
  }, []);

  useEffect(() => {
    fetchArenas();
  }, [fetchArenas]);

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const result = await getRegions();
        setRegions(result.data);
      } catch (error) {
        console.error("Error fetching regions:", error);
      }
    };

    fetchRegions();
  }, []);

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

      // 添加 arenaId 屬性到篩選後的結果內
      filteredArenasResult = filteredArenasResult.map((arena) => ({
        ...arena,
        arenaId: arena.id,
      }));

      // 設置篩選後的結果
      setFilteredArenas(filteredArenasResult);
    };

    // 檢查是否進行了縣市選擇或者關鍵字輸入
    if (selectedRegion || arenaSearch.trim() !== "") {
      filterArenas();
    }
  }, [arenas, selectedRegion, arenaSearch]);

  const selectArena = useCallback(
    async (arenaId) => {
      setSelectedArenaId(arenaId);
      const selectedArena = filteredArenas.find(
        (arena) => arena.id === parseInt(arenaId)
      );
      setArena(selectedArena);
    },
    [filteredArenas]
  );

  const value = {
    arena,
    arenas,
    regions,
    selectedRegion,
    setSelectedRegion,
    arenaSearch,
    setArenaSearch,
    selectArena,
    selectedArenaId,
    filteredArenas,
    fetchArena,
    fetchArenas,
  };

  return (
    <ArenaContext.Provider value={value}>{children}</ArenaContext.Provider>
  );
};
