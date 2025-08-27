import { Avatar, Button } from "@mui/material";
import React, { useState } from "react";
import dayjs from "dayjs";
import { Comment, ThumbUp } from "@mui/icons-material";
import { ILike } from "@/types";
import { handleLike } from "@/api/post";

interface PostProps {
  _id: string;
  fullName: string;
  createdAt: string | Date;
  content: string;
  image?: string;
  likes: ILike[];
  comments: { user: string; text: string }[];
}

const Post: React.FC<PostProps> = ({
  _id,
  fullName,
  createdAt,
  content,
  image,
  likes: initialLikes = [],
  comments = [],
}) => {
  const [likes, setLikes] = useState<ILike[]>(initialLikes);
  const [liked, setLiked] = useState(() => {
  const currentUserId = localStorage.getItem("userId");
  return initialLikes.some((like) => like.user.id === currentUserId);
  });

  const onLike = async () => {
    try {
      const res = await handleLike(_id);
      setLiked(res.data.message === "Liked");
      setLikes(res.data.likes || likes);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="card">
      <div className="flex gap-3">
        <Avatar className="!h-8 !w-8 !bg-blue-600">
          {fullName?.[0]?.toUpperCase()}
        </Avatar>
        <div>
          <p className="font-bold">{fullName}</p>
          <p className="text-sm text-dark-100">
            {dayjs(createdAt).format("DD/MM/YYYY HH:mm")}
          </p>
        </div>
      </div>

      <p className="mb-1">{content}</p>
      {image && <img src={image} className="w-full" />}
      <div className="my-2 flex items-center justify-between">
        <div className="flex gap-1 text-sm">
          <ThumbUp fontSize="small" className="text-primary-main" />
          <p>{likes.length}</p>
        </div>

        <div className="text-sm">
          <p>{comments.length} comments</p>
        </div>
      </div>
      <div className="flex justify-between border-b border-t border-dark-300 py-1 text-sm">
        <Button size="small" className="flex-1" onClick={onLike}>
          <ThumbUp
            fontSize="small"
            className={`mr-1 ${liked ? "text-blue-600" : "text-gray-600"}`}
          />
          <p className={`${liked ? "text-blue-600" : "text-gray-600"}`}>
            {liked ? "Liked" : "Like"}
          </p>
        </Button>
        <Button size="small" className="flex-1 !text-dark-100">
          <Comment fontSize="small" className="mr-1" /> Comment
        </Button>
      </div>
    </div>
  );
};

export default Post;
