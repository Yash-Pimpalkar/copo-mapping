// middleware/authenticate.js
import jwt from 'jsonwebtoken';

// General JWT authentication middleware
export const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(403).json({ message: "Token required" });

    try {
        const decoded = jwt.verify(token, "jwtkey");
        req.user = decoded.tokenPayload;
        next();
    } catch (err) {
        console.error("JWT Error:", err);
        res.status(401).json({ message: "Invalid token" });
    }
};


// middleware/roleMiddleware.js

// Middleware for students
export const studentAuth = (req, res, next) => {

    if (req.user.user_type === 1) {

        next();
    } else {
        res.status(403).json({ message: "Access restricted to students" });
    }
};

// Middleware for teachers
export const teacherAuth = (req, res, next) => {
    if (req.user.user_type === 2) {
        next();
    } else {
        res.status(403).json({ message: "Access restricted to teachers" });
    }
};

// Middleware for admins
export const adminAuth = (req, res, next) => {
    if (req.user.user_type === 3) {
        next();
    } else {
        res.status(403).json({ message: "Access restricted to admins" });
    }
};
