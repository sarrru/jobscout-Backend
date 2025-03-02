import chai from "chai";
import chaiHttp from "chai-http";
import mongoose from "mongoose";
import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";
import { User } from "../models/user.model.js";
import { fileURLToPath, pathToFileURL } from "url";

const { expect } = chai;
chai.use(chaiHttp);

let app;

before(async function () {
    // Dynamically import the server using a file URL
    const appPath = pathToFileURL("../server.js").href;
    app = (await import(appPath)).default;

    // Connect to the test database
    if (mongoose.connection.readyState === 0) {
        await mongoose.connect(process.env.TEST_DB_URI || "mongodb://localhost:27017/testdb");
    }

    // Mock user login to get a token
    const userRes = await chai.request(app)
        .post("/auth/login")
        .send({ email: "testuser@example.com", password: "password" });

    global.token = userRes.body.token;
    
    // Create a mock job
    const job = new Job({ title: "Software Engineer", company: new mongoose.Types.ObjectId() });
    await job.save();
    global.jobId = job._id;
});

describe("Job Application API", function () {
    it("should apply for a job", async function () {
        const res = await chai.request(app)
            .get(`/apply/${global.jobId}`)
            .set("Authorization", `Bearer ${global.token}`);

        expect(res).to.have.status(201);
        expect(res.body).to.have.property("message", "Job applied successfully.");
    });

    it("should get applied jobs", async function () {
        const res = await chai.request(app)
            .get("/get")
            .set("Authorization", `Bearer ${global.token}`);

        expect(res).to.have.status(200);
        expect(res.body).to.have.property("success", true);
        expect(res.body.application).to.be.an("array");
    });

    it("should get job applicants", async function () {
        const res = await chai.request(app)
            .get(`/${global.jobId}/applicants`)
            .set("Authorization", `Bearer ${global.token}`);

        expect(res).to.have.status(200);
        expect(res.body).to.have.property("succees", true);
        expect(res.body.job).to.have.property("applications").that.is.an("array");
    });

    it("should update application status", async function () {
        const application = await Application.findOne({ job: global.jobId });
        const applicationId = application._id;

        const res = await chai.request(app)
            .post(`/status/${applicationId}/update`)
            .set("Authorization", `Bearer ${global.token}`)
            .send({ status: "accepted" });

        expect(res).to.have.status(200);
        expect(res.body).to.have.property("message", "Status updated successfully.");
    });
});

after(async function () {
    await Application.deleteMany({});
    await Job.deleteMany({});
    await User.deleteMany({});
    await mongoose.connection.close();
});
