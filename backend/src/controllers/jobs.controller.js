import { Job } from "../models/Job.model.js";

// GET Jobs with Pagination
export const getJobs = async (req, res) => {
  try {
    const {
      query = '',
      location = '',
      employmentType = '',
      experienceLevel = '',
      industry = '',
      workplace = '',
      page = 1,
      limit = 10,
    } = req.query;

    // Build the search filter dynamically
    const filter = {};

    if (query) filter.title = { $regex: query, $options: 'i' };
    if (location) filter.location = { $regex: location, $options: 'i' };
    if (employmentType) filter.employmentType = { $regex: employmentType, $options: 'i' };
    if (experienceLevel) filter.experienceLevel = { $regex: experienceLevel, $options: 'i' };
    if (industry) filter.industry = { $regex: industry, $options: 'i' };
    if (workplace) filter.workplace = { $regex: workplace, $options: 'i' };

    const pageNumber = parseInt(page, 10) || 1;
    const limitNumber = parseInt(limit, 10) || 10;
    const skip = (pageNumber - 1) * limitNumber;

    const availableJobs = await Job.find(filter)
      .skip(skip)
      .limit(limitNumber);

    const totalJobs = await Job.countDocuments(filter);
    const totalPages = Math.ceil(totalJobs / limitNumber);

    if (availableJobs.length === 0) {
      return res.status(200).json({ message: "No Jobs Available at this moment. Please Try Again" });
    }

    res.status(200).json({
      availableJobs,
      currentPage: pageNumber,
      totalPages,
      totalJobs,
    });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ message: "An error occurred while fetching jobs" });
  }
};

// POST Job
export const postJob = async (req, res) => {
  try {
    const { title, company, location, link } = req.body;

    if (!title || !company || !location || !link) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const alreadyExistingLink = await Job.findOne({ link });

    if (alreadyExistingLink) {
      return res.status(400).json({ message: "Link already exists" });
    }

    const createdJob = await Job.create({ title, company, location, link });
    res.status(201).json({ message: "Job created successfully", data: createdJob });
  } catch (error) {
    console.error("Error posting job:", error);
    res.status(500).json({ message: "An error occurred while posting the job" });
  }
};
