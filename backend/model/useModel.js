const mongoose = require("mongoose");

const MONGO_URL = process.env.MONGO_URI;
mongoose.connect(MONGO_URL)
    .then(() => console.log("Database Connected"))
    .catch((err) => console.log("Error Occurred", err));

const userSchema = new mongoose.Schema({
    Email: { type: String, unique: true, required: true },
    Password: { type: String, required: true,select:false }
    
});

const User = mongoose.model("User", userSchema); // ✅ Define the User model

module.exports = User; // ✅ Export it correctly


