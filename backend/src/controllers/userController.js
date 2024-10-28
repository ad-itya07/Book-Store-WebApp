import bcrypt from "bcrypt";
import { createAdmin, getUser } from "../models/userModel.js";

class userController {
  async createAdmin(req, res) {
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
}

export default new userController();
