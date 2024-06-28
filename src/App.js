import {
  HomePage,
  LoginPage,
  SignUpPage,
  ActivityPage,
  ActivityInfoPage,
  CreateActivityPage,
  EditActivityPage,
  UserProfilePage,
} from "@/pages/index";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ActivityProvider } from "./contexts/ActivityContext";
import { ArenaProvider } from "./contexts/ArenaContext";
import { UserProvider } from "./contexts/UserContext";
import { ShuttlecockProvider } from "./contexts/ShuttlecockContext";
import ProtectedRoute from "./utils/ProtectedRoute";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <UserProvider>
            <ArenaProvider>
              <ActivityProvider>
                <ShuttlecockProvider>
                  <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignUpPage />} />
                    <Route path="/activities" element={<ActivityPage />} />
                    <Route path="/profile" element={<UserProfilePage />} />
                    <Route
                      path="/activities/:id"
                      element={<ActivityInfoPage />}
                    />
                    <Route
                      path="/activities/:id/edit"
                      element={<EditActivityPage />}
                    />
                    {/* 需登入驗證路由 */}
                    <Route element={<ProtectedRoute />}>
                      <Route
                        path="/activities/create"
                        element={<CreateActivityPage />}
                      />
                    </Route>
                    {/* 非以上路由則跳轉到首頁 */}
                    <Route path="*" element={<HomePage />} />
                  </Routes>
                </ShuttlecockProvider>
              </ActivityProvider>
            </ArenaProvider>
          </UserProvider>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
