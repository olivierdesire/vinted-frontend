import { useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const Publish = ({ baseUrl }) => {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState("");

  const token = Cookies.get("token");

  return token ? (
    <div className="publish">
      <form
        className="container"
        onSubmit={async (event) => {
          event.preventDefault();

          const formData = new FormData();
          formData.append("title", title);
          formData.append("description", description);
          formData.append("price", price);
          formData.append("condition", condition);
          formData.append("city", city);
          formData.append("brand", brand);
          formData.append("size", size);
          formData.append("color", color);
          formData.append("picture", file);

          try {
            const response = await axios.post(
              `${baseUrl}/offer/publish`,
              formData,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                  Authorization: "Bearer " + token,
                },
              }
            );
          } catch (error) {
            setError("Une erreur est survenue");
          }
        }}
      >
        <h3>Vends ton article</h3>
        <section className="part-publish">
          <div className="publish-photo">
            <div>
              <label htmlFor="file"> ✚ Ajouter une photo</label>
            </div>
            <input
              className="input-file"
              name="file"
              id="file"
              type="file"
              onChange={(event) => {
                setFile(event.target.files[0]);
              }}
            />
          </div>
        </section>
        <section className="part-publish">
          <div>
            <label htmlFor="title">Titre</label>
            <input
              className="input-publish"
              type="text"
              name="title"
              id="title"
              placeholder="ex: Chemise verte"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />
          </div>
          <p className="trait-publish"></p>
          <div>
            <label htmlFor="description">Décris ton article</label>
            <textarea
              className="input-publish"
              name="description"
              id="description"
              rows="5"
              value={description}
              placeholder="ex: porté quelque fois, taille correctement"
              onChange={(event) => {
                setDescription(event.target.value);
              }}
            ></textarea>
          </div>
        </section>
        <section className="part-publish">
          <div>
            <label htmlFor="brand">Marque</label>
            <input
              className="input-publish"
              type="text"
              name="brand"
              id="brand"
              placeholder="ex: Zara"
              value={brand}
              onChange={(event) => {
                setBrand(event.target.value);
              }}
            />
          </div>
          <p className="trait-publish"></p>
          <div>
            <label htmlFor="size">Taille</label>
            <input
              className="input-publish"
              type="text"
              name="size"
              id="size"
              placeholder="ex: L/40/12"
              value={size}
              onChange={(event) => {
                setSize(event.target.value);
              }}
            />
          </div>
          <p className="trait-publish"></p>
          <div>
            <label htmlFor="color">Couleur</label>
            <input
              className="input-publish"
              type="text"
              name="color"
              id="color"
              placeholder="ex: bleu"
              value={color}
              onChange={(event) => {
                setColor(event.target.value);
              }}
            />
          </div>
          <p className="trait-publish"></p>
          <div>
            <label htmlFor="condition">Etat</label>
            <input
              className="input-publish"
              type="text"
              name="condition"
              id="condition"
              placeholder="ex: Neuf avec étiquette"
              value={condition}
              onChange={(event) => {
                setCondition(event.target.value);
              }}
            />
          </div>
          <p className="trait-publish"></p>
          <div>
            <label htmlFor="city">Lieu</label>
            <input
              className="input-publish"
              type="text"
              name="city"
              id="city"
              placeholder="ex: Tours"
              value={city}
              onChange={(event) => {
                setCity(event.target.value);
              }}
            />
          </div>
        </section>
        <section className="part-publish">
          <div>
            <label htmlFor="price">Prix</label>
            <input
              className="input-publish"
              type="number"
              name="price"
              id="price"
              placeholder="ex: 0,00 €"
              value={price}
              onChange={(event) => {
                setPrice(event.target.value);
              }}
            />
          </div>
          <div className="part-publish">
            <label></label>
            <div className="checkbox-publish">
              <input type="checkbox" id="exchange" name="exchange" />
              <label className="info-publish" htmlFor="exchange">
                Je suis intéressé(e) par les échanges
              </label>
            </div>
          </div>
        </section>
        <div className="submit-publish">
          <button>Ajouter</button>
        </div>
        <p>{error}</p>
      </form>
    </div>
  ) : (
    <Navigate to="/login" state={{ from: "/publish" }} />
  );
};

export default Publish;
