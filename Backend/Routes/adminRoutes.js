const express = require("express");
const router = express.Router();
const { verifyToken, isAdmin } = require("../Middleware/Auth");
const { getAllJobs, updateJob, deleteJob, getAllCompanies, updateCompany, createJob, createCompany, getApplications, creatApplication, getDashboard, getNotigication, clearNotifications } = require("../Controllers/AdminController");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const jobImagePath = path.join(__dirname, "..", "uploads", "jobs");
const companyLogoPath = path.join(__dirname, "..", "uploads", "companyLogo");

if (!fs.existsSync(jobImagePath)) fs.mkdirSync(jobImagePath, { recursive: true });
if (!fs.existsSync(companyLogoPath)) fs.mkdirSync(companyLogoPath, { recursive: true });

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => cb(null, "uploads/"),
//     filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
// });

// const upload = multer({ storage });



// Company Logo Upload
const companyLogoStorage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/companyLogo/"),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const uploadCompanyLogo = multer({ storage: companyLogoStorage });

// Job Image Upload
const jobImageStorage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/jobs/"),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const uploadJobImage = multer({ storage: jobImageStorage });

// router.post("/uploads", upload.single("file"), (req, res) => {
//     const { oldFile } = req.body; // Expect the old file name (optional)

//     // 🔥 Delete the old file if provided
//     if (oldFile) {
//         const oldPath = path.join(__dirname, "..", "uploads", oldFile);
//         fs.unlink(oldPath, (err) => {
//             if (err) {
//                 console.error("Old file delete failed:", err.message);
//             } else {
//                 console.log("Old file deleted:", oldFile);
//             }
//         });
//     }

//     // ✅ Save and return the new file URL
//     console.log(req.file, "Logo image uploaded");
//     const url = `http://localhost:3000/uploads/${req.file.filename}`;
//     res.json({ url, filename: req.file.filename }); // return filename to save in DB
// });
// router.post("/uploadsImage", upload.single("file"), (req, res) => {
//     const { oldFile } = req.body;

//     // 🔥 Delete old file from jobImage folder
//     if (oldFile) {
//         const oldPath = path.join(__dirname, "..", "uploads", "jobs", oldFile);
//         fs.unlink(oldPath, (err) => {
//             if (err) {
//                 console.error("Old file delete failed:", err.message);
//             } else {
//                 console.log("Old file deleted:", oldFile);
//             }
//         });
//     }

//     // ✅ Return full URL
//     console.log(req.file, "Job image uploaded");
//     const url = `http://localhost:3000/uploads/jobImage/${req.file.filename}`;
//     res.json({ url, filename: req.file.filename });
// });


// Jobs

router.post("/uploadCompanyLogo", uploadCompanyLogo.single("file"), (req, res) => {
    const { oldFile } = req.body;

    if (oldFile) {
        const oldPath = path.join(companyLogoPath, oldFile);
        fs.unlink(oldPath, (err) => {
            if (err) console.error("Old logo delete failed:", err.message);
        });
    }

    const url = `http://localhost:3000/uploads/companyLogo/${req.file.filename}`;
    res.json({ url, filename: req.file.filename });
});

router.post("/uploadJobImage", uploadJobImage.single("file"), (req, res) => {
    const { oldFile } = req.body;

    if (oldFile) {
        const oldPath = path.join(jobImagePath, oldFile);
        fs.unlink(oldPath, (err) => {
            if (err) console.error("Old job image delete failed:", err.message);
        });
    }

    const url = `http://localhost:3000/uploads/jobs/${req.file.filename}`;
    res.json({ url, filename: req.file.filename });
});

router.post("/createJob", verifyToken, isAdmin, createJob);

router.get("/getAllJobs", verifyToken, isAdmin, getAllJobs);
router.put("/updateJob/:id", verifyToken, isAdmin, updateJob);
router.delete("/deleteJob/:id", verifyToken, isAdmin, deleteJob);

// // Applications
// router.get("/applications", getAllApplications);
// router.get("/applications/:id", getApplicationById);

// Companies
router.post("/createCompany", verifyToken, isAdmin, createCompany);

router.get("/getAllCompanies", verifyToken, isAdmin, getAllCompanies);
router.put("/updateCompany/:id", verifyToken, isAdmin, updateCompany);

// Applications
router.get("/getApplications", verifyToken, isAdmin, getApplications);
router.post("/createApplications", verifyToken, isAdmin, creatApplication)

// Dashboard count stat
router.get('/dashboardCount', verifyToken, isAdmin, getDashboard)
router.get('/getNotigication', verifyToken, isAdmin, getNotigication)
router.delete('/clear', clearNotifications);

module.exports = router;
