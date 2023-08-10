const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2')

const userCollection = 'users'

const userSchema = new mongoose.Schema({
    first_name: { type: String, required: true, max: 100 },
    last_name: { type: String, required: true, max: 100 },
    email: { type: String, required: true, max: 100, unique: true },
    age: { type: Number, required: false, max: 100, default: 0 },
    password: { type: String, required: true, max: 100 },
    cart: { type: mongoose.Schema.Types.ObjectId, ref: 'carts', default: [] },
    role: { type: String, required: true, max: 100, default: 'user' },
});

userSchema.plugin(mongoosePaginate);

const userModel = mongoose.model(userCollection, userSchema);
module.exports = userModel;