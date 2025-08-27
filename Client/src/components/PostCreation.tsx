import { useAppSelector } from "@/redux/hooks";
import { openDialog } from "@/redux/slices/dialogSlice";
import { Avatar, TextField } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";

const PostCreation: React.FC = () => {
  const userInfo = useAppSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  return (
    <div className="card flex gap-2">
      <Avatar>{userInfo?.fullName?.[0]?.toUpperCase()}</Avatar>
      <TextField
        className="flex-1"
        size="small"
        placeholder="What's on your mind?"
        onClick={() =>
          dispatch(
            openDialog({
              title: "Create a post",
              contentType: "NEW_POST_DIALOG",
              additionalData: userInfo,
            }),
          )
        }
      />
    </div>
  );
};

export default PostCreation;
