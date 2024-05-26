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
