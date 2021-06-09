const { Router } = require("express");
const { Raza, Temperamento } = require("../db");
const get = require("./get");
const post = require("./posts");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();
router.use(get);
router.use(post);
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;
