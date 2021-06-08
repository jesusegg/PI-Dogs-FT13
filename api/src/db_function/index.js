const axios = require("axios");
const { Raza, Temperamento } = require("../db");

module.exports = async function fulldb() {
  let api = await axios.get(" https://api.thedogapi.com/v1/breeds");

  let temperamentos = api.data.map((x) => x.temperament);
  temperamentos = temperamentos.join().split(",");

  temperamentos = temperamentos.map((x) => x.trim());
  var arrayTemperamentos = new Set(temperamentos);
  arrayTemperamentos = [...arrayTemperamentos];

  await arrayTemperamentos.map((x) => {
    Temperamento.create({
      nombre: x,
    });
  });

  api.data.map(async (x) => {
    const raza = await Raza.create({
      nombre: x.name.toLowerCase(),
      peso: x.weight.metric,
      altura: x.height.metric,
      años_de_vida: x.life_span,
      imagen: x.image.url,
    });
    if (x.temperament) {
      array = x.temperament.split(",").map((x) => x.trim());
      const tempx = await Temperamento.findAll({
        where: {
          nombre: array,
        },
      });
      raza.setTemperamentos(tempx);
    }
  });
};
