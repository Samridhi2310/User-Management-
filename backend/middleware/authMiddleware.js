const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_KEY; 
const authMiddleware=(req, res, next)=> {
    let token = req.cookies.jwtToken; // First check in cookies

    if (!token) {
        const authHeader = req.header("Authorization");
        token = authHeader && authHeader.split(" ")[1]; // Then check Authorization header
    }

    if (!token) {
        return res.status(401).json({ error: "No token provided" });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: "Invalid token" });
        }
        req.user = decoded; // Store decoded user data in request object
        next();
    });
}
module.exports=authMiddleware;
