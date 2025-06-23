const Application = require("../Models/ApplicationModel");

exports.getApplications = async (req, res) => {
    try {
        const { search = "", page = 1, limit = 10 } = req.query;

        const query = search
            ? {
                $or: [
                    { applicantName: { $regex: search, $options: "i" } },
                ],
            }
            : {};

        const applications = await Application.find(query)
            .populate("job", "title")
            .skip((page - 1) * limit)
            .limit(Number(limit));

        const total = await Application.countDocuments(query);
        console.log(applications);

        res.status(200).json({
            applications,
            totalPages: Math.ceil(total / limit),
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch applications", error });
    }
};
