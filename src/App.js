import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Header from "./components/Header";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import "./App.css";
import { useState } from "react";

function App() {
  const [connected, setConnected] = useState(null);

  return (
    <BrowserRouter>
      <Header connected={connected} setConnected={setConnected} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/offer/:id" element={<Offer />} />
        <Route
          path="/signup"
          element={<Signup setConnected={setConnected} />}
        />
        <Route path="/login" element={<Login setConnected={setConnected} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
