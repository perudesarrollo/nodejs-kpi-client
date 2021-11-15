const app = require("../index");
const supertest = require("supertest");

describe("Test the root post path", () => {
    test("It should response the POST method", async () => {
        await supertest(app).post("/cliente")
            .send({
                "name": "Demo",
                "last_name": "Palomino2",
                "birth_date": "1990-01-14"
            })
            .expect(200)
            .then((response) => {
                expect(response.body.status).toBe(true)
            });
    });
});