const router = require('express').Router();
const Thought = require('../models/Thought');
const User = require('../models/User');

// GET all route for all thoughts
router.get('/', (req, res) => {
    Thought.find({})
    .select('-__v')
    .sort({_id: -1})
    .then(thoughtData => res.json(thoughtData))
    .catch((err) => {
        console.log(err);
        res.status(400).json(err);
    });
})

// GET single thought by thought ID
router.get('/:id', (req, res) => {
    Thought.findOne({
        _id: req.params.id
    })
    .select('-__v')
    .then((thoughtData) => {
        if (!thoughtData) {
            res.status(404).json("No thought found with that ID");
            return;
        }
        res.json(thoughtData);
    })
    .catch((err) => {
        console.log(err);
        res.status(400).json(err);
    });
});

// POST a new thought
router.post('/', (req, res) => {
    Thought.create(req.body)
    .then(({username, _id}) => {
        return User.findOneAndUpdate(
            {username: username},
            {$push: {thoughts: _id}},
            {new: true}
        );
    })
    .then(userData => res.json(userData))
    .catch((err) => {
        console.log(err)
        res.status(400).json(err)
    });
});

// PUT update a single thought by ID
router.put('/:id', (req, res) => {
    Thought.findOneAndUpdate(
        {
            _id: req.params.id
        },
        req.body,
        {
            new: true
        }
    )
    .select('-__v')
    .then(thoughtData => {
        if (!thoughtData) {
            res.status(400).json("No thought found with that ID");
            return;
        }
        res.json(thoughtData);
    })
    .catch((err) => {
        console.log(err);
        res.status(400).json(err);
    });
});

// DELETE a thought by ID
router.delete("/:id", (req, res) => {
    Thought.findOneAndDelete({_id: req.params.id})
    .then(thoughtData => {
        if (!thoughtData) {
            res.status(400).json("No thought found with that ID");
            return;
        }
        res.json(thoughtData);
    })
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
});


// REACTION ROUTE SECTION

// POST a new reaction to a thought by ID
router.post("/:thoughtId/reactions", ({params, body}, res) => {
    // Searches for an ID in the Thought model, captures it, then...
    Thought.findOneAndUpdate(
        {_id: params.thoughtId},
        {$push: {reactions: body}},
        {new: true}
    )
    // Then it will update the thought data, for line 107, this is if there isn't an ID that matches in the search
    .then(thoughtData => {
        if (!thoughtData) {
            res.status(404).json({message: "No thought found with that ID"});
            return;
        }
        res.json(thoughtData);
    })
    .catch(err => res.json(err));
});

// DELETE a reaction from a thought by ID
router.delete('/:thoughtID/reactions/:reactionID', (req, res) => {
    Thought.findOneAndDelete(
        {_id: req.params.thoughtID},
        {$pull: {reactions: {_id: req.params.reactionID}}},
        {new: true}
    )
    .then(thoughtData => res.json(thoughtData))
    .catch(err => res.json(err));
});

module.exports = router;