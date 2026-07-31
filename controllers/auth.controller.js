import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../config/prisma.js";


// Create Admin
export const registerAdmin = async (req, res) => {

  try {

    const { email, password } = req.body;


    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password required",
      });
    }


    const existingAdmin = await prisma.admin.findUnique({
      where: {
        email,
      },
    });


    if (existingAdmin) {
      return res.status(400).json({
        message: "Admin already exists",
      });
    }


    const hashedPassword = await bcrypt.hash(password, 10);


    const admin = await prisma.admin.create({
      data: {
        email,
        password: hashedPassword,
      },
    });


    res.json({
      message: "Admin created successfully",
      admin: {
        id: admin.id,
        email: admin.email,
      },
    });


  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server error",
    });

  }

};





// Login Admin
export const loginAdmin = async (req, res) => {

  try {

    const { email, password } = req.body;


    const admin = await prisma.admin.findUnique({
      where: {
        email,
      },
    });


    if (!admin) {
      return res.status(404).json({
        message: "Admin not found",
      });
    }



    const match = await bcrypt.compare(
      password,
      admin.password
    );


    if (!match) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }



    const token = jwt.sign(
      {
        id: admin.id,
        email: admin.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );


    res.json({
      message: "Login successful",
      token,
    });


  } catch(error) {

    console.error(error);

    res.status(500).json({
      message: "Server error",
    });

  }

};
export const changePassword = async (req, res) => {

  try {

    const { oldPassword, newPassword } = req.body;


    const admin = await prisma.admin.findUnique({
      where: {
        id: req.admin.id,
      },
    });


    const match = await bcrypt.compare(
      oldPassword,
      admin.password
    );


    if (!match) {
      return res.status(401).json({
        message: "Old password incorrect",
      });
    }


    const hashedPassword = await bcrypt.hash(
      newPassword,
      10
    );


    await prisma.admin.update({

      where: {
        id: admin.id,
      },

      data: {
        password: hashedPassword,
      },

    });


    res.json({
      message: "Password changed successfully",
    });


  } catch(error) {

    console.error(error);

    res.status(500).json({
      message: "Server error",
    });

  }

};
export const updateAdmin = async (req, res) => {
  try {
    const { email, currentPassword, newPassword } = req.body;

    const admin = await prisma.admin.findUnique({
      where: {
        id: req.admin.id,
      },
    });

    if (!admin) {
      return res.status(404).json({
        message: "Admin not found",
      });
    }

    const match = await bcrypt.compare(
      currentPassword,
      admin.password
    );

    if (!match) {
      return res.status(401).json({
        message: "Current password incorrect",
      });
    }

    const data = {};

    if (email) {
      data.email = email;
    }

    if (newPassword) {
      data.password = await bcrypt.hash(newPassword, 10);
    }

    await prisma.admin.update({
      where: {
        id: admin.id,
      },
      data,
    });

    res.json({
      message: "Account updated successfully",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};