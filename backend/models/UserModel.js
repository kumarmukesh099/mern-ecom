import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
},
    { timestamps: true }
    )


//we can also define methods heres
userSchema.methods.matchPass = async function(enterPassword){
    return await bcrypt.compare(enterPassword,this.password);
}

//like a prehook
// userSchema.pre('save',async function(next){
//     if(!this.isModified('password')){
//         next();
//     }
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password,salt)  

// })

export default mongoose.model("User", userSchema);