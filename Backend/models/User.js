import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number },
    created_at: { type: Date, default: Date.now },
    source: {
        source_name: { type: String, default: null },
        source_lists: [{ type: String, default: [] }]
    }
});

// Define and export the User model
const User = mongoose.model('User', UserSchema);
export default User;
