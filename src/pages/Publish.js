import { useState } from "react";
import axios from "axios";

const Publish = ({ token }) => {
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

  return (
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

          for (let pair of formData.entries()) {
            console.log("clef --> :" + pair[0] + "//// value =>" + pair[1]);
          }

          try {
            const response = await axios.post(
              "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
              formData,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                  Authorization: "Bearer " + token,
                },
              }
            );
            console.log(response.data);
          } catch (error) {
            console.log(error.response);
            setError("Une erreur est survenue");
          }
        }}
      >
        <h3>Vends ton article</h3>
        <section className="part-publish">
          <div className="publish-photo">
            <input
              type="file"
              onChange={(event) => {
                setFile(event.target.files[0]);
              }}
            />
          </div>
        </section>
        <section className="part-publish">
          <label htmlFor="title">Titre</label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="ex: Chemise verte"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
          <p className="trait-publish"></p>
          <label htmlFor="description">Description</label>
          <input
            type="text"
            name="description"
            id="description"
            placeholder="ex: porté quelque fois, taille correctement"
            value={description}
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          />
        </section>
        <section className="part-publish">
          <label htmlFor="brand">Marque</label>
          <input
            type="text"
            name="brand"
            id="brand"
            placeholder="ex: Zara"
            value={brand}
            onChange={(event) => {
              setBrand(event.target.value);
            }}
          />
          <p className="trait-publish"></p>
          <label htmlFor="size">Taille</label>
          <input
            type="text"
            name="size"
            id="size"
            placeholder="ex: L/40/12"
            value={size}
            onChange={(event) => {
              setSize(event.target.value);
            }}
          />
          <p className="trait-publish"></p>
          <label htmlFor="color">Couleur</label>
          <input
            type="text"
            name="color"
            id="color"
            placeholder="ex: bleu"
            value={color}
            onChange={(event) => {
              setColor(event.target.value);
            }}
          />
          <p className="trait-publish"></p>
          <label htmlFor="condition">Etat</label>
          <input
            type="text"
            name="condition"
            id="condition"
            placeholder="ex: Neuf avec étiquette"
            value={condition}
            onChange={(event) => {
              setCondition(event.target.value);
            }}
          />
          <p className="trait-publish"></p>
          <label htmlFor="city">Lieu</label>
          <input
            type="text"
            name="city"
            id="city"
            placeholder="ex: Tours"
            value={city}
            onChange={(event) => {
              setCity(event.target.value);
            }}
          />
        </section>
        <section className="part-publish">
          <label htmlFor="price">Prix</label>
          <input
            type="number"
            name="price"
            id="price"
            placeholder="ex: 0,00 €"
            value={price}
            onChange={(event) => {
              setPrice(event.target.value);
            }}
          />
          <input type="checkbox" />
        </section>

        <button>Ajouter</button>
        <p>{error}</p>
      </form>
    </div>
  );
};

export default Publish;
