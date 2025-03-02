import chai from "chai";
import chaiHttp from "chai-http";
import sinon from "sinon";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js"; // ✅ Import only model, not app

const { expect } = chai;
chai.use(chaiHttp);

describe("User Authentication Tests", function () {
  this.timeout(10000);

  let app;
  before(async () => {
    // ✅ Dynamic import ensures `index.js` does not cause a cycle
    const module = await import("../index.js");
    app = module.app;
  });

  let userStub, bcryptStub, jwtStub, saveStub;

  beforeEach(() => {
    userStub = sinon.stub(User, "findOne");
    bcryptStub = sinon.stub(bcrypt, "hash");
    jwtStub = sinon.stub(jwt, "sign");
    saveStub = sinon.stub(User.prototype, "save");
  });

  afterEach(() => {
    sinon.restore();
  });

  it("should register a new user successfully", async function () {
    const mockUser = new User({
      _id: "65d12c3482345f1234567890",
      fullname: "Test User",
      email: "test@example.com",
      phoneNumber: "1234567890",
      password: "hashedpassword",
      role: "student",
    });

    saveStub.resolves(mockUser);

    const res = await chai
      .request(app)
      .post("/api/v1/user/register")
      .send({
        fullname: "Test User",
        email: "test@example.com",
        password: "password123",
        phoneNumber: "1234567890",
        role: "student",
      });

    expect(res).to.have.status(201);
    expect(res.body).to.have.property("message", "User created successfully");

    saveStub.restore();
  });
});
