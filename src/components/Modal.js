import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

const Modal = ({ visible, setVisible, handleToken }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <div
      className="modal-root"
      onClick={() => {
        if (location.pathname === "/publish") {
          setErrorMessage("Page publication indisponible sans être connecté !");
        } else {
          setVisible(null);
        }
      }}
    >
      <div
        className="modal"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <button
          onClick={() => {
            if (location.pathname === "/publish") {
              navigate("/");
              setVisible(null);
            } else {
              setVisible(null);
            }
          }}
        >
          X
        </button>
        {visible === "signup" ? (
          <Signup setVisible={setVisible} handleToken={handleToken} />
        ) : (
          <Login setVisible={setVisible} handleToken={handleToken} />
        )}
        {errorMessage && (
          <div>
            <p>{errorMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
