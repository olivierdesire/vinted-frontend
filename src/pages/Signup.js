import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(true);
  const [isValidUsername, setIsValidUsername] = useState(true);

  const navigate = useNavigate();

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        console.log("data ==> ", username, email, password, newsletter);
        try {
          const response = await axios.post(
            "https://site--backend-vinted--97yqlpf4l44b.code.run/user/signup",
            {
              username: username,
              email: email,
              password: password,
              newsletter: newsletter,
            }
          );
          // console.log(response.data);
          Cookies.set("token", response.data.token);
          navigate("/");
        } catch (error) {
          console.log(error.response.status);
          if (error.response.status === 409) {
            setIsValidUsername(false);
          }
        }
      }}
    >
      <h2>S'inscrire</h2>
      <input
        type="text"
        placeholder="Nom d'utilisateur"
        value={username}
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(event) => {
          setEmail(event.target.value);
        }}
      />
      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />
      <div className="checkbox">
        <input
          type="checkbox"
          value={newsletter}
          onChange={(event) => {
            setNewsletter(event.target.value);
          }}
        />
        <p>S'inscrire à notre newsletter</p>
      </div>
      <p>
        En m'inscrivant je confiormeravoir le et accepté les Termes & Coniditons
        et Politique de Confidentialité deVinted. Je confirme avoir au moins
        18ans.
      </p>
      <button>S'inscrire</button>
      <p className={isValidUsername ? "hidden" : "visible"}>
        Saisie username/email incorrecte
      </p>
    </form>
  );
};

export default Signup;
