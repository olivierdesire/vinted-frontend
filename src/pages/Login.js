import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ setConnected }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://site--backend-vinted--97yqlpf4l44b.code.run/user/login",
        {
          email: email,
          password: password,
        }
      );
      console.log(response.data);
      Cookies.set("token", response.data.token);
      setConnected(true);
      navigate("/");
    } catch (error) {
      console.log(error.response.status);
      if (error.response.status === 401) {
        navigate("/signup");
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
      <Link to="/signup" style={{ textDecoration: "none" }}>
        <p className="compte connect">Pas encore de compte? inscris-toi!</p>
      </Link>
    </form>
  );
};

export default Login;
