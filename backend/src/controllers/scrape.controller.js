import puppeteer from "puppeteer";
import { Job } from "../models/Job.model.js";

export const scrapeJobs = async (req, res) => {
  let {query, pageSize, currPage, maxPages} = req.query 

//   query = "software"
  maxPages = 1;
 
  const jobs = [];
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  try {
      for(let i=1; i<=maxPages; i++){
      const url = `https://www.dice.com/jobs?q=${query}&countryCode=US&radius=30&radiusUnit=mi&page=${currPage}&pageSize=${pageSize}&filters.postedDate=ONE&filters.workplaceTypes=Remote&filters.employmentType=CONTRACTS&currencyCode=USD&language=en`;
      console.log(`Scraping page ${i}: ${url}`);

      await page.goto(url, { waitUntil: "load", timeout: 0 });
      await page.waitForSelector(".search-card", { timeout: 10000 });

      const jobsOnPage = await page.evaluate(() => {
        const jobCards = document.querySelectorAll(".search-card");
        let scrapedJobs = [];

        jobCards.forEach((card) => {
          const title = card.querySelector(".card-title-link")?.innerText || "N/A";
          const company = card.querySelector(".card-company a")?.innerText.trim() || "N/A";
          const location = card.querySelector(".search-result-location")?.innerText.trim() || "N/A";
          const employmentType = card.querySelector(".card-position-type span")?.innerText.trim() || "N/A";
          const postedDate = card.querySelector(".posted-date")?.innerText || "N/A";
          const jobDescription = card.querySelector(".card-description")?.innerText || "N/A";
          const companyLogo = card.querySelector("img.card-logo")?.src || "N/A";
          const link = `https://www.dice.com/job-detail/${card.querySelector(".card-title-link")?.id}` || "N/A";

          scrapedJobs.push({ title, company, location, link, employmentType,  postedDate, jobDescription, companyLogo});
        });

        return scrapedJobs;
      });

      

      jobs.push(...jobsOnPage);
    

    // Save to database
    
    const newJobs = await Job.insertMany(jobs);
    res.status(200).json({ message: "Jobs scraped successfully", data: newJobs });

  }} catch (error) {
    console.error("Error scraping jobs:", error.message);
    res.status(500).json({ message: "Error scraping jobs", error: error.message });
  } finally {
    await browser.close();
  }
};
