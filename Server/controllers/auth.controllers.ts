import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
import OtpModel from "../models/otp.model";
import nodemailer from "nodemailer";

interface RegisterRequest extends Request {
  body: {
    email: string;
    fullName: string;
    password: string;
  };
}

interface LoginRequest extends Request {
  body: {
    email: string;
    password: string;
  };
}

interface SendOtp extends Request {
  body: {
    email: string;
  };
}

interface RefreshTokenRequest extends Request {
  body: {
    refreshToken: string;
  };
}

interface verifyOtp extends Request {
  body: {
    email: string;
    otp: string;
  };
}

interface JwtPayload {
  id: string;
  email?: string;
  role?: string;
}

// register
const register = async (req: RegisterRequest, res: Response): Promise<void> => {
  try {
    const { email, fullName, password } = req.body;

    if (!email || !fullName || !password) {
      res.status(400).json({
        message: "Email, fullName, and password are required",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({
        message: "Please provide a valid email address",
      });
      return;
    }

    if (password.length < 6) {
      res.status(400).json({
        message: "Password must be at least 6 characters long",
      });
      return;
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.status(400).json({
        message: "Email already exists",
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      fullName,
      password: hashedPassword,
    });

    await newUser.save();

    const userResponse = {
      id: newUser._id,
      email: newUser.email,
      fullName: newUser.fullName,
      role: newUser.role,
      createdAt: newUser.createdAt,
    };

    res.status(201).json({
      message: "Registration successful",
      user: userResponse,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      message: "Error creating user",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// LOGIN
const login = async (req: LoginRequest, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({
        message: "Email and password are required",
      });
      return;
    }

    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({
        message: "Invalid email or password",
      });
      return;
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({
        message: "Invalid email or password",
      });
      return;
    }

    const accessToken = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.ACCESS_TOKEN_SECRET || "fallback-secret",
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.REFRESH_TOKEN_SECRET || "fallback-refresh-secret",
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Login successful",
      accessToken,
      refreshToken,
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      message: "Error during login",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

//FORGOTPASSWORD (sent OTP)
const sendOtp = async (req: SendOtp, res: Response): Promise<void> => {
  try {
    const { email } = req.body;

    if (!email) {
      res.status(400).json({
        message: "Email is required",
      });
      return;
    }

    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({
        message: "Email does not exist",
      });
      return;
    }

    // 2. Generate OTP 6
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // 3. Hash OTP and save DB
    const hashedOtp = await bcrypt.hash(otp, 10);

    // Lưu vào Otp collection (xóa cũ trước để tránh nhiều record)
    await OtpModel.deleteMany({ email });
    await OtpModel.create({ email, otp: hashedOtp });

    // 4. Cấu hình transporter gửi email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 5. Nội dung email
    const mailOptions = {
      from: `"Support" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Password Reset OTP",
      text: `Your OTP for password reset is: ${otp}. This OTP will expire in 5 minutes.`,
    };

    // 6. Gửi email
    await transporter.sendMail(mailOptions);

    res.status(200).json({
      message: "Password reset email sent",
      user: { email: user.email },
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({
      message: "Error processing forgot password request",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

const verifyOtp = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      res.status(400).json({ message: "Email và OTP là bắt buộc" });
      return;
    }

    const otpRecord = await OtpModel.findOne({ email });

    if (!otpRecord) {
      res.status(400).json({ message: "OTP đã hết hạn hoặc không tồn tại" });
      return;
    }

    const now = new Date();
    const diff = (now.getTime() - otpRecord.createdAt.getTime()) / 1000;
    if (diff > 30) {
      res.status(401).json({ message: "OTP đã hết hạn" });
      return;
    }

    const isMatch = await bcrypt.compare(otp, otpRecord.otp);
    if (!isMatch) {
      res.status(400).json({ message: "*Invalid OTP" });
      return;
    }

    // ✅ Đánh dấu OTP đã xác thực
    otpRecord.verified = true;
    await otpRecord.save();

    res.json({ message: "OTP verified successfully" });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const resetPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
      res.status(400).json({ message: "Thiếu thông tin" });
      return;
    }

    const otpRecord = await OtpModel.findOne({ email });
    console.log("otpRecord _ resetPassword", otpRecord);

    if (!otpRecord || !otpRecord.verified) {
      res.status(400).json({ message: "OTP chưa được xác thực" });
      return;
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.findOneAndUpdate({ email }, { password: hashedPassword });

    // Xóa OTP để không reuse
    await OtpModel.deleteOne({ email });

    res.status(200).json({ message: "Đặt lại mật khẩu thành công" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error });
  }
};

const refreshAccessToken = async (
  req: RefreshTokenRequest,
  res: Response
): Promise<void> => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      res.status(401).json({ message: "Refresh token required" });
      return;
    }

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET || "fallback-refresh-secret",
      async (err, decoded) => {
        if (err) {
          res.status(403).json({ message: "Invalid or expired refresh token" });
          return;
        }

        try {
          const payload = decoded as JwtPayload;
          const user = await User.findById(payload.id);
          if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
          }

          const newAccessToken = jwt.sign(
            { id: user._id, email: user.email, role: user.role },
            process.env.ACCESS_TOKEN_SECRET || "fallback-secret",
            { expiresIn: "15m" }
          );

          res.json({
            message: "Token refreshed successfully",
            accessToken: newAccessToken,
          });
        } catch (error) {
          console.error("Token refresh error:", error);
          res.status(500).json({
            message: "Error refreshing token",
            error: error instanceof Error ? error.message : "Unknown error",
          });
        }
      }
    );
  } catch (error) {
    console.error("Refresh token error:", error);
    res.status(500).json({
      message: "Error processing refresh token",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export {
  login,
  register,
  refreshAccessToken,
  sendOtp,
  verifyOtp,
  resetPassword,
};
