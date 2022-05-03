const { User, Thought } = require('../models');

const userController = {

    // GET /api/users
    getAllUsers(req, res) {
        User.find({})
        .select('-__v')
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
    },

    // GET /api/users/:id
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
        .populate('thoughts')
        .populate('friends')
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({message: 'No user found with this id'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    // POST /api/users
    // expected body:
    // {
    //     "username": "foo",
    //     "email": "bar@baz.com"  // must follow the email format
    // }
    createUser({ body }, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err));
    },

    // PUT /api/users/:id
    // expected body includes at least one of the attributes below:
    // {
    //     "username": "foo",
    //     "email": "bar@baz.com"  // must follow the email format
    // }
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },

    // DELETE /api/users/:id
    deleteUser({ params }, res) {
        // delete the user
        User.findOneAndDelete({ _id: params.id })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id'});
                return;
            }
         
        
                // remove any comments from this user
                return Thought.deleteMany({ _id : {$in: dbUserData.thoughts} })
                .then(() => {
                    res.json({message: "Successfully deleted user"});
                })
                .catch(err => res.status(400).json(err));
          
        })
        .catch(err => res.status(400).json(err));
    },

    // POST /api/users/:userId/friends/:friendId
    addFriend({ params }, res) {
        // add friendId to userId's friend list
        User.findOneAndUpdate(
            { _id: params.userId },
            { $addToSet: { friends: params.friendId } },
            { new: true, runValidators: true }
        )
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this userId' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },

    // DELETE /api/users/:userId/friends/:friendId
    deleteFriend({ params }, res) {
        // remove friendId from userId's friend list
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendId } },
            { new: true, runValidators: true }
        )
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this userId' });
                return;
            }
           res.json(dbUserData);
        })
        .catch(err => res.json(err));
    }
}

module.exports = userController;