// models/Otp.ts
import mongoose, { Document, Schema } from "mongoose";

export interface IOtp extends Document {
  email: string;
  otp: string;
  createdAt: Date;
  verified: boolean;
}

const otpSchema = new Schema<IOtp>({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 30,
  },
  verified: { type: Boolean, default: false },
});

const OtpModel = mongoose.model<IOtp>("Otp", otpSchema);

export default OtpModel;
