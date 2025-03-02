import mongoose from "mongoose";


const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
  },
  website: {
    type: String 
  },
  location: {
    type: String 
  },
  logo: {
    type: String // URL to company logo
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  //Job-related fields directly within the company schema: for mobile
  jobDescription: {
    type: String
  },
  jobSalary: {
    type: Number
  },
  jobPosition: {
    type: String
  }
}, { timestamps: true });

export const Company = mongoose.model("Company", companySchema);
