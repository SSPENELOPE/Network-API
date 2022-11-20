const { Thought, User } = require('../models')

module.exports = {
    getThoughts(req,res) {
        Thought.find()
        .then(async (thoughts) => {
            const thoughtObj = {
                thoughts,
            };
            return res.json(thoughtObj)
        })
        .catch((err) => {
            console.log(err)
            return res.status(500).json(err);
        })
    },

    getSingleThought(req,res) {
        Thought.findOne({ _id: req.params.thougthId })
        .select('-__v')
        .then(async (thought) => 
            !thought
            ? res.status(404).json({ message: 'No thought with that ID' })
            : res.json({
                thought,
                username: await username(req.params.thoughtId)
              })
        )
        .catch((err) => {
          console.log(err);
          return res.status(500).json(err);
        });
    },

    createThought(req,res) {
        Thought.create(req.body)
        .then((thought) => res.json(thought))
        .catch((err) => res.status(500).json(err));
    },

    updateThought(req,res) {
        Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $set: req.body },
          { runValidators: true, new: true }
        )
          .then((thought) =>
            !thought
              ? res.status(404).json({ message: 'No thought with this id!' })
              : res.json(thought)
          )
          .catch((err) => res.status(500).json(err));
      },

      deleteThought(req,res) {
        Thought.findOneAndRemove({ _id: req.params.thoughtId })
          .then((thought) =>
          !thought
          ? res.status(404).json({ message: 'No such thought exists' })
          : res.json({ message: 'Thought Successfully Deleted!' }) 
          )
      
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
      },
}