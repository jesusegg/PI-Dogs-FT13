const { Router } = require("express");
const { Raza, Temperamento } = require("../db");
const getDogs = require("./getDogs");
const getTemperamentos = require("./getTemperamentos");
const post = require("./posts");
const { arrayApi, filtroRazasCompletas } = require("../db_function/filtros");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();
router.use("/dogs", getDogs);
router.use("/temperament", getTemperamentos);
router.use("/dog", post);
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/", async (req, res) => {
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

  res.json(JsonPrincipal);
});

module.exports = router;
