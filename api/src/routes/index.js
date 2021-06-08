const { Router } = require("express");
const { Raza, Temperamento, Dog } = require("../db");
const { Sequelize } = require("sequelize");
const axios = require("axios");
const { Op } = require("sequelize");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/dogs", async (req, res) => {
  const pageAsNumber = Number.parseInt(req.query.page);
  const sizeAsNumber = Number.parseInt(req.query.size);

  let page = 0;
  if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
    page = pageAsNumber;
  }
  let size = 8;
  if (!Number.isNaN(sizeAsNumber) && sizeAsNumber > 0 && sizeAsNumber < 8) {
    size = sizeAsNumber;
  }

  const raza = await Raza.findAndCountAll({
    include: [
      {
        model: Temperamento,
        required: true,
        attributes: ["nombre"],
        //group: ["temperamento.id", "temperamento.nombre"],
      },
    ],
    limit: size,
    offset: page * size,
    order: [["id"]], // ordenar por nombre luego
    attributes: ["id", "nombre", "imagen"],

    //group: ["raza.id", "raza.nombre", "raza.imagen"],
  });

  // Get all orders
  // const allOrders = await Order.findAll({
  //   // Group products by id
  //   attributes: [
  //       'id',
  //       'location',
  //       sequelize.literal('array_agg(products.id)')
  //   ],
  //   include: [{
  //       model: Product,
  //       as: 'products',
  //       required: false,
  //       attributes: ['id'],
  //       through: {
  //           model: ProductOrder,
  //           as: 'productOrders',
  //           attributes: [],
  //       }
  //   }]
  // });
  console.log(req.query.name);
  if (req.query.name) {
    const nameReq = await Raza.findAll({
      where: {
        nombre: {
          [Op.startsWith]: req.query.name.toLowerCase(),
        },
      },

      include: [
        {
          model: Temperamento,
          required: true,
          attributes: ["nombre"],
          //group: ["temperamento.id", "temperamento.nombre"],
        },
      ],
      limit: size,
      offset: page * size,
      order: [["id"]], // ordenar por nombre luego
      attributes: ["id", "nombre", "imagen"],
    });
    // const nameReq = await axios(
    //   `https://api.thedogapi.com/v1/breeds/search?q=${req.query.name}`
    // );
    // console.log(nameReq);
    return res.json(nameReq);
  }
  res.json(raza);

  //   SELECT "razas"."nombre","razas"."imagen",   array_agg("temperamentos"."nombre")
  // FROM public.razas
  //     INNER JOIN public.raza_temperamento
  // 	ON "razas"."id" = "raza_temperamento"."razaId"
  //    INNER JOIN public.temperamentos  ON "temperamentos"."id" = "raza_temperamento"."temperamentoId"
  // 	group by "razas"."nombre", "razas"."imagen"

  //   Zone.findAll({
  //     attributes: [[Sequelize.fn('array_agg', Sequelize.col('city')), 'zones']],
  //     where: { country: 'Canada' },
  //     group: ['country']
  //   })
});

module.exports = router;
