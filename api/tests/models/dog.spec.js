const { Dog, Raza, conn } = require("../../src/db.js");
const { expect } = require("chai");

describe("Dog model", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  describe("Validators", () => {
    beforeEach(() => Raza.sync({ force: true }));
    describe("name", () => {
      it("should throw an error if name is null", (done) => {
        Raza.create({})
          .then(() => done(new Error("It requires a valid name")))
          .catch(() => done());
      });
      it("should work when its a valid name", () => {
        Raza.create({ name: "Pug" });
      });
    });
    describe("crear raza", () => {
      it("debe crear una raza al ingresar datos validos", (done) => {
        Raza.create({
          nombre: "oreo",
          altura: "20-50",
          peso: "15-25",
          años_de_vida: "500-600 years",
          temperamentos: ["Loquito", " mordelon", " Fast"],
        })
          .then(() => done())
          .catch(() => done(new Error("debe tener todos los datos validos")));
      });
    });
  });
});
