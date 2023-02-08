import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const Offer = ({ baseUrl }) => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${baseUrl}/offer/${id}`);
      setData(response.data);
      setIsLoading(false);
    };

    fetchData();
  }, [id, baseUrl]);

  return isLoading ? (
    <p> Downloading ... </p>
  ) : (
    <section className="product">
      <img src={data.product_image.secure_url} alt="pic" />
      <div className="offer-description">
        <p className="offer-price">{data.product_price} €</p>
        {data.product_details.map((element, index) => {
          return (
            <div key={index} className="offer-detail">
              <p className="key">{Object.keys(element)[0]}</p>
              <p className="value">{element[Object.keys(element)[0]]}</p>
            </div>
          );
        })}
        <p className="trait"></p>
        <div className="title">
          <p>{data.product_name}</p>
          <p>{data.product_description}</p>
          <div className="avatar">
            <img src={data.owner.account.avatar?.secure_url} alt="avatar" />
            <p>{data.owner.account.username}</p>
          </div>
        </div>
        <div className="button-pay">
          <Link
            to="/payment"
            state={{
              title: data.product_name,
              price: data.product_price,
              id: id,
            }}
          >
            <button> Acheter </button>
          </Link>
        </div>
      </div>
    </section>
  );
};
export default Offer;
