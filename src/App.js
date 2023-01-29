import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Header from "./components/Header";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Cookies from "js-cookie";
import "./App.css";
import { useState } from "react";

function App() {
  const [token, setToken] = useState(Cookies.get("token") || null);
  const [filters, setFilters] = useState([]);

  const handleToken = (token) => {
    if (token) {
      Cookies.set("token", token, { expires: 1, sameSite: "strict" });
    } else {
      Cookies.remove("token");
    }
    setToken(token);
  };
  return (
    <BrowserRouter>
      <Header
        token={token}
        handleToken={handleToken}
        filters={filters}
        setFilters={setFilters}
      />
      <Routes>
        <Route path="/" element={<Home filters={filters} />} />
        <Route path="/offer/:id" element={<Offer />} />
        <Route
          path="/signup"
          element={<Signup setToken={setToken} handleToken={handleToken} />}
        />
        <Route
          path="/login"
          element={<Login setToken={setToken} handleToken={handleToken} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
