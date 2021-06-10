const { Router } = require("express");
const { Raza, Temperamento } = require("../db");

const { filtroRazas, arrayApi } = require("../db_function/filtros");

const server = Router();

server.get("/", async (req, res) => {
  const array = await arrayApi();

  let arrayFiltro = [];

  array.map((x) => {
    arrayFiltro.push({
      id: x.id,
      nombre: x.nombre.toLowerCase(),
      imagen: x.imagen,
      temperamentos: x.temperamentos,
    });
  });

  let raza = await Raza.findAndCountAll({
    include: [
      {
        model: Temperamento,
        required: true,
        attributes: ["nombre"],
      },
    ],
    order: [["nombre"]],
    attributes: ["id", "nombre", "imagen"],
  });
  raza = filtroRazas(raza);

  const JsonPrincipal = [...arrayFiltro, ...raza];

  if (req.query.raza) {
    const filterByRaza = JsonPrincipal.filter((x) =>
      x.nombre.toLowerCase()?.includes(req.query.raza)
    );
    if (!filterByRaza.length) {
      return res.status(404).json("raza de perro no encontrada");
    } else {
      return res.json(filterByRaza.slice(0, 8));
    }
  }

  const pageCount = Math.ceil(JsonPrincipal.length / 8);
  let page = parseInt(req.query.page);
  if (!page) {
    page = 1;
  }
  if (page > pageCount) {
    page = pageCount;
  }

  res.json({
    page: page,
    pageCount: pageCount,
    posts: JsonPrincipal.slice(page * 8 - 8, page * 8),
  });
});

server.get("/:idRaza", async (req, res) => {
  const array = await arrayApi();

  const busquedaId = array.find((x) => x.id === parseInt(req.params.idRaza));

  const copiaBusqueda = { ...busquedaId };
  delete copiaBusqueda.id;
  console.log(copiaBusqueda);

  if (!busquedaId) {
    return res.status(404).json("Id ingresado no valido");
  }
  res.json(copiaBusqueda);
});

module.exports = server;
