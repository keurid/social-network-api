const Thought = require('../models/Thought');

const thoughtController = {
  getAllThoughts: async (req, res) => {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getThoughtById: async (req, res) => {
    try {
      const thoughtId = req.params.thoughtId;
      const thought = await Thought.findById(thoughtId);
      if (!thought) {
        return res.status(404).json({ error: 'Thought not found' });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  createThought: async (req, res) => {
    try {
      const { thoughtText, username } = req.body;
      const thought = new Thought({ thoughtText, username });
      await thought.save();
      res.status(201).json(thought);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  updateThought: async (req, res) => {
    try {
      const thoughtId = req.params.thoughtId;
      const updates = req.body;
      const thought = await Thought.findByIdAndUpdate(thoughtId, updates, { new: true });
      if (!thought) {
        return res.status(404).json({ error: 'Thought not found' });
      }
      res.json(thought);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  deleteThought: async (req, res) => {
    try {
      const thoughtId = req.params.thoughtId;
      const thought = await Thought.findByIdAndRemove(thoughtId);
      if (!thought) {
        return res.status(404).json({ error: 'Thought not found' });
      }
      res.json({ message: 'Thought deleted' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

module.exports = thoughtController;