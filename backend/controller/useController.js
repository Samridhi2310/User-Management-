const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_KEY;

const User=require("../model/useModel")
exports.CreateUser=async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await User.create({ Email: email, Password: hashedPassword });

        console.log("User Data Stored:", result);
        res.status(201).json({ message: "User data saved successfully" });
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({ message: "Email must be unique" });
        }
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
}
exports.CheckUser=async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ Email: email }).select("+Password");

        if (!user) {
            return res.status(401).json({ message: "User not exist" });
        }
        if( !(await bcrypt.compare(password, user.Password))){
             return res.status(401).json({ message: "Password doesnot match" });
        }
        const token = jwt.sign({ userId: user._id, userEmail:user.Email}, JWT_SECRET, { expiresIn: "10m" });
        res.cookie("jwtToken",token,{httpOnly:true,secure:false,sameSite:"lax",maxAge: 10 * 60 * 1000 });


        res.json({ token, message: "Login successful!",user });
    } catch (error) {
        res.status(500).json({ message: "Error logging in" });
    } 
}
exports.VerifyToken= (req, res) => {
    res.json({ message: "Token is valid" });
}
exports.GetUserDetails= async (req, res) => {
    try {
        const user = await User.findById(req.user.userId)
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Error fetching user data" });
    }
}

exports.DeleteUser=async (req, res) => {
    try {
        const id =req.params.id;
        console.log(id)
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ message: "Error in deleting the user" });
        }
        res.clearCookie("jwtToken");

        res.json({ message: "User deleted successfully" });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Error deleting user" });
    }
}
exports.UpdateUser=async (req, res) => {
    try {
        const { email, password } = req.body;
        const updateData = {};
        console.log(req.query)
        const {userId}=req.query;

        if (email) updateData.Email = email;
        if (password) {
            updateData.Password = await bcrypt.hash(password, 10); // Hash new password
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            updateData,
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        const token = jwt.sign({ userId: updatedUser._id, userEmail:updatedUser.Email}, JWT_SECRET, { expiresIn: "10m" });
        res.cookie("jwtToken",token,{httpOnly:true,secure:false,sameSite:"lax",maxAge: 10 * 60 * 1000 });
        res.json({ message: "User updated successfully", user: updatedUser,token });
    } catch (error) {
        res.status(500).json({ message: "Error updating user" });
    }
}
exports.LogoutUser= (req, res) => {
    res.clearCookie("jwtToken");
    res.json({ message: "Logged out successfully" });
}