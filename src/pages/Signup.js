import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";

const Signup = ({ setConnected }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("data ==> ", username, email, password, newsletter);
    try {
      const { data } = await axios.post(
        "https://site--backend-vinted--97yqlpf4l44b.code.run/user/signup",
        {
          username: username,
          email: email,
          password: password,
          newsletter: newsletter,
        }
      );
      // console.log(response.data);
      Cookies.set("token", data.token, {
        expires: 1,
        sameSite: "strict",
      });
      setConnected(true);
      navigate("/");
    } catch (error) {
      console.log(error.response?.data.error.message);
      if (error.response.data.error.message === "Username missing") {
        setErrorMessage("Utilisateur non trouvé");
      } else {
        setErrorMessage("Une erreur est survenue, veuillez réessayer");
      }
      //   setErrorMessage();
      // }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>S'inscrire</h2>
      <input
        className="input-underline"
        name="username"
        id="username"
        type="text"
        placeholder="Nom d'utilisateur"
        value={username}
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />
      <input
        className="input-underline"
        type="email"
        name="email"
        id="email"
        placeholder="Email"
        value={email}
        onChange={(event) => {
          setEmail(event.target.value);
        }}
      />
      <input
        className="input-underline"
        type="password"
        name="password"
        id="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />
      <div className="checkbox">
        <input
          type="checkbox"
          name="newsletter"
          id="newsletter"
          value={newsletter}
          onChange={(event) => {
            setNewsletter(!newsletter);
          }}
        />
        <p>S'inscrire à notre newsletter</p>
      </div>
      <p className="texte">
        En m'inscrivant je confirme avoir lu et accepté les Termes & Conditions
        et Politique de Confidentialité de Vinted. Je confirme avoir au moins 18
        ans.
      </p>
      <button>S'inscrire</button>
      <p>{errorMessage}</p>
      <Link to="/login" style={{ textDecoration: "none" }}>
        <p className="compte">Tu as déjà un compte? connecte-toi!</p>
      </Link>
    </form>
  );
};

export default Signup;
