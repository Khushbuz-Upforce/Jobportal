const Job = require("../Models/RecruiterJob");
const Application = require("../Models/ApplicationModel");
const Company = require("../Models/CompanyModel");
const UserModel = require("../Models/UserModel");

// const createJob = async (req, res) => {
//     try {
//         const jobData = req.body;

//         const newJob = new Job(jobData);
//         await newJob.save();

//         res.status(201).json(newJob);
//     } catch (error) {
//         console.error("Error creating job:", error);
//         res.status(500).json({ message: "Error creating job", error });
//     }
// };
const createJob = async (req, res) => {
    try {
        const {
            title,
            description,
            location,
            category,
            // type,
            status,
            salary,
            companyId,
            JobImage

        } = req.body;
        console.log(req.body, "Create");

        // 1. Validate required fields
        if (!title || !description || !location || !category || !status || !salary || !companyId) {
            return res.status(400).json({ message: "All fields including companyId are required." });
        }

        // 2. Validate company
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({ message: "Company not found." });
        }

        // 3. Create job (recruiterId is optional)
        const newJob = new Job({
            title,
            description,
            location,
            category,
            // type,
            status,
            salary,
            companyId,
            recruiterId: company.recruiterId // Optional but consistent if company has one
        });

        await newJob.save();

        res.status(201).json(newJob);
    } catch (error) {
        console.error("Error creating job:", error);
        res.status(500).json({ message: "Error creating job", error });
    }
};

const getAllJobs = async (req, res) => {
    try {
        const {
            search = "",
            location = "",
            category = "",
            status = "",
            page = 1,
            limit = 10
        } = req.query;

        const query = {};

        if (search) {
            query.title = { $regex: search, $options: "i" };
        }

        if (location) {
            query.location = { $regex: location, $options: "i" };
        }

        if (category) {
            query.category = category;
        }

        if (status) {
            query.status = status;
        }

        const skip = (page - 1) * limit;

        const jobs = await Job.find(query)
            .populate("companyId") // 🟢 Populate company details
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit));

        const totalCount = await Job.countDocuments(query);
        const totalPages = Math.ceil(totalCount / limit);
        console.log(jobs, "AllJobs");


        res.status(200).json({ jobs, totalPages });
    } catch (err) {
        console.error("Error fetching jobs:", err);
        res.status(500).json({ message: "Server error" });
    }
};

const updateJob = async (req, res) => {
    console.log(req.body, "update");

    try {
        const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.json(job);
    } catch (error) {
        return res.status(500).json({ message: "Error updating job", error });
    }
};
const deleteJob = async (req, res) => {
    try {
        await Job.findByIdAndDelete(req.params.id);
        res.json({ message: "Job deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting job", error });
    }
};
// Manage companies

// Create a new company

const createCompany = async (req, res) => {
    try {
        const { name, description, industry, email, website, logo, recruiterId } = req.body;

        if (!name || !email || !description || !industry || !website || !logo) {
            return res.status(400).json({ message: "All required fields must be provided." });
        }

        const newCompany = new Company({
            name,
            email,
            website,
            description,
            industry,
            logo,
            recruiterId: recruiterId || null,
        });

        await newCompany.save();
        res.status(201).json(newCompany);
    } catch (error) {
        console.error("Error creating company:", error);
        res.status(500).json({ message: "Error creating company", error });
    }
};
const getAllCompanies = async (req, res) => {
    try {
        const companies = await Company.find().populate("recruiterId");
        res.json(companies);
    } catch (error) {
        res.status(500).json({ message: "Error fetching companies", error });
    }
};
// const updateCompany = async (req, res) => {
//     try {
//         const company = await Company.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         res.json(company);
//     } catch (error) {
//         res.status(500).json({ message: "Error updating company", error });
//     }
// };
const updateCompany = async (req, res) => {
    try {
        const updateData = req.body;
        console.log(req.body, "Edit Company");

        const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });

        return res.json(company);
    } catch (error) {
        return res.status(500).json({ message: "Error updating company", error });
    }
};

const getApplications = async (req, res) => {
    try {
        const { search = "", jobId = "", page = 1, limit = 10 } = req.query;

        let jobIds = [];

        if (search) {
            const jobs = await Job.find({ title: { $regex: search, $options: "i" } });
            jobIds = jobs.map((j) => j._id);
        }

        const query = {
            ...(jobId && { job: jobId }),
            ...(search && {
                $or: [
                    { applicantName: { $regex: search, $options: "i" } },
                    { job: { $in: jobIds } },
                ],
            }),
        };

        const applications = await Application.find(query)
            .populate("job", "title location category") // optional: more job fields
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        const total = await Application.countDocuments(query);

        res.status(200).json({
            applications,
            totalPages: Math.ceil(total / limit),
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching applications" });
    }
};
const creatApplication = async (req, res) => {
    try {
        // console.log(req.body, "Aplication create");

        const newApp = new Application(req.body);
        await newApp.save();
        res.status(201).json(newApp);
    } catch (err) {
        res.status(500).json({ message: "Error creating application" });
    }
};

// routes/admin.js
const getDashboard = async (req, res) => {
    try {
        const [userCount, adminCount, companyCount, jobsCount, applicationsCount] = await Promise.all([
            UserModel.countDocuments({ role: 'user' }),
            UserModel.countDocuments({ role: 'admin' }),
            Company.countDocuments(),
            Job.countDocuments(),
            Application.countDocuments(),
        ]);

        res.json({
            userCount,
            adminCount,
            companyCount,
            jobsCount,
            applicationsCount,
        });
    } catch (error) {
        console.error("Dashboard stats error:", error);
        res.status(500).json({ message: "Failed to fetch dashboard stats" });
    }
};

module.exports = {
    createJob,
    getAllJobs,
    updateJob,
    deleteJob,
    createCompany,
    getAllCompanies,
    updateCompany,
    getApplications,
    creatApplication,
    getDashboard,
}