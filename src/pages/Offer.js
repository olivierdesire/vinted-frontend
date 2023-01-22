import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const Offer = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
      );
      setData(response.data);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  // Récupération des objets products.
  const tabKeys = [];
  const tabValues = [];
  if (!isLoading) {
    for (let i = 0; i < data.product_details.length; i++) {
      const keys = Object.keys(data.product_details[i]);
      const values = Object.values(data.product_details[i]);
      tabKeys.push(keys[0]);
      tabValues.push(values[0]);
    }
    console.log(tabKeys);
    console.log(tabValues);
  }

  return isLoading ? (
    <p> Downloading ... </p>
  ) : (
    <section className="product">
      <img src={data.product_pictures[0].url} alt="pic" />
      <div className="offer-description">
        <p className="offer-price">{data.product_price} €</p>
        {tabKeys.map((element, index) => {
          // console.log(tabKeys[index]);
          // console.log(tabKeys[index]);
          return (
            <div key={index} className="offer-detail">
              <p className="key">{tabKeys[index]}</p>
              <p className="value">{tabValues[index]}</p>
            </div>
          );
        })}
        <p className="trait"></p>
        <div className="title">
          <p>{data.product_name}</p>
          <p>{data.product_description}</p>
          <div className="avatar">
            <img src={data.owner.account.avatar.url} alt="avatar" />
            <p>{data.owner.account.username}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Offer;
