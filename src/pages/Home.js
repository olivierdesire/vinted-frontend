import Hero from "../assets/img/hero.jpg";
import axios from "axios";
import { useState, useEffect } from "react";
import Offers from "../components/Offers";
import { useNavigate } from "react-router-dom";

const Home = ({ search, priceAsc, priceDesc, page, baseUrl, priceRange }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      let filter = "";
      if (search) {
        filter = "?title=" + search;
      }
      if (priceRange[0]) {
        if (filter) {
          filter = filter + "&priceMin=" + priceRange[0];
        } else {
          filter = "?priceMin=" + priceRange[0];
        }
      }
      if (priceRange[1]) {
        if (filter) {
          filter = filter + "&priceMax=" + priceRange[1];
        } else {
          filter = "?priceMax=" + priceRange[1];
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
      if (page) {
        if (filter) {
          filter = filter + "&page=" + page + "&limit=10";
        } else {
          filter = "?page=" + page + "&limit=10";
        }
      }
      const response = await axios.get(`${baseUrl}/offers${filter}`);
      setData(response.data);
      setIsLoading(false);
    };

    fetchData();
  }, [search, priceAsc, priceDesc, page, baseUrl, priceRange]);
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
