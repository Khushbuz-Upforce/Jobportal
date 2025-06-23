const express = require("express");

const routes = express.Router();

routes.use("/auth", require("../Routes/UserRoutes"))
routes.use("/recruiter", require("../Routes/recruitersRoutes"))
routes.use("/admin", require("../Routes/adminRoutes"))


module.exports = routes;