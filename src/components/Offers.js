import { Link } from "react-router-dom";

const Offers = ({ data }) => {
  return (
    <section className="container list-offers">
      {data.offers.map((offer, index) => {
        return (
          <Link
            to={`/offer/${offer._id}`}
            style={{ textDecoration: "none", color: "black" }}
            key={offer._id}
          >
            <div>
              {offer.owner && (
                <div className="offer">
                  <div className="avatar">
                    <img
                      src={offer.owner.account.avatar.secure_url}
                      alt="url-owner"
                    />
                    <p>{offer.owner.account.username}</p>
                  </div>
                  {/* <Link to={`/offer/${offer._id}`} target="_blank"> */}
                  <img src={offer.product_image.secure_url} alt="url-product" />
                  {/* </Link> */}
                  <span>{offer.product_price} €</span>
                  {offer.product_details.map((element, index) => {
                    return (
                      element.TAILLE && <p key={index}>{element.TAILLE} </p>
                    );
                  })}
                  {offer.product_details.map((element, index) => {
                    return (
                      element.MARQUE && <p key={index}>{element.MARQUE} </p>
                    );
                  })}
                </div>
              )}
            </div>
          </Link>
        );
      })}
    </section>
  );
};
export default Offers;
