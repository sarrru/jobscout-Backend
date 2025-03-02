// import chai from 'chai';  // ✅ Fix: Use default import
// import chaiHttp from 'chai-http';
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// import { Job } from '../models/job.model.js';

// dotenv.config();
// chai.use(chaiHttp);
// const { expect } = chai;

// let app;
// let server;

// describe('Job Routes', function () {
//     this.timeout(10000);

//     before(async function () {
//         if (server) return; // ✅ Prevents duplicate execution

//         const module = await import('../index.js');
//         app = module.app;
//         server = app.listen(); // ✅ Prevents EADDRINUSE error

//         console.log("Connecting to test database:", process.env.MONGO_URI);

//         if (!process.env.MONGO_URI) {
//             throw new Error("MONGO_URI is not defined in .env file");
//         }

//         await mongoose.connect(process.env.MONGO_URI, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true
//         });

//         await Job.deleteMany({});
//     });

//     after(async function () {
//         await Job.deleteMany({});
//         await mongoose.connection.close();
//         if (server) server.close();  // ✅ Properly close the test server
//     });

//     describe('POST /api/v1/job/post', function () {
//         it('should post a new job when authenticated', function (done) {
//             request(app)  // ✅ Fixed chai.request(app) issue
//                 .post('/api/v1/job/post')
//                 .send({
//                     title: "Backend Developer",
//                     description: "Develop backend services",
//                     requirements: ["Node.js", "Express"],
//                     salary: 80000,
//                     experienceLevel: 2,
//                     location: "New York",
//                     jobType: "Full-Time",
//                     position: 2,
//                     created_by: new mongoose.Types.ObjectId().toString()
//                 })
//                 .end((err, res) => {
//                     expect(res).to.have.status(201);
//                     expect(res.body).to.have.property('message', 'Job posted successfully');
//                     done();
//                 });
//         });
//     });
// });

import chai from "chai";
import chaiHttp from "chai-http";
import * as sinon from "sinon"; // ✅ Correct ES module import
import { Job } from "../models/jobModel.js"; 
import { app } from "../index.js"; // ✅ Import Express app

const { expect } = chai;
chai.use(chaiHttp);

describe("Job API Tests", function () {
  this.timeout(10000); // ✅ Set timeout for async operations

  let jobStub, saveStub, findByIdStub, findStub;

  beforeEach(() => {
    jobStub = sinon.stub(Job, "find");
    saveStub = sinon.stub(Job.prototype, "save");
    findByIdStub = sinon.stub(Job, "findById");
    findStub = sinon.stub(Job, "find");
  });

  afterEach(() => {
    sinon.restore(); // ✅ Restore all stubs after each test
  });

  /** ✅ Test Posting a Job **/
  it("should post a new job successfully", async function () {
    const mockJob = new Job({
      _id: "65d12c3482345f1234567890",
      title: "Software Engineer",
      description: "Develop and maintain software applications.",
      requirements: ["JavaScript", "Node.js"],
      salary: 50000,
      experienceLevel: 2,
      location: "Remote",
      jobType: "Full-time",
      position: 1,
      company: "65d12c3482345f1234567891",
      created_by: "65d12c3482345f1234567892",
      applications: [],
    });

    saveStub.resolves(mockJob); // ✅ Mock save function

    const res = await chai
      .request(app)
      .post("/api/v1/job/post") // ✅ Ensure correct endpoint
      .set("Authorization", "Bearer mocked-jwt-token") // ✅ Mock authentication
      .send({
        title: "Software Engineer",
        description: "Develop and maintain software applications.",
        requirements: ["JavaScript", "Node.js"],
        salary: 50000,
        experienceLevel: 2,
        location: "Remote",
        jobType: "Full-time",
        position: 1,
        company: "65d12c3482345f1234567891",
        created_by: "65d12c3482345f1234567892",
      });

    console.log("📌 Job Post Response:", res.status);
    expect(res).to.have.status(201);
    expect(res.body).to.have.property("message", "Job posted successfully");
  });

  /** ✅ Test Getting All Jobs **/
  it("should get all jobs successfully", async function () {
    const mockJobs = [
      {
        _id: "65d12c3482345f1234567890",
        title: "Software Engineer",
        description: "Develop and maintain software applications.",
        salary: 50000,
      },
      {
        _id: "65d12c3482345f1234567891",
        title: "Backend Developer",
        description: "Build APIs and services.",
        salary: 60000,
      },
    ];

    jobStub.resolves(mockJobs); // ✅ Mock Job.find()

    const res = await chai
      .request(app)
      .get("/api/v1/job/get")
      .set("Authorization", "Bearer mocked-jwt-token"); // ✅ Mock authentication

    console.log("📌 Get All Jobs Response:", res.status);
    expect(res).to.have.status(200);
    expect(res.body).to.be.an("array");
    expect(res.body.length).to.equal(2);
  });

  /** ✅ Test Getting a Job by ID **/
  it("should get a job by ID successfully", async function () {
    const mockJob = {
      _id: "65d12c3482345f1234567890",
      title: "Software Engineer",
      description: "Develop and maintain software applications.",
      salary: 50000,
    };

    findByIdStub.resolves(mockJob); // ✅ Mock Job.findById()

    const res = await chai
      .request(app)
      .get("/api/v1/job/get/65d12c3482345f1234567890")
      .set("Authorization", "Bearer mocked-jwt-token");

    console.log("📌 Get Job By ID Response:", res.status);
    expect(res).to.have.status(200);
    expect(res.body).to.have.property("title", "Software Engineer");
  });

  /** ✅ Test Getting Admin Jobs **/
  it("should get admin jobs successfully", async function () {
    const mockAdminJobs = [
      {
        _id: "65d12c3482345f1234567890",
        title: "Lead Developer",
        description: "Manage a team of developers.",
        salary: 80000,
      },
    ];

    findStub.resolves(mockAdminJobs); // ✅ Mock Job.find()

    const res = await chai
      .request(app)
      .get("/api/v1/job/getadminjobs")
      .set("Authorization", "Bearer mocked-jwt-token");

    console.log("📌 Get Admin Jobs Response:", res.status);
    expect(res).to.have.status(200);
    expect(res.body).to.be.an("array");
    expect(res.body.length).to.equal(1);
  });
});
