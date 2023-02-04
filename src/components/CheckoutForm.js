import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

const Checkoutform = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [completed, setCompleted] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const cardElement = elements.getElement(CardElement);

    console.log(cardElement);

    const stripeResponse = await stripe.createToken(cardElement, {
      name: "id de l'acheteur",
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement />
        <button type="submit">Pay</button>
      </form>
    </div>
  );
};

export default Checkoutform;
