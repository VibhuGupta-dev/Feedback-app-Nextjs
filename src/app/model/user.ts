import mongoose, { Schema, Document, Model } from "mongoose";

export interface Message extends Document {
    content: string;
    createdAt: Date;
}

const MessageSchema: Schema<Message> = new Schema({
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    }
});

export interface User extends Document {
    username: string;
    email: string;
    password: string;
    messages: Message[];
    createdAt: Date;
    updatedAt: Date;
    verifyCode: string;
    verifyCodeExpires: Date;
    isAcceptingMessages: boolean;
    isVerified: boolean;
}

const UserSchema: Schema<User> = new Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,      
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Email is invalid'],
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
    verifyCode: {
        type: String,
        required: [true, 'Verification code is required'],
    },
    verifyCodeExpires: {
        type: Date,
        required: [true, 'Verification code expiration is required'],
    },
    isAcceptingMessages: {
        type: Boolean,
        default: true,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    messages: [MessageSchema],
});

// ✅ Correct model export with hot-reload protection
const UserModel: Model<User> = mongoose.models.User || mongoose.model<User>("User", UserSchema);

export default UserModel;