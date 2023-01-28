import Logo from "../assets/img/Vinted_logo.png";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Header = ({ token, setToken }) => {
  const navigate = useNavigate();
  return (
    <header className="container">
      <Link to="/">
        <img src={Logo} alt="Vinted" />
      </Link>
      <input placeholder="Que recherches-tu"></input>
      {token ? (
        <div className="sign-up">
          <button
            onClick={() => {
              setToken(null);
              Cookies.remove("token");
              navigate("/");
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
