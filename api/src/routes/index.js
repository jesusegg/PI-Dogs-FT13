const { Router } = require("express");
const { Raza, Temperamento } = require("../db");
const getDogs = require("./getDogs");
const getTemperamentos = require("./getTemperamentos");
const post = require("./posts");
const { dataCompleta } = require("../db_function/filtros");
const put = require("./put");
const Delete = require("./Delete");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();
router.use("/dogs", getDogs);
router.use("/temperament", getTemperamentos);
router.use("/dog", post);
router.use("/dog", put);
router.use("/dog", Delete);

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/", async (req, res) => {
  try {
    const JsonPrincipal = await dataCompleta();

    res.json(JsonPrincipal);
  } catch (error) {
    res.status(404).json("error en la base de datos");
  }
});

module.exports = router;
