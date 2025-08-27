import { Request, Response } from "express";
import Post from "../models/post.model";
import Like from "../models/like.model";

// [POST] /api/posts
export const createPost = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { content, image } = req.body as { content?: string; image?: string };

    const userId = (req as any).user?.id;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized: missing user context" });
      return;
    }

    if (!content || content.trim().length === 0) {
      res
        .status(400)
        .json({ message: "Content is required and cannot be empty" });
      return;
    }

    let imagePath: string | undefined;

    if (req.file) {
      imagePath = `/uploads/${req.file.filename}`;
    }
    // Nếu người dùng nhập/kéo link ảnh thì lấy từ body
    else if (image && image.trim().length > 0) {
      imagePath = image.trim();
    }

    const newPost = new Post({
      content: content.trim(),
      image: imagePath,
      author: userId,
    });

    await newPost.save();

    // populate author để lấy email, role, fullName
    const populatedPost = await Post.findById(newPost._id).populate({
      path: "author",
      select: "email role fullName",
    });

    res.status(201).json({
      message: "Post created successfully",
      post: populatedPost,
    });
  } catch (error) {
    console.error("Create post error:", error);
    res.status(500).json({
      message: "Server error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// [GET] /api/posts
export const getPosts = async (req: Request, res: Response): Promise<void> => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate("author", "fullName email role");

    // Get likes for all posts from Like collection
    const transformedPosts = await Promise.all(
      posts.map(async (post) => {
        const postObj = post.toObject();
        const postLikes = await Like.find({ post: post._id }).populate(
          "user",
          "id email fullName"
        );

        return {
          ...postObj,
          likes: postLikes.map((like: any) => ({
            user: {
              id: like.user._id,
              email: like.user.email,
              fullName: like.user.fullName,
            },
            post: { id: postObj._id },
            createdAt: like.createdAt,
          })),
        };
      })
    );

    res.json({
      message: "Posts retrieved successfully",
      posts: transformedPosts,
    });
  } catch (error) {
    console.error("Get posts error:", error);
    res.status(500).json({
      message: "Server error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// [GET] /api/posts/:id
export const getPostById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id);

    if (!post) {
      res.status(404).json({ message: "Post not found" });
    }

    res.json({
      message: "Post retrieved successfully",
      post,
    });
  } catch (error) {
    console.error("Get post by ID error:", error);
    res.status(500).json({
      message: "Server error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// [PUT] /api/posts/:id
// export const updatePost = async (
//   req: MulterRequest,
//   res: Response
// ): Promise<void> => {
//   try {
//     const { id } = req.params;
//     const { content } = req.body;

//     if (!content || content.trim().length === 0) {
//       res
//         .status(400)
//         .json({ message: "Content is required and cannot be empty" });
//     }

//     const post = await Post.findById(id);

//     if (!post) {
//       return res.status(404).json({ message: "Post not found" });
//     }

//     post.content = content.trim();
//     if (req.file) {
//       post.image = `/uploads/${req.file.filename}`;
//     }

//     await post.save();

//     return res.json({
//       message: "Post updated successfully",
//       post,
//     });
//   } catch (error) {
//     console.error("Update post error:", error);
//     res.status(500).json({
//       message: "Server error",
//       error: error instanceof Error ? error.message : "Unknown error",
//     });
//   }
// };

// [DELETE] /api/posts/:id
export const deletePost = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id);

    if (!post) {
      res.status(404).json({ message: "Post not found" });
    }

    await Post.findByIdAndDelete(id);

    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Delete post error:", error);
    res.status(500).json({
      message: "Server error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
