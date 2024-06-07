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

export const createActivity = async ({
  arenaId,
  shuttlecockId,
  date,
  timeStart,
  timeEnd,
  shuttlecockProvide,
  level,
  fee,
  numsOfPeople,
  totalPeople,
  description,
}) => {
  try {
    const response = await axios.post(`${BASE_URL}/activities/create`, {
      arenaId,
      shuttlecockId,
      date,
      timeStart,
      timeEnd,
      shuttlecockProvide,
      level,
      fee,
      numsOfPeople,
      totalPeople,
      description,
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to create activity: " + error.message);
  }
};
