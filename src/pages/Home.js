import Hero from "../assets/img/hero.jpg";
import axios from "axios";
import { useState, useEffect } from "react";
import Offers from "../components/Offers";

const Home = ({ filters }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      let filter = "";
      console.log(filters);
      filters.map((element, index) => {
        if (!filter) {
          return (filter =
            "?" +
            Object.keys(element)[0] +
            "=" +
            element[Object.keys(element)[0]]);
        } else {
          return (filter =
            filter +
            "&" +
            Object.keys(element)[0] +
            "=" +
            element[Object.keys(element)[0]]);
        }
      });
      console.log(filter);
      const response = await axios.get(
        `https://lereacteur-vinted-api.herokuapp.com/offers${filter}`
      );
      setData(response.data);
      setIsLoading(false);
    };

    fetchData();
  }, [filters]);
  return (
    <div>
      <section className="hero">
        <img src={Hero} alt="Hero" />
        <div className="hero-block">
          <h1>Prêts à faire du tri dans vos placards ?</h1>
          <button>Commencer à vendre</button>
        </div>
      </section>
      {isLoading ? <p> Downloading ... </p> : <Offers data={data} />}
    </div>
  );
};
export default Home;
