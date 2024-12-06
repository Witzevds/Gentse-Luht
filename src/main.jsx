import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./pages/App/App.jsx";
import Scanner from "./pages/Scanner/Scanner.jsx";
import Webshop from "./pages/Webshop/Webshop.jsx";
import Footer from "./sections/Footer/Footer.jsx";
import Header from "./components/Header/Header.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/Scanner" element={<Scanner />} />
      <Route path="/Webshop" element={<Webshop />} />
    </Routes>
    <Footer />
  </BrowserRouter>
);
