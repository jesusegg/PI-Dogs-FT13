const axios = require("axios");
let temperamento;

async function temperament() {
  try {
    temperamento = await axios.get(" https://api.thedogapi.com/v1/breeds");
    // console.log(temperamento.data);
    var v = temperamento.data.map((x) => x.temperament);
    // console.log(v, "vvvvvvvvv");
    // var j = new Set(v);
    v = v.join();
    // console.log(v);
    v = v.split(",");

    v = v.map((x) => x.trim());
    console.log(v[2]);
    var j = new Set(v);
    j = [...j];
    console.log(j);
    arrayTemperamentos = j;
  } catch (error) {
    console.log(error);
  }
}
let arrayTemperamentos;

temperament();
console.log(arrayTemperamentos);
