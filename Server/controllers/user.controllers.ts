import { Request, Response } from "express";
import User from "../models/user.model";

interface AuthRequest extends Request {
  user?: {
    id: string;
  };
}

const getProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user?.id) {
      res.status(401).json({ message: "User not authenticated" });
      return;
    }

    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.json({
      message: "Profile retrieved successfully",
      user: user,
    });
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({
      message: "Server error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

const updateUser = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.params.id;
    const { fullName } = req.body;

    if (!fullName) {
     res.status(400).json({ message: "fullName is required" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { fullName, updatedAt: new Date() },
      { new: true }
    ).select("-password");

    if (!updatedUser) {
       res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error: any) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export { getProfile, updateUser };
