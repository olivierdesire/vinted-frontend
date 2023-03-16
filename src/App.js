import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Header from "./components/Header";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Publish from "./pages/Publish";
import Payment from "./pages/Payment";
import Cookies from "js-cookie";
import "./App.css";
import { useState } from "react";
import Modal from "./components/Modal";

function App() {
  const [token, setToken] = useState(Cookies.get("token") || null);
  const [search, setSearch] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [priceAsc, setPriceAsc] = useState(false);
  const [priceDesc, setPriceDesc] = useState(false);
  const [page, setPage] = useState(1);
  const [visible, setVisible] = useState(null);

  // const baseUrl = "https://lereacteur-vinted-api.herokuapp.com";
  const baseUrl = "https://site--backend-vinted--97yqlpf4l44b.code.run";
  // const baseUrl = "http://localhost:3001";

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
        search={search}
        setSearch={setSearch}
        priceMin={priceMin}
        setPriceMin={setPriceMin}
        priceMax={priceMax}
        setPriceMax={setPriceMax}
        setPriceAsc={setPriceAsc}
        setPriceDesc={setPriceDesc}
        page={page}
        setPage={setPage}
        visible={visible}
        setVisible={setVisible}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              search={search}
              priceMin={priceMin}
              priceMax={priceMax}
              priceAsc={priceAsc}
              priceDesc={priceDesc}
              page={page}
              baseUrl={baseUrl}
            />
          }
        />
        <Route path="/offer/:id" element={<Offer baseUrl={baseUrl} />} />
        <Route
          path="/signup"
          element={
            <Signup
              setToken={setToken}
              handleToken={handleToken}
              baseUrl={baseUrl}
            />
          }
        />
        <Route
          path="/login"
          element={
            <Login
              setToken={setToken}
              handleToken={handleToken}
              baseUrl={baseUrl}
            />
          }
        />
        <Route
          path="/publish"
          element={
            <Publish
              baseUrl={baseUrl}
              visible={visible}
              setVisible={setVisible}
            />
          }
        />
        <Route path="/payment" element={<Payment baseUrl={baseUrl} />} />
      </Routes>
      {visible && (
        <Modal
          visible={visible}
          setVisible={setVisible}
          handleToken={handleToken}
        />
      )}
    </BrowserRouter>
  );
}

export default App;
