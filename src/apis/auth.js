import axios from "axios";

const authURL = "http://127.0.0.1:3000";

export const login = async ({ account, password }) => {
  try {
    const { data } = await axios.post(`${authURL}/users/signin`, {
      account,
      password,
    });

    return data;
  } catch (error) {
    console.error("[Login Failed]:", error);
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
    const { data } = await axios.post(`${authURL}/users/signup`, {
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

    return data;
  } catch (error) {
    console.error("[SignUp Failed]:", error);
  }
};
