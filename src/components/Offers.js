import { Link } from "react-router-dom";

const Offers = ({ data }) => {
  return (
    <section className="container list-offers">
      {data.offers.map((element, index) => {
        return (
          <div key={index}>
            {element.owner && (
              <div className="offer">
                <div className="avatar">
                  <img src={element.owner.account.avatar.url} alt="url-owner" />
                  <p>{element.owner.account.username}</p>
                </div>
                <Link to={`/offer/${element._id}`} target="_blank">
                  <img
                    src={element.product_pictures[0].url}
                    alt="url-product"
                  />
                </Link>
                <span>{element.product_price} €</span>
                <p>{element.product_details[0].TAILLE} </p>
                <p>{element.product_details[0].MARQUE} </p>
              </div>
            )}
          </div>
        );
      })}
    </section>
  );
};
export default Offers;
