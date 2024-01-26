const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
mongoose.connect("mongodb+srv://Shivam:itsbeens0long@cluster0.ezyirm3.mongodb.net/Paytm")

const userSchema = new mongoose.Schema({
    Username:String,
    Firstname:String,
    Lastname:String,
    password:String
})
const User = mongoose.model('User',userSchema)

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to User model
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
});

const Account = mongoose.model('Account', accountSchema);


userSchema.methods.createHash = async (plaintext)=>{
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(plaintext,salt);
}

module.exports = {
    User,
    Account
}