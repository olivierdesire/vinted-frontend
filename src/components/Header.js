import Logo from "../assets/img/Vinted_logo.png";
import { Link, useNavigate, useLocation } from "react-router-dom";

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
  page,
  setPage,
  visible,
  setVisible,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
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
          <p className="text-page">page:</p>
          <button
            className={page > 1 ? "page visible" : "page hidden"}
            onClick={() => {
              console.log(page);
              setPage(page - 1);
            }}
          >
            ≪
          </button>
          <button
            className="page"
            onClick={() => {
              console.log(page);
              setPage(page + 1);
            }}
          >
            ≫
          </button>
        </div>
      </div>

      {token ? (
        <div className="sign-up">
          <button
            onClick={() => {
              handleToken(null);
              console.log(location.pathname);
              if (location.pathname === "/publish") {
                navigate("/");
              }
            }}
          >
            se déconnecter
          </button>
        </div>
      ) : (
        <div className="sign-up">
          {/* <Link to="/signup"> */}
          <button onClick={() => setVisible("signup")}>s'inscrire</button>
          {/* </Link> */}
          {/* <Link to="/login"> */}
          <button onClick={() => setVisible("login")}>se connecter</button>
          {/* </Link> */}
        </div>
      )}
      <Link to="/publish">
        <button className="vint">vends tes articles</button>
      </Link>
    </header>
  );
};
export default Header;
