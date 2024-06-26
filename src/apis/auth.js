import axios from "axios";
import BASE_URL from "./baseUrl";

export const login = async ({ account, password }) => {
  try {
    const response = await axios.post(`${BASE_URL}/users/signin`, {
      account,
      password,
    });

    return response.data;
  } catch (error) {
    console.error("[Login Failed]:", error);
    return error.response.data;
  }
};

export const signup = async ({
  nationalId,
  email,
  account,
  password,
  checkPassword,
  firstName,
  lastName,
  nickName,
  gender,
  avatar,
  introduction,
  birthdate,
  playSince,
  phoneNumber,
}) => {
  try {
    const response = await axios.post(`${BASE_URL}/users/signup`, {
      nationalId,
      email,
      account,
      password,
      checkPassword,
      firstName,
      lastName,
      nickName,
      gender,
      avatar,
      introduction,
      birthdate,
      playSince,
      phoneNumber,
    });
    return response.data;
  } catch (error) {
    console.error("[SignUp Failed]:", error);
    return error.response.data;
  }
};
