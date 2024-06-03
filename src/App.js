import {
  HomePage,
  LoginPage,
  SignUpPage,
  ActivityPage,
  ActivityInfoPage,
  CreateActivityPage,
} from "@/pages/index";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ActivityProvider } from "./contexts/ActivityContext";
import { ArenaProvider } from "./contexts/ArenaContext";
import { UserProvider } from "./contexts/UserContext";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <UserProvider>
            <ArenaProvider>
              <ActivityProvider>
                <Routes>
                  <Route path="login" element={<LoginPage />} />
                  <Route path="signup" element={<SignUpPage />} />
                  <Route path="activity" element={<ActivityPage />} />
                  <Route path="activities/:id" element={<ActivityInfoPage />} />
                  <Route path="addActivity" element={<CreateActivityPage />} />
                  <Route path="*" element={<HomePage />} />
                </Routes>
              </ActivityProvider>
            </ArenaProvider>
          </UserProvider>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
