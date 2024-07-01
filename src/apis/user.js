import axios from "axios";
import BASE_URL from "./baseUrl";

export const getUserData = async (userId) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      return null;
    }
    const response = await axios.get(`${BASE_URL}/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch user data: " + error.message);
  }
};

export const getUserActivities = async (userId, page = 1, limit = 10) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      return null;
    }
    const response = await axios.get(`${BASE_URL}/users/activities/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        page,
        limit,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch user activities: " + error.message);
  }
};
