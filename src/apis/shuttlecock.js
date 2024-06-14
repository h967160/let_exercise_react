import axios from "axios";
import BASE_URL from "./baseUrl";

export const getAll = async (page, limit) => {
  try {
    const response = await axios.get(`${BASE_URL}/shuttlecocks/all`, {
      params: {
        page,
        limit,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch shuttlecocks:", error.message);
  }
};
