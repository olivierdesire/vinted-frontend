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

  return isLoading ? (
    <p> Downloading ... </p>
  ) : (
    <section>
      <img src={data.product_pictures[0].url} alt="pic" />
      <div>
        <p>{data.product_price}</p>
        {data.product_details[0].MARQUE && (
          <div>
            <p>MARQUE</p>
            <p>{data.product_details[0].MARQUE}</p>
          </div>
        )}
        {data.product_details[1].TAILLE && (
          <div>
            <p>TAILLE</p>
            <p>{data.product_details[1].TAILLE}</p>
          </div>
        )}
        {data.product_details[1].ÉTAT && (
          <div>
            <p>ETAT</p>
            <p>{data.product_details[1].ÉTAT}</p>
          </div>
        )}
        {data.product_details[0].COULEUR && (
          <div>
            <p>COULEUR</p>
            <p>{data.product_details[0].COULEUR}</p>
          </div>
        )}
        {data.product_details[0].EMPLACEMENT && (
          <div>
            <p>EMPLACEMENT</p>
            <p>{data.product_details[0].EMPLACEMENT}</p>
          </div>
        )}
        <p></p>
        <div>
          <p>{data.product_name}</p>
          <p>{data.product_description}</p>
        </div>
      </div>
    </section>
  );
};
export default Offer;
