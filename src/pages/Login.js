import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Login = ({ setConnected }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //const [isValidUsername, setIsValidUsername] = useState(true);

  const navigate = useNavigate();

  return (
    <form
      onSubmit={async (event) => {
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
          console.log(error);
          if (error === 401) {
            // setIsValidUsername(false);
          }
        }
      }}
    >
      <p>Se connecter</p>
      <input
        type="email"
        placeholder="Adresse email"
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
      <button>Se connecter</button>
      {/* <p className={isValidUsername ? "hidden" : "visible"}>
        Saisie username/email incorrecte
      </p> */}
    </form>
  );
};

export default Login;
