import Hero from "../assets/img/hero.jpg";
import axios from "axios";
import { useState, useEffect } from "react";
import Offers from "../components/Offers";

const Home = () => {
  const [data, setData] = useState(null);
  const [isLooding, setIsLoading] = useState(true);

  const fetchData = async () => {
    const response = await axios.get(
      " https://lereacteur-vinted-api.herokuapp.com/offers"
    );
    setData(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <section className="hero">
        <img src={Hero} alt="Hero" />
        <div className="hero-block"></div>
      </section>
      {isLooding ? <p> Downloading ... </p> : <Offers data={data} />}
    </div>
  );
};
export default Home;
