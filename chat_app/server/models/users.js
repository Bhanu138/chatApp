import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, "Name is required"],
        minlength : [6, "Name must be greater than or equal to 6 characters"],
        unique : true,
    },
    email : {
        type : String,
        validate : [validator.isEmail, "Email is not valid"],
        required : true,
        unique : true,
    },
    password : {
        type : String,
        minlength : [6, "Password should be greater than 6 characters"],
        select : false
    }
});

userSchema.pre('save', async function() {
    let salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

userSchema.statics.login = async function(email, password){
    const user = await this.findOne({ email }).select("+password");
    console.log(user);
    if(user){
        const auth = await bcrypt.compare(password, user.password);
        if(auth)
            return user;
        throw Error("Incorrect password");
    }
    throw Error("User with this email not exists");
}

const User = new mongoose.model('User', userSchema);

export default User;