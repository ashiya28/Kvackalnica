const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const userRouter = require("./routes/users");
const projectRouter = require("./routes/projects");

app.use("/api/users", userRouter);
app.use("/api/projects", projectRouter);

module.exports = app;
