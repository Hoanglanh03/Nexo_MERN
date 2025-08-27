import mongoose, { Schema, Document } from "mongoose";

export interface ILike extends Document {
  post: mongoose.Types.ObjectId; 
  user: mongoose.Types.ObjectId; 
  createdAt: Date;
}

const likeSchema = new Schema<ILike>(
  {
    post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export default mongoose.model<ILike>("Like", likeSchema);
