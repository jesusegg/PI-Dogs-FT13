const { Router } = require("express");
const { Raza, Temperamento } = require("../db");
const getDogs = require("./getDogs");
const getTemperamentos = require("./getTemperamentos");
const post = require("./posts");
const {
  arrayApi,
  filtroRazasCompletas,
  dataCompleta,
} = require("../db_function/filtros");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();
router.use("/dogs", getDogs);
router.use("/temperament", getTemperamentos);
router.use("/dog", post);

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/", async (req, res) => {
  const JsonPrincipal = await dataCompleta();

  res.json(JsonPrincipal);
});

module.exports = router;
