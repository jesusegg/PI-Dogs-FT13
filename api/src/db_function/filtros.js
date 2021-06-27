const axios = require("axios");
const { Temperamento, Raza } = require("../db");

const filtroRazas = function (busqueda) {
  const objOrdenado = [];
  busqueda.rows.map((x) => {
    objOrdenado.push({
      id: x.id,
      nombre: x.nombre,
      imagen: x.imagen,
      peso: x.peso,
      temperamentos: x.temperamentos.map((y) => y.dataValues.nombre),
    });
  });
  return objOrdenado;
};
const filtroRazasCompletas = function (busqueda) {
  const objOrdenado = [];
  busqueda.rows.map((x) => {
    objOrdenado.push({
      id: x.id,
      nombre: x.nombre,
      peso: x.peso,
      altura: x.altura,
      años_de_vida: x.años_de_vida,
      imagen: x.imagen,
      temperamentos: x.temperamentos.map((y) => y.dataValues.nombre),
    });
  });
  return objOrdenado;
};

const arrayApi = async function () {
  let arrayApi = [];
  const api = await axios.get("https://api.thedogapi.com/v1/breeds");

  api.data.map((x) => {
    var arrayTemp = x.temperament;
    if (arrayTemp) {
      arrayTemp = arrayTemp.split(",");
    }

    arrayApi.push({
      id: x.id,
      nombre: x.name.toLowerCase(),
      peso: x.weight.metric,
      altura: x.height.metric,
      años_de_vida: x.life_span,
      imagen: x.image.url,
      temperamentos: arrayTemp,
    });
  });
  return arrayApi;
};

const dataCompleta = async function () {
  const array = await arrayApi();

  let raza = await Raza.findAndCountAll({
    include: [
      {
        model: Temperamento,
        required: true,
        attributes: ["nombre"],
      },
    ],
    order: [["nombre"]],
  });
  raza = filtroRazasCompletas(raza);
  const JsonPrincipal = [...array, ...raza];
  return JsonPrincipal;
};
const paginado = function (req, res, data) {
  const pageCount = Math.ceil(data.length / 8);
  let page = parseInt(req.query.page);
  if (!page) {
    page = 1;
  }
  if (page > pageCount) {
    page = pageCount;
  }

  return res.json({
    page: page,
    pageCount: pageCount,
    posts: data.slice(page * 8 - 8, page * 8),
  });
};
const ordenDescendente = function (data) {
  data.sort(function (a, b) {
    if (b.nombre > a.nombre) {
      return 1;
    }
    if (b.nombre < a.nombre) {
      return -1;
    }
    return 0;
  });
};
const ordenPeso = function (req, data) {
  data.forEach((x) => (x.peso = x.peso.split("-").map((y) => parseInt(y))));
  // http://localhost:3001/dogs/?page=2&peso=Asc ruta para orden peso y paginado
  // http://localhost:3001/dogs/?page=2&peso=Des ruta para orden peso y paginado

  if (req.query.peso === "Asc") {
    data.sort(function (a, b) {
      return a.peso[0] - b.peso[0];
    });
    data.forEach(
      (x) =>
        (x.peso = `${x.peso[0]} -  ${x.peso[1] ? x.peso[1] : x.peso[0] + 1}`)
    );
  }
  if (req.query.peso === "Des") {
    data.sort(function (a, b) {
      return b.peso[0] - a.peso[0];
    });
    data.forEach(
      (x) =>
        (x.peso = `${x.peso[0]} - ${x.peso[1] ? x.peso[1] : x.peso[0] + 1}`)
    );
  }
};

module.exports = {
  filtroRazas,
  filtroRazasCompletas,
  arrayApi,
  dataCompleta,
  paginado,
  ordenDescendente,
  ordenPeso,
};
