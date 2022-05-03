// for the Thought model and schema, it must include the following:

//import Schema, model, and Types with it requiring mongoose
const { Schema, model, Types } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

// for the Reaction schema, add the following, 
const reactionSchema = new Schema({
    // reactionId, which will use Mongoose's ObjectId data type, and the Default value is set to a new ObjectId
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    // reactionBody, which will use String, Required, and have a 280 character maximum
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280
    },
    // username, which will use String and Required
    username: {
        type: String,
        required: true
    },
    // createdAt, which will have Data, set the default value to the current timestamp, and will use a getter method to format the timestamp on query
    createdAt: {
        type: Date,
        default: Date.now,
        get: dateCreated => dateFormat(dateCreated)
    }
},
    {
        toJSON: {
            getters: true
        }
    });

// for the schema settings, it won't be a model, but it will be used as the reaction field's subcomment schema in the Thought model

module.exports = reactionSchema;