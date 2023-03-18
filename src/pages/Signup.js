import { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

const Signup = ({ handleToken, baseUrl, setVisible }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [preview, setPreview] = useState("");
  const [file, setFile] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("avatar", file);

      const { data } = await axios.post(
        `${baseUrl}/user/signup`,
        {
          username: username,
          email: email,
          password: password,
          newsletter: newsletter,
        },
        formData
      );

      handleToken(data.token);
      Cookies.set("Client-name", data.account.username);
      setVisible(null);

      navigate(location.pathname);
    } catch (error) {
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
      <div className="publish-photo">
        <div>
          <label htmlFor="file"> ✚ Avatar</label>
        </div>
        <input
          className="input-file"
          name="file"
          id="file"
          type="file"
          onChange={(event) => {
            setFile(event.target.files[0]);
            setPreview(URL.createObjectURL(event.target.files[0]));
          }}
        />
      </div>
      <div className="button-form">
        <button>S'inscrire</button>
      </div>
      <div className="sign-error">
        <p>{errorMessage}</p>
      </div>
      <button
        className="link-connect"
        onClick={() => {
          setVisible("login");
        }}
      >
        Tu as déjà un compte? connecte-toi!
      </button>
    </form>
  );
};

export default Signup;
