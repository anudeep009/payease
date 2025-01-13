import mongoose, { Schema } from "mongoose";

const accountSchema = new Schema({
    userid : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true,
    },
    balance : {
        type : Number,
        required : true
    }
})

const Account = mongoose.model("Account",accountSchema);

export default Account;