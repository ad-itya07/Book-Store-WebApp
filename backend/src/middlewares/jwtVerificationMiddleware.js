import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export function verifyAdminToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];

  if (bearerHeader) {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];

    if (!bearerToken) {
      return res.status(400).json({
        message: "Access Declined, no token provided!",
        success: false,
      });
    }

    req.token = bearerToken;
    jwt.verify(req.token, process.env.JWT_SECRET_KEY, (err, admin) => {
      if (err) {
        console.error("JWT Verification Error:", err);
        return res.status(403).json({
          message: "Invalid Credentials",
          success: false,
          err,
        });
      } else {
        req.admin = admin;
        next();
      }
    });
  } else {
    return res.status(400).json({
      message: "Access Declined, no header provided!",
      success: false,
    });
  }
}
