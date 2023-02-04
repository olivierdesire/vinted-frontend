import Logo from "../assets/img/Vinted_logo.png";
import { Link, useNavigate } from "react-router-dom";

const Header = ({
  token,
  handleToken,
  search,
  setSearch,
  priceMin,
  setPriceMin,
  priceMax,
  setPriceMax,
  setPriceAsc,
  setPriceDesc,
}) => {
  const navigate = useNavigate;
  return (
    <header className="container">
      <Link to="/">
        <img src={Logo} alt="Vinted" />
      </Link>
      <div>
        <input
          className="search-bar"
          placeholder="Que recherches-tu"
          name="search"
          id="search"
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
          }}
        />
        <div className="search">
          <p>Prix entre</p>
          <input
            type="number"
            name="price-min"
            id="price-min"
            value={priceMin}
            placeholder="prix min"
            onChange={(event) => {
              setPriceMin(event.target.value);
            }}
          />
          <p>€ et</p>
          <input
            type="number"
            name="price-max"
            id="price-max"
            value={priceMax}
            placeholder="prix max"
            onChange={(event) => {
              setPriceMax(event.target.value);
            }}
          />
          <p>€</p>
          <button
            className="price-order"
            onClick={() => {
              setPriceDesc(true);
              setPriceAsc(false);
            }}
          >
            Prix ↘️
          </button>
          <button
            className="price-order"
            onClick={() => {
              setPriceAsc(true);
              setPriceDesc(false);
            }}
          >
            Prix ↗️
          </button>
        </div>
      </div>

      {token ? (
        <div className="sign-up">
          <button
            onClick={() => {
              handleToken(null);
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
      <Link to="/Publish">
        <button className="vint">vends tes articles</button>
      </Link>
    </header>
  );
};
export default Header;
