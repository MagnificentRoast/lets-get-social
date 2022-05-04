// to import schema and model, making it require mongoose
const { Schema, model } = require("mongoose");

// User model in this file, do the following, 
const userSchema = new Schema({
// username, which has String, Unique, Required, and Trimmed. 
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
// email, which has String, Required, Unique, and must match a valid email address (look into Mongoose's matching validation)
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(v) {
                return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(v);
            },
            message: props => `${props.value} is not a valid email!`
    }
},
// thoughts, which has an array of _id values referencing the Thought model, and 
thoughts: [
    // thought model is referenced here using ObjectId
    {
        type: Schema.Types.ObjectId,
        ref: "Thought"
    }
],
// friends, which has an array of _id values referencing the User model (self-reference). For schema settings, create a virtual called friendCount that retrieves the length of the user's friends array field on query
friends: [
    {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
]
},
{
toJSON: {
    virtuals: true,
    getters: true
},
id: false
});

// create a virtual here called friendCount, which will retrieve the length of the friends array field on query
userSchema.virtual("friendCount").get(function() {
    return this.friends.length;
});

// export User.js
module.exports = User;