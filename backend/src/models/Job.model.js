import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title: String,
    company: String,
    location: String,
    link: String,
    postedDate: String,
    employmentType: String,
    jobDescription: String,
    companyLogo: String,
  });
  
 export const Job = mongoose.model("Job", jobSchema);