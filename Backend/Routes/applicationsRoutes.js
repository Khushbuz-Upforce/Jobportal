const express = require("express");
const { verifyToken } = require("../Middleware/Auth");
const { getApplications } = require("../Controllers/ApplicationController");


const routes = express.Router();

routes.get('/getApplications', verifyToken, getApplications)

module.exports = routes