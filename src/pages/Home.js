import Hero from "../assets/img/hero.jpg";
import axios from "axios";
import { useState, useEffect } from "react";
import Offers from "../components/Offers";
import { useNavigate } from "react-router-dom";

const Home = ({ search, priceMin, priceMax, priceAsc, priceDesc, baseUrl }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      let filter = "";
      if (search) {
        filter = "?title=" + search;
      }
      if (priceMin) {
        if (filter) {
          filter = filter + "&priceMin=" + priceMin;
        } else {
          filter = "?priceMin=" + priceMin;
        }
      }
      if (priceMax) {
        if (filter) {
          filter = filter + "&priceMax=" + priceMax;
        } else {
          filter = "?priceMin=" + priceMax;
        }
      }
      if (priceAsc) {
        if (filter) {
          filter = filter + "&sort=price-asc";
        } else {
          filter = "?sort=price-asc";
        }
      }
      if (priceDesc) {
        if (filter) {
          filter = filter + "&sort=price-desc";
        } else {
          filter = "?sort=price-desc";
        }
      }
      const response = await axios.get(`${baseUrl}/offers${filter}`);
      setData(response.data);
      setIsLoading(false);
    };

    fetchData();
  }, [search, priceMin, priceMax, priceAsc, priceDesc, baseUrl]);
  return (
    <div>
      <section className="hero">
        <img src={Hero} alt="Hero" />
        <div className="hero-block">
          <h1>Prêts à faire du tri dans vos placards ?</h1>
          <button
            onClick={(event) => {
              event.preventDefault();
              navigate("/publish");
            }}
          >
            Commencer à vendre
          </button>
        </div>
      </section>
      {isLoading ? <p> Downloading ... </p> : <Offers data={data} />}
    </div>
  );
};
export default Home;
