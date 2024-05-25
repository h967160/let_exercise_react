import {
  HomePage,
  LoginPage,
  SignUpPage,
  ActivityPage,
  ActivityInfoPage,
} from "@/pages/index";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ActivityProvider } from "./contexts/ActivityContext";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <ActivityProvider>
            <Routes>
              <Route path="login" element={<LoginPage />} />
              <Route path="signup" element={<SignUpPage />} />
              <Route path="activity" element={<ActivityPage />} />
              <Route path="activities/:id" element={<ActivityInfoPage />} />
              <Route path="*" element={<HomePage />} />
            </Routes>
          </ActivityProvider>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
