import React, { useEffect, useState } from "react";
import Post from "./Post";
import { getAllPosts } from "@/api/post";
import { ILike } from "@/types";

interface AuthorType {
  fullName: string;
  email?: string;
  role: string;
}

interface PostType {
  _id: string;
  author: AuthorType;
  createdAt: string;
  content: string;
  image: string;
  likes: ILike[];
  comments: { user: string; text: string }[];
}

const PostList: React.FC = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await getAllPosts();
        console.log(response);
        setPosts(response.data.posts);
      } catch (err: any) {
        setError(err.message || "Failed to fetch posts");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  console.log("posts", posts);
  return (
    <div className="flex flex-col gap-4">
      {posts.length > 0 ? (
        posts.map((post) => (
          <Post
            key={post._id}
            _id={post._id}
            fullName={post?.author?.fullName}
            createdAt={post.createdAt}
            content={post.content}
            image={post.image}
            likes={post.likes}
            comments={post.comments}
          />
        ))
      ) : (
        <p>No posts available.</p>
      )}
    </div>
  );
};

export default PostList;
