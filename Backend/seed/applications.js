const mongoose = require("mongoose");
const Application = require("../Models/ApplicationModel");
const Job = require("../Models/RecruiterJob");
const ConnectDb = require("../Config/database")
ConnectDb();

const seedApplications = async () => {

    const jobs = await Job.find();
    if (jobs.length === 0) {
        console.log("No jobs found to associate applications with.");
        return;
    }

    const sampleApplications = [
        {
            applicantName: "Alice Johnson",
            email: "alice@example.com",
            phone: "1234567890",
            resume: "https://example.com/resumes/alice.pdf",
            coverLetter: "I'm very interested in this position.",
            job: jobs[0]._id,
        },
        {
            applicantName: "Bob Smith",
            email: "bob@example.com",
            phone: "9876543210",
            resume: "https://example.com/resumes/bob.pdf",
            coverLetter: "Please consider my application.",
            job: jobs[1]?._id || jobs[0]._id,
        },
        {
            applicantName: "Carol White",
            email: "carol@example.com",
            phone: "1112223333",
            resume: "https://example.com/resumes/carol.pdf",
            coverLetter: "Excited to apply for this opportunity.",
            job: jobs[0]._id,
        },
        {
            applicantName: "David Brown",
            email: "david@example.com",
            phone: "4445556666",
            resume: "https://example.com/resumes/david.pdf",
            coverLetter: "I believe I'm a strong fit for this job.",
            job: jobs[1]?._id || jobs[0]._id,
        },
        {
            applicantName: "Ella Green",
            email: "ella@example.com",
            phone: "2223334444",
            resume: "https://example.com/resumes/ella.pdf",
            coverLetter: "Looking forward to contributing my skills.",
            job: jobs[0]._id,
        },
        {
            applicantName: "Frank Wilson",
            email: "frank@example.com",
            phone: "5556667777",
            resume: "https://example.com/resumes/frank.pdf",
            coverLetter: "Thank you for considering my application.",
            job: jobs[1]?._id || jobs[0]._id,
        },
        {
            applicantName: "Grace Lee",
            email: "grace@example.com",
            phone: "7778889999",
            resume: "https://example.com/resumes/grace.pdf",
            coverLetter: "Eager to join your amazing team.",
            job: jobs[0]._id,
        },
        {
            applicantName: "Henry King",
            email: "henry@example.com",
            phone: "3334445555",
            resume: "https://example.com/resumes/henry.pdf",
            coverLetter: "Enthusiastic and ready to start.",
            job: jobs[1]?._id || jobs[0]._id,
        },
        {
            applicantName: "Ivy Young",
            email: "ivy@example.com",
            phone: "9990001111",
            resume: "https://example.com/resumes/ivy.pdf",
            coverLetter: "I've always admired your company.",
            job: jobs[0]._id,
        },
        {
            applicantName: "Jack Martin",
            email: "jack@example.com",
            phone: "6667778888",
            resume: "https://example.com/resumes/jack.pdf",
            coverLetter: "Hope to discuss this further soon.",
            job: jobs[1]?._id || jobs[0]._id,
        },
        {
            applicantName: "Kara Diaz",
            email: "kara@example.com",
            phone: "1010101010",
            resume: "https://example.com/resumes/kara.pdf",
            coverLetter: "I'm confident in my qualifications.",
            job: jobs[0]._id,
        },
        {
            applicantName: "Leo Parker",
            email: "leo@example.com",
            phone: "1212121212",
            resume: "https://example.com/resumes/leo.pdf",
            coverLetter: "Looking for growth and challenges.",
            job: jobs[1]?._id || jobs[0]._id,
        },
        {
            applicantName: "Mia Scott",
            email: "mia@example.com",
            phone: "2323232323",
            resume: "https://example.com/resumes/mia.pdf",
            coverLetter: "Highly motivated and detail-oriented.",
            job: jobs[0]._id,
        },
        {
            applicantName: "Noah Reed",
            email: "noah@example.com",
            phone: "3434343434",
            resume: "https://example.com/resumes/noah.pdf",
            coverLetter: "Excited to be part of your vision.",
            job: jobs[1]?._id || jobs[0]._id,
        },
        {
            applicantName: "Olivia Brooks",
            email: "olivia@example.com",
            phone: "4545454545",
            resume: "https://example.com/resumes/olivia.pdf",
            coverLetter: "I bring a positive attitude every day.",
            job: jobs[0]._id,
        },
        {
            applicantName: "Paul Adams",
            email: "paul@example.com",
            phone: "5656565656",
            resume: "https://example.com/resumes/paul.pdf",
            coverLetter: "I value collaboration and innovation.",
            job: jobs[1]?._id || jobs[0]._id,
        },
        {
            applicantName: "Quinn Cooper",
            email: "quinn@example.com",
            phone: "6767676767",
            resume: "https://example.com/resumes/quinn.pdf",
            coverLetter: "Passionate about tech and teamwork.",
            job: jobs[0]._id,
        },
        {
            applicantName: "Ruby Morris",
            email: "ruby@example.com",
            phone: "7878787878",
            resume: "https://example.com/resumes/ruby.pdf",
            coverLetter: "Your values align with mine.",
            job: jobs[1]?._id || jobs[0]._id,
        },
        {
            applicantName: "Sam Turner",
            email: "sam@example.com",
            phone: "8989898989",
            resume: "https://example.com/resumes/sam.pdf",
            coverLetter: "Driven and results-oriented.",
            job: jobs[0]._id,
        },
        {
            applicantName: "Tina Bell",
            email: "tina@example.com",
            phone: "9090909090",
            resume: "https://example.com/resumes/tina.pdf",
            coverLetter: "Creative thinker and fast learner.",
            job: jobs[1]?._id || jobs[0]._id,
        },
    ];


    await Application.deleteMany();
    await Application.insertMany(sampleApplications);
    console.log("Dummy applications seeded.");
    mongoose.disconnect();
};

seedApplications();
