const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });
const mongoose = require("mongoose");
const Application = require("../Models/ApplicationModel");
const RecruiterJob = require("../Models/RecruiterJob");
const User = require("../Models/UserModel");

const STATUSES = ["Pending", "Reviewed", "Shortlisted", "Rejected", "Hired"];
const DAY_MS = 86400000;

async function main() {
    if (!process.env.MONGO_URI) {
        console.error("MONGO_URI is not set in .env");
        process.exit(1);
    }

    await mongoose.connect(process.env.MONGO_URI);

    const jobs = await RecruiterJob.find().select("_id").lean();
    if (!jobs.length) {
        console.error("No RecruiterJob documents found. Add at least one job, then rerun.");
        await mongoose.disconnect();
        process.exit(1);
    }

    const jobIds = jobs.map((j) => j._id);
    const users = await User.find({ role: "user" }).select("_id").lean().limit(30);
    const userIds = users.map((u) => u._id);

    const now = Date.now();
    const docs = Array.from({ length: 30 }, (_, i) => {
        const created = new Date(now - (29 - i) * DAY_MS);
        const doc = {
            applicantName: `Seed Candidate ${i + 1}`,
            email: `seed.candidate.${i + 1}@example.com`,
            phone: `+1555${String(1000000 + i).slice(-7)}`,
            resume: i % 4 === 0 ? "https://example.com/resumes/placeholder.pdf" : undefined,
            coverLetter:
                i % 3 === 0
                    ? `I am interested in this role. Regards, Seed Candidate ${i + 1}.`
                    : undefined,
            jobId: jobIds[i % jobIds.length],
            status: STATUSES[i % STATUSES.length],
            createdAt: created,
            updatedAt: created,
        };
        if (userIds.length) {
            doc.userId = userIds[i % userIds.length];
        }
        return doc;
    });

    await Application.insertMany(docs, { timestamps: false });
    console.log(`Inserted ${docs.length} applications across ${jobIds.length} job(s).`);
    await mongoose.disconnect();
}

main().catch(async (err) => {
    console.error(err);
    await mongoose.disconnect().catch(() => {});
    process.exit(1);
});
