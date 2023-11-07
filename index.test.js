// install dependencies
const { execSync } = require("child_process");
execSync("npm install");
execSync("npm run seed");

const request = require("supertest");
const { db } = require("./db/connection");
const { Musician } = require("./models/index");
const app = require("./src/app");
const seedMusician = require("./seedData");

describe("./musicians endpoint", () => {
  // Write your tests here
  it("should return the musician with the specified ID", async () => {
    const response = await request(app).get("/musicians/1");

    const firstMusician = {
      id: 1,
      name: "Mick Jagger",
      instrument: "Voice",
    };

    expect(response.status).toBe(200);
    expect(response.body.name).toEqual("Mick Jagger");
  });

  it("should return a 404 status when the musician is not found", async () => {
    const response = await request(app).get("/musicians/1000");

    expect(response.status).toBe(404);
    expect(response.text).toEqual("Musician not found");
  });
});
