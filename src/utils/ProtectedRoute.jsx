import React, { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = () => {
  const location = useLocation(); // 取得當前路由位置
  const { isAuthenticated, loading } = useAuth(); // 取得認證狀態和加載狀態
  const [isReady, setIsReady] = useState(false); // 使用狀態來確保正確渲染內容

  useEffect(() => {
    if (!loading) {
      setIsReady(true); // 當 loading 結束時，設置 isReady 為 true，表示準備好渲染內容
    }
  }, [loading]);

  if (!isReady) {
    return null;
  }

  if (!isAuthenticated) {
    // 如果未認證，導航至登入頁面並保存來源路徑
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // 如果認證通過，返回子路由
  return <Outlet />;
};

export default ProtectedRoute;
