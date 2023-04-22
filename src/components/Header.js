import Logo from "../assets/img/Vinted_logo.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Range } from "react-range";

const Header = ({
  token,
  handleToken,
  search,
  setSearch,
  setPriceAsc,
  setPriceDesc,
  page,
  setPage,
  setVisible,
  priceRange,
  setPriceRange,
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
          <Range
            step={1}
            min={0}
            max={500}
            values={priceRange}
            onChange={(values) => {
              // console.log(values);
              return setPriceRange(values);
            }}
            renderTrack={({ props, children }) => {
              // console.log(children);
              return (
                <div
                  {...props}
                  style={{
                    ...props.style,
                    height: "4px",
                    width: "150px",
                    backgroundColor: "#00b4d8",
                  }}
                >
                  {children}
                </div>
              );
            }}
            renderThumb={({ props }) => {
              // console.log(props);
              return (
                <div
                  {...props}
                  style={{
                    ...props.style,
                    height: "12px",
                    width: "12px",
                    borderRadius: "50%",
                    backgroundColor: "#00b4d8",
                    display: "flex",
                    justifyContent: "center",
                    outline: "none",
                  }}
                >
                  <p className="price-thumb">{priceRange[props.key] + " €"}</p>
                </div>
              );
            }}
          />
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
              setPage(page - 1);
            }}
          >
            ≪
          </button>
          <p>{page}</p>
          <button
            className="page"
            onClick={() => {
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
