import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import LandingPage from "./pages/LandingPage/LandingPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import GamePage from "./pages/GamePage/GamePage";
import Decentraland from "./pages/Decentraland/Decentraland";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} exact />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          {/* removed exact from Decentraland */}
          <Route path="/decentraland" element={<Decentraland />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
