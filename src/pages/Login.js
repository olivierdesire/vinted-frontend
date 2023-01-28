import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ setToken, handleToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post(
        "https://site--backend-vinted--97yqlpf4l44b.code.run/user/login",
        {
          email: email,
          password: password,
        }
      );
      console.log(data);
      handleToken(data.token);
      navigate("/");
    } catch (error) {
      console.log(error.response?.data.error.message);
      if (error.response?.data.error.message === "Username missing") {
        setErrorMessage("Veuillez renseigner l'utilisateur");
      } else if (
        error.response?.data.error.message === "Email already has an account"
      ) {
        setErrorMessage("Utilisateur/Email déjà existant");
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
      <button>Se connecter</button>
      <p>{errorMessage}</p>
      <Link to="/signup" style={{ textDecoration: "none" }}>
        <p className="compte connect">Pas encore de compte? inscris-toi!</p>
      </Link>
    </form>
  );
};

export default Login;
