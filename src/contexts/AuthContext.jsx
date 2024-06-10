import { signup, login } from "@/apis/auth";
import { createContext, useContext, useEffect, useState } from "react";
import * as jwt from "jsonwebtoken";
import { useLocation } from "react-router-dom";

const defaultAuthContext = {
  isAuthenticated: false,
  user: null,
  signup: null,
  login: null,
  logout: null,
};

const AuthContext = createContext(defaultAuthContext);
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [payload, setPayload] = useState(null);
  const { pathname } = useLocation();

  useEffect(() => {
    const checkTokenIsValid = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsAuthenticated(false);
        setPayload(null);
        return;
      } else {
        const tempPayload = jwt.decode(token);
        console.log("Decoded Payload:", tempPayload); //添加
        setPayload(tempPayload);
        setIsAuthenticated(true);
      }
    };
    checkTokenIsValid();
  }, [pathname]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user: payload && {
          id: payload.id,
          nationalId: payload.nationalId,
          email: payload.email,
          account: payload.account,
          firstName: payload.firstName,
          lastName: payload.lastName,
          nickName: payload.nickName,
          gender: payload.gender,
          introduction: payload.introduction,
          avatar: payload.avatar,
          birthdate: payload.birthdate,
          playSince: payload.playSince,
          phoneNumber: payload.phoneNumber,
        },
        signup: async (data) => {
          const response = await signup({
            nationalId: data.nationalId,
            email: data.email,
            account: data.account,
            password: data.password,
            checkPassword: data.checkPassword,
            firstName: data.firstName,
            lastName: data.lastName,
            nickName: data.nickName,
            gender: data.gender,
            introduction: data.introduction,
            avatar: data.avatar,
            birthdate: data.birthdate,
            playSince: data.playSince,
            phoneNumber: data.phoneNumber,
          });
          if (response && response.status === "Success") {
            return { success: true, message: response.message };
          } else {
            return { success: false, message: response.message };
          }
        },
        login: async (data) => {
          const response = await login({
            account: data.account,
            password: data.password,
          });
          if (response && response.status === "Success") {
            const { token } = response.data;
            const tempPayload = jwt.decode(token);
            console.log("Decoded Payload on Login:", tempPayload); //這
            setPayload(tempPayload);
            setIsAuthenticated(true);
            localStorage.setItem("token", token);
            return { success: true, message: response.message };
          } else {
            return { success: false, message: response.message };
          }
        },
        logout: () => {
          localStorage.removeItem("token");
          setPayload(null);
          setIsAuthenticated(false);
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
