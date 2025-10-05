import bcrypt from "bcryptjs";
import express from "express";
import jwt from "jsonwebtoken";
import { AuthenticatedRequest, authenticateToken } from "../middleware/auth";
import { findUserByEmail, setAdminUser, User } from "../models/user";

const router = express.Router();

// Initialize admin user (seed)
const initializeAdmin = async () => {
  const adminEmail = process.env.ADMIN_EMAIL!;
  const adminPassword = process.env.ADMIN_PASSWORD!;

  if (!findUserByEmail(adminEmail)) {
    const hashedPassword = await bcrypt.hash(adminPassword, 12);
    const adminUser: User = {
      id: "admin-1",
      email: adminEmail,
      password: hashedPassword,
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setAdminUser(adminUser);
    console.log("Admin user initialized with email:", adminEmail);
  }
};

// Initialize admin on module load
initializeAdmin();

// Login endpoint
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address",
      });
    }

    // Find user
    const user = findUserByEmail(email);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      message: "Login successful",
      data: {
        token,
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
        },
      },
    });
  } catch (error: any) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// Verify token endpoint
router.get("/verify", authenticateToken, (req: AuthenticatedRequest, res) => {
  res.json({
    success: true,
    message: "Token is valid",
    data: {
      user: req.user,
    },
  });
});

// Logout endpoint (mainly for client-side token removal)
router.post("/logout", authenticateToken, (req: AuthenticatedRequest, res) => {
  res.json({
    success: true,
    message: "Logged out successfully",
  });
});

// Get admin credentials (for demo purposes - remove in production)
router.get("/credentials", (req, res) => {
  res.json({
    success: true,
    message: "Admin credentials for testing",
    data: {
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
      note: "Use these credentials to login as admin",
    },
  });
});

export { router as authRoutes };
