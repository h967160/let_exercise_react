import axios from "axios";
import BASE_URL from "./baseUrl";

// 取得所有活動, page = 當前頁面
export const getAll = async (page) => {
  try {
    const response = await axios.get(`${BASE_URL}/activities/all?page=${page}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch activities: " + error.message);
  }
};
