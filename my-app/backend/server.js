require("dotenv").config();
const express = require("express");
const cors = require("cors");
const userRoutes=require("./routes/userRoutes")
const cookieParser = require("cookie-parser");

const app = express();
app.use(cookieParser())

app.use(express.json());
app.use(cors({origin:"http://localhost:3000",
    credentials:true,
}));

app.use("/", userRoutes); // ✅ Use a prefix to avoid conflicts



// Start Server
const PORT = 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
