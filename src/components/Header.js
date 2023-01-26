import Logo from "../assets/img/Vinted_logo.png";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

const Header = ({ connected, setConnected }) => {
  return (
    <header className="container">
      <Link to="/">
        <img src={Logo} alt="Vinted" />{" "}
      </Link>
      <input placeholder="Que recherches-tu"></input>
      {connected ? (
        <div className="sign-up">
          <button
            onClick={() => {
              setConnected(false);
              Cookies.remove("token");
            }}
          >
            se déconnecter
          </button>
        </div>
      ) : (
        <div className="sign-up">
          <Link to="/signup">
            <button>s'inscrire</button>
          </Link>
          <Link to="/login">
            <button>se connecter</button>
          </Link>
        </div>
      )}
      <button className="vint">vends tes articles</button>
    </header>
  );
};
export default Header;
