const express = require("express"); 
const dotenv = require("dotenv");
const path = require("path");

dotenv.config(); 
const app = express(); 

const cors = require("cors"); 
app.use(cors());

app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const userRouter = require("./routes/users");
const projectRouter = require("./routes/projects");

app.use("/api/users", userRouter);
app.use("/api/projects", projectRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Strežnik teče na portu ${PORT}`));
