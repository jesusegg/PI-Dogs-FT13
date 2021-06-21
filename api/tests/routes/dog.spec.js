/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Dog, Raza, Temperamentos, conn } = require("../../src/db.js");

const agent = session(app);
const dog = {
  nombre: "orito",
  altura: "20-50",
  peso: "15-25",
  años_de_vida: "500-600 years",
  temperamentos: ["Loquito", " mordelon", " Fast"],
};

describe("Dogs routes", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  beforeEach(() => Raza.sync({ force: true }).then(() => Raza.create(dog)));
  describe("GET /dogs", () => {
    it("should get 200", () => agent.get("/dogs").expect(200));
  });
  describe("GET /temperament", () => {
    it("should get 200", () => agent.get("/temperament").expect(200));
  });
  describe("GET /dogs", () => {
    it("should get 200", () => agent.get("/dogs9999").expect(404));
  });
});
