const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        userName: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: [validateEmail, 'Please fill a valid email address'],
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        },
        thoughts: [
            {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
            }
        ],      
        friends: [
            {
            type: Schema.Types.ObjectId,
            ref: 'User',
            }
        ]
    }
);

userSchema.virtual('friendcount').get(function () {
    return this.friends.length;
});

const User = model('user', userSchema);

module.exports = User;