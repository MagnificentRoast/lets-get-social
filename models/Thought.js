// for the Thought model and schema, it must include the following:

//import Schema, model, and Types with it requiring mongoose
const { Schema, model, Types } = require("mongoose");
const dateFormat = require("../utils/dateFormat");
const reactionSchema =  require('./Reaction')
// for the schema settings, it won't be a model, but it will be used as the reaction field's subcomment schema in the Thought model

// thought schema
const thoughtSchema = new Schema({
    // thoughtText, which will use Sttring, Required, and it has a minimum length of 1 with a max length of 280
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    // createdAt, which will use Date, the fefault will be date.now, and it will show an updated timestamp upon query
    createdAt: {
        type: Date,
        default: Date.now,
        get: dateCreated => dateFormat(dateCreated)
    },
    // username, which will use String, and Required
    username: {
        type: String,
        required: true
    },
    // references the reactionSchema
    reactions: [reactionSchema]
},
    // for toJSON, it will use virtuals, and getters. After the closing curly bracket, you'll see it has no id for this virtual
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

// thoughtSchema virtual goes here, it'll get and return the reactions.
thoughtSchema.virtual("reactionCount").get(function() {
    return this.reactions.length;
});
// model creation
const Thought = model("Thought", thoughtSchema);
// exports Thought.js

module.exports = Thought;
