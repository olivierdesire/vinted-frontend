import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

const Checkoutform = ({ baseUrl, title, amount }) => {
  const stripe = useStripe();
  const elements = useElements();

  const clientUsername = Cookies.get("client-name");

  const [completed, setCompleted] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const cardElement = elements.getElement(CardElement);

    const stripeResponse = await stripe.createToken(cardElement, {
      name: clientUsername,
    });

    const stripeToken = stripeResponse.token.id;

    try {
      const response = await axios.post(`${baseUrl}/payment`, {
        token: stripeToken,
        title: title,
        amount: amount,
      });
      if (response.data.status === "succeeded") {
        setCompleted(true);
      }
    } catch (error) {
      setCompleted(false);
    }
  };

  return !completed ? (
    <div>
      <form className="pay-form" onSubmit={handleSubmit}>
        <div className="pay-input">
          <CardElement />
        </div>
        <button type="submit">Pay</button>
      </form>
    </div>
  ) : (
    <div>
      <p>Paiment effectué</p>
      <Link to="/">
        <button>Retourner à la page d'accueil</button>
      </Link>
    </div>
  );
};

export default Checkoutform;
