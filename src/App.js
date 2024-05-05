import Header from "@/components/Layouts/Header/Header";
import Footer from "@/components/Layouts/Footer/Footer";
import { HomePage } from "@/pages/index";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <Routes>
          {/* <Route path="login" element={<LoginPage />} /> */}
          {/* 
          <Route path="signup" element={<SignUpPage />} />
          <Route path="todo" element={<TodoPage />} /> */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
