import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { createAdmin, getUser } from "../models/userModel.js";

dotenv.config();

class userController {
  async createAdminController(req, res) {
    const { username, password } = req.body;

    try {
      if (!username || !password) {
        return res.status(400).json({
          message: "please fill all fields",
          success: false,
        });
      }

      const checkUser = await getUser(username);
      if (checkUser) {
        return res.status(409).json({
          message: "Admin already exists",
          success: false,
        });
      }

      let hashedPassword;
      try {
        hashedPassword = await bcrypt.hash(password, 10);
      } catch (err) {
        return res.status(500).json({
          message: "Error Hashing",
          success: false,
        });
      }

      try {
        const admin = await createAdmin({
          username,
          password: hashedPassword,
        });
      } catch (err) {
        return res.status(500).json({
          message: "Error creating admin in DB!",
          success: false,
        });
      }
      return res.status(201).json({
        message: "Admin created successfully",
        success: true,
        admin,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: "Signup failed!",
        success: false,
        error: err,
      });
    }
  }

  async loginAdminController(req, res) {
    const { username, password } = req.body;

    try {
      if (!username || !password) {
        return res.status(400).json({
          message: "please fill all fields",
          success: false,
        });
      }

      let admin;
      try {
        admin = await getUser(username);
        if (!admin) {
          return res.status(404).json({ error: "Incorrect username" });
        }
      } catch (err) {
        console.error(err);
        res.status(500).json({
          message: "Failed to check username in DB!",
          success: false,
          error: err,
        });
      }

      const isMatch = await bcrypt.compare(password, admin.password);
      admin.password = null;
      if (isMatch) {
        jwt.sign(
          { admin },
          process.env.JWT_SECRET_KEY,
          { expiresIn: "1m" },
          (err, token) => {
            if (err) {
              return res.status(500).json({
                message: "Token Generation Failed",
                success: false,
                err,
              });
            }
            return res.json({ 
                message: "Authentication Successfull!",
                success: true,
                token,
                admin,
             });
          }
        );
      } else {
        return res.status(400).json({
          message: "Incorrect Password!",
          success: false,
        });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: "Signup failed!",
        success: false,
        error: err,
      });
    }
  }
}

export default new userController();
