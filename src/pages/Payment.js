import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Checkoutform from "../components/CheckoutForm";
import { useLocation } from "react-router-dom";

const stripPromise = loadStripe(
  "pk_test_51HCObyDVswqktOkX6VVcoA7V2sjOJCUB4FBt3EOiAdSz5vWudpWxwcSY8z2feWXBq6lwMgAb5IVZZ1p84ntLq03H00LDVc2RwP"
);

const Payment = ({ baseUrl }) => {
  const location = useLocation();
  const { title } = location.state;
  const { price } = location.state;
  const { username } = location.state;
  const amount = price + 0.4 + 0.8;

  return (
    <div className="payment">
      <div className="div-payment">
        <p className="ref-cde">Résumé de la commande</p>
        <div>
          <p>Commande</p>
          <p>{Number.parseFloat(price).toFixed(2)} €</p>
        </div>
        <div>
          <p>Frais protection acheteurs</p>
          <p>0.40 €</p>
        </div>
        <div>
          <p>Frais de port</p>
          <p>0.80 €</p>
        </div>
        <p className="trait"></p>
        <div id="total">
          <p>Total</p>
          <p>{Number.parseFloat(amount).toFixed(2)} €</p>
        </div>
        <p className="payment-text">
          Il ne vous reste oplus qu'une étape pour vous offrir
          <span> {title} </span>. Vous allez payer{" "}
          <span>{Number.parseFloat(amount).toFixed(2)} €</span> (frais de
          protection et frais de port inclus)
        </p>
        <p className="trait-payment"></p>
        <Elements stripe={stripPromise}>
          <Checkoutform
            baseUrl={baseUrl}
            title={title}
            amount={amount}
            username={username}
          />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
