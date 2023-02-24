import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { app } from "..";
import request from "supertest";
import connectDataBase from "../../database/connectDataBase";
import User from "../../database/models/User";
let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  await connectDataBase(server.getUri());
});

afterAll(async () => {
  await server.stop();
  await mongoose.connection.close();
});

afterEach(async () => {
  await User.deleteMany();
});

describe("Given a POST user/register endpoint ", () => {
  describe("When it recieves a request with name 'Gaston' and password '1234papapj'", () => {
    test("Then It should response with the status 201 and a message 'The user has been created'", async () => {
      const mockUser = {
        username: "gaston",
        password: "1234papapj",
        email: "cabezaartaza@hotmail.com",
      };
      const expectedMessage = "The user has been created";
      const expectedStatus = 201;

      const response = await request(app)
        .post("/users/register")
        .send(mockUser)
        .expect(expectedStatus);
      expect(response.body).toHaveProperty("message", expectedMessage);
    });
  });
});
