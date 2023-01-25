import Logo from "../assets/img/Vinted_logo.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="container">
      <Link to="/">
        <img src={Logo} alt="Vinted" />{" "}
      </Link>
      <input placeholder="Que recherches-tu"></input>
      <div className="sign-up">
        <Link to="/signup">
          <button>s'inscrire</button>
        </Link>
        <button>se connecter</button>
      </div>
      <button className="vint">vends tes articles</button>
    </header>
  );
};
export default Header;
