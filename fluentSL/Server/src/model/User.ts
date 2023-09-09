import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const User = new Schema({
    Title:String,
    Description:String,
    Date:Date
});

const UserModel = mongoose.model("User",User);

export default UserModel;