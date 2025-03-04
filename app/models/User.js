import mongoose from "mongoose";
 
const { Schema } = mongoose;
 
const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            required: false,
        },
        priv: {
            type: String,
            required: false,
        },
    },
    { timestamps: true }
);
 
export default mongoose.models.User || mongoose.model("User", userSchema);