const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

const fetchuser = (req, res, next) => {
    try {
        // Get token from request header
        const token = req.header("auth-token");

        // Check whether token exists
        if (!token) {
            return res.status(401).json({
                error: "Please authenticate using a valid token"
            });
        }

        // Verify token
        const data = jwt.verify(token, JWT_SECRET);

        // Store user information in req.user
        req.user = data.user;

        // Continue to next function
        next();

    } catch (error) {

        console.log("JWT verification error:", error.message);
        return res.status(401).json({
            error: "Invalid authentication token"
        });
    }
};

module.exports = fetchuser;