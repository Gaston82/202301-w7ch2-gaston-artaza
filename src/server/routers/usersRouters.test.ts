import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
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

// Describe("Given a POST 'user/login' endpoint",()=>{
//   describe("When it recieves a request with name 'Gaston' and password '123456'",()=>{
//     test('Then it should first', () =>)
//   })
// })
