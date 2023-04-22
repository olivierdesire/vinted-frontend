import { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

const Login = ({ handleToken, baseUrl, setVisible }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post(`${baseUrl}/user/login`, {
        email: email,
        password: password,
      });
      handleToken(data.token);
      Cookies.set("Client-name", data.account.username);
      setErrorMessage("");
      setVisible(null);
      navigate(location.pathname);
    } catch (error) {
      console.log(error.response?.data.error.message);
      if (error.response?.data.error.message === "Username missing") {
        setErrorMessage("Veuillez renseigner l'utilisateur");
      } else {
        setErrorMessage("Une erreur est survenue, veuillez réessayer");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Se connecter</h2>
      <input
        className="input-underline"
        type="email"
        email="email"
        id="email"
        placeholder="Adresse email"
        value={email}
        onChange={(event) => {
          setEmail(event.target.value);
        }}
      />
      <input
        className="input-underline"
        type="password"
        email="password"
        id="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />
      <div className="button-form">
        <button>Se connecter</button>
      </div>
      <p>{errorMessage}</p>
      <button
        className="link-connect"
        onClick={() => {
          setVisible("signup");
        }}
      >
        Pas encore de compte? inscris-toi!
      </button>
    </form>
  );
};

export default Login;
