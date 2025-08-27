import mongoose, { Schema, Document } from "mongoose";

export interface IPost extends Document {
  content: string;
  image?: string;
  author: mongoose.Types.ObjectId;
  comments: Array<{
    user: mongoose.Types.ObjectId;
    text: string;
    createdAt: Date;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

const PostSchema: Schema = new Schema(
  {
    content: { type: String, required: true },
    image: { type: String },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // likes: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }], // Using separate Like collection
    comments: [
      {
        user: { type: Schema.Types.ObjectId, ref: "User" },
        text: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<IPost>("Post", PostSchema);
