import { createPost } from "@/api/post";
import {
  Avatar,
  Button,
  Chip,
  DialogActions,
  DialogContent,
  Stack,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

interface UserInfo {
  fullName?: string;
}

interface NewPostDialogProps {
  userInfo: UserInfo;
}

interface ImageUploaderProps {
  image: File | null;
  setImage: React.Dispatch<React.SetStateAction<File | null>>;
  imageUrl: string;
  setImageUrl: React.Dispatch<React.SetStateAction<string>>;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  image,
  setImage,
  imageUrl,
  setImageUrl,
}) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      console.log({ acceptedFiles });
      setImage(acceptedFiles[0]);
      setImageUrl("");
    },
    [setImage, setImageUrl],
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    maxFiles: 1,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif"],
    },
  });

  return (
    <div>
      <div
        {...getRootProps({
          className: `border rounded py-8 px-6 text-center bg-slate-100 cursor-pointer h20`,
        })}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </div>
      {image?.name && (
        <Stack className="mt-2">
          <Chip label={image?.name} onDelete={() => setImage(null)}></Chip>
        </Stack>
      )}

      <TextField
        label="Image URL (optional)"
        fullWidth
        size="small"
        className="mt-3"
        value={imageUrl}
        onChange={(e) => {
          setImageUrl(e.target.value);
          setImage(null);
        }}
      />
    </div>
  );
};

const NewPostDialog: React.FC<NewPostDialogProps> = ({ userInfo }) => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState("");

  const handleCreateNewPost = async () => {
    if (!content.trim()) {
      alert("Content is required!");
      return;
    }

    try {
      let res;

      if (image) {
        const formData = new FormData();
        formData.append("content", content.trim());
        formData.append("image", image);
        res = await createPost(formData);
      } else {
        res = await createPost({
          content: content.trim(),
          image: imageUrl.trim() || undefined,
        } as any);
      }

      if (res.status === 201) {
        console.log("Post created:", res.data);
        setContent("");
        setImage(null);
        setImageUrl("");
      }
    } catch (error) {
      console.error("Create post error:", error);
    }
  };

  const isValid = !!(content || image);
  return (
    <div>
      <DialogContent>
        <div className="js flex items-center gap-2">
          <Avatar className="!h-8 !w-8 !bg-blue-600">
            {userInfo?.fullName?.[0]?.toUpperCase()}
          </Avatar>
          <p className="font-bold">{userInfo.fullName}</p>
        </div>
        <TextareaAutosize
          minRows={3}
          placeholder="What on your mind?"
          className="mt-4 w-full p-2"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <ImageUploader
          image={image}
          setImage={setImage}
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
        />
      </DialogContent>

      <DialogActions className="!px-6 !pb-3 !pt-0">
        <Button
          className="w-full"
          variant="contained"
          onClick={handleCreateNewPost}
          disabled={!isValid}
        >
          Post
        </Button>
      </DialogActions>
    </div>
  );
};

export default NewPostDialog;
