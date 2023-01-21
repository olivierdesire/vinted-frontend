import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Header from "./components/Header";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/offers" element={<Home />} />
        <Route path="/offer/:id" element={<Offer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
