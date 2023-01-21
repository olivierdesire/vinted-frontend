import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const Offer = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [isLooding, setIsLoading] = useState(true);

  const fetchData = async () => {
    const response = await axios.get(
      `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
    );
    setData(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return isLooding ? (
    <p> Downloading ... </p>
  ) : (
    <section>
      <img src={data.product_pictures.url} alt="" />
      <div></div>
    </section>
  );
};
export default Offer;
