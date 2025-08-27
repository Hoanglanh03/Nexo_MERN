import { Request, Response } from "express";
import Like from "../models/like.model";
import Post from "../models/post.model";

// POST /posts/:id/like

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
    fullName: string;
  };
}

export const toggleLike = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const postId = req.params.id;
    const userId = req.user?.id; // từ middleware xác thực JWT

    // Kiểm tra post tồn tại
    const post = await Post.findById(postId);
    if (!post) {
      res.status(404).json({ message: "Post not found" });
      return;
    }

    // Kiểm tra user đã like chưa
    const existingLike = await Like.findOne({ post: postId, user: userId });

    if (existingLike) {
      // Nếu đã like -> unlike
      await existingLike.deleteOne();
    } else {
      // Nếu chưa like -> tạo mới
      await Like.create({ post: postId, user: userId });
    }

    // Get updated likes for this post
    const updatedLikes = await Like.find({ post: postId }).populate(
      "user",
      "id email fullName"
    );
    const likesCount = updatedLikes.length;

    // Transform likes to match ILike interface
    const transformedLikes = updatedLikes.map((like) => ({
      user: {
        id: (like.user as any)._id,
        email: (like.user as any).email,
        fullName: (like.user as any).fullName,
      },
      post: { id: like.post },
      createdAt: like.createdAt,
    }));

    res.json({
      message: existingLike ? "Unliked" : "Liked",
      likesCount,
      likes: transformedLikes,
    });
  } catch (error: any) {
    console.error("Toggle like error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
