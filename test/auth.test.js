import chai from 'chai';  // ✅ Fix: Use default import
import chaiHttp from 'chai-http';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from '../models/user.model.js';
import isAuthenticated from '../middlewars/isAuthenticated.js';

dotenv.config();
chai.use(chaiHttp);
const { expect } = chai;

let app; // Declare `app` but do not import it immediately

describe('Auth Routes', function () {
    this.timeout(10000);

    before(async function () {
        // ✅ Dynamically import `app` inside `before()` to avoid circular dependency
        const module = await import('../index.js');
        app = module.app;

        console.log("Connecting to test database:", process.env.MONGO_URI);

        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI is not defined in .env file");
        }

        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        await User.deleteMany({});
    });

    after(async function () {
        await User.deleteMany({});
        await mongoose.connection.close();
    });

    describe('POST /api/v1/user/register', function () {
        it('should register a new user', function (done) {
            chai.request(app) // ✅ `app` is now available dynamically
                .post('/api/v1/user/register')
                .send({
                    fullname: 'Jane Doe',
                    email: 'janedoe@example.com',
                    phoneNumber: '0987654321',
                    password: 'test1234',
                    role: 'student'
                })
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    expect(res.body).to.have.property('message', 'User registered successfully');
                    done();
                });
        });
    });
});
