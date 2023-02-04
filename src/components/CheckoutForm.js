import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";

const Checkoutform = ({ baseUrl }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [completed, setCompleted] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const cardElement = elements.getElement(CardElement);

    const stripeResponse = await stripe.createToken(cardElement, {
      name: "id name",
    });

    console.log(stripeResponse);
    const stripeToken = stripeResponse.token.id;

    try {
      const response = await axios.post(`${baseUrl}/payment`, {
        token: stripeToken,
        // title: title,
        // amount: amount,
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
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
