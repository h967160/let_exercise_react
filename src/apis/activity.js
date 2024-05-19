import axios from "axios";
import BASE_URL from "./baseUrl";

// 取得所有活動, page = 當前頁面
export const getAll = async (page, regionId, date, level) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/activities/all?page=${page}&regionId=${regionId}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch activities: " + error.message);
  }
};
