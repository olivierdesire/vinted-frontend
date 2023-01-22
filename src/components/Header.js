import Logo from "../assets/img/Vinted_logo.png";

const Header = () => {
  return (
    <header className="container">
      <img src={Logo} alt="Vinted" />{" "}
      <input placeholder="Que recherches-tu"></input>
      <div className="sign-up">
        <button>s'inscrire</button>
        <button>se connecter</button>
      </div>
      <button className="vint">vends tes articles</button>
    </header>
  );
};
export default Header;
