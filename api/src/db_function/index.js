const axios = require("axios");
const { Raza, Temperamento } = require("../db.js");
// const { conn } = require("../db.js");

// console.log(conn);

module.exports = async function fulldb() {
  const api = await axios.get("https://api.thedogapi.com/v1/breeds");

  Promise.all(
    api.data.map((x) => {
      //console.log(x.temperament);
      Raza.create({
        id: x.id,
        name: x.name,
        weight: x.weight.metric,
        height: x.height.metric,
        life_span: x.life_span,
        imagen: x.image.url,
      });
      Temperamento.create({
        temperament: x.temperament,
      });
    })
  ).then((res) => {
    console.log("models precargadas");
  });
  // console.log(temperamentos);
};
