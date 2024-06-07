import axios from "axios";
import BASE_URL from "./baseUrl";

export const getArena = async (arenaId) => {
  try {
    const response = await axios.get(`${BASE_URL}/arenas/${arenaId}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch arena: " + error.message);
  }
};

export const getArenas = async (page = 1, limit = 1000, regionId = "") => {
  try {
    const response = await axios.get(`${BASE_URL}/arenas/all`, {
      params: {
        page,
        limit,
        regionId: regionId !== "" ? parseInt(regionId, 10) : "",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch arenas:", error.message);
  }
};
