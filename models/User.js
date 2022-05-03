// to import schema and model, making it require mongoose

// User model in this file, do the following, 

// username, which has String, Unique, Required, and Trimmed. 

// email, which has String, Required, Unique, and must match a valid email address (look into Mongoose's matching validation)

// thoughts, which has an array of _id values referencing the Thought model, and 

// friends, which has an array of _id values referencing the User model (self-reference). For schema settings, create a virtual called friendCount that retrieves the length of the user's friends array field on query

