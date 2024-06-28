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

export const getActivity = async (activityId) => {
  try {
    const response = await axios.get(`${BASE_URL}/activities/${activityId}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch activity: " + error.message);
  }
};

export const create = async (activityData) => {
  //取得token
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("請先登入!");
  }
  try {
    const response = await axios.post(
      `${BASE_URL}/activities/create`,
      activityData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const getLevels = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/levels/all`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch levels: " + error.message);
  }
};

export const update = async (activityId, updatedData) => {
  // 取得 token
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("請先登入!");
  }
  try {
    const response = await axios.put(
      `${BASE_URL}/activities/edit/${activityId}`,
      updatedData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
