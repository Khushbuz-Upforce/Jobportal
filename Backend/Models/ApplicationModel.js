// models/Application.js
const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
    applicantName: String,
    email: String,
    phone: String,
    resume: String,
    coverLetter: String,
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "RecruiterJob", // <--- important!
    },
}, { timestamps: true });

module.exports = mongoose.model("Application", applicationSchema);
