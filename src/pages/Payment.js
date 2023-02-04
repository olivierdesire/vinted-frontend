import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Checkoutform from "../components/CheckoutForm";

const stripPromise = loadStripe(
  "pk_test_51HCObyDVswqktOkX6VVcoA7V2sjOJCUB4FBt3EOiAdSz5vWudpWxwcSY8z2feWXBq6lwMgAb5IVZZ1p84ntLq03H00LDVc2RwP"
);

const Payment = ({ baseUrl }) => {
  return (
    <div className="payment">
      <div className="form-payment">
        <p>Résumé de la commande</p>
        <p>Commande</p>
        <p>Frais protection acheteurs</p>
        <p>Frais de port</p>
        <p></p>
        <p>Total</p>
        <p>
          Il ne vous reste oplus qu'une étape pour vous offrir<span></span>.
          Vous allez payer <span></span> (frais de protection et frais de port
          inclus)
        </p>
        <p></p>
        <Elements stripe={stripPromise}>
          <Checkoutform baseUrl={baseUrl} />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
