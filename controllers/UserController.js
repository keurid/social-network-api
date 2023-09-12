const User = require('../models/User');

const userController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getUserById: async (req, res) => {
    try {
      const userId = req.params.userId;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  createUser: async (req, res) => {
    try {
      const { username, email } = req.body;
      const user = new User({ username, email });
      await user.save();
      res.status(201).json(user);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  updateUser: async (req, res) => {
    try {
      const userId = req.params.userId;
      const updates = req.body;
      const user = await User.findByIdAndUpdate(userId, updates, { new: true });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const userId = req.params.userId;
      const user = await User.findByIdAndRemove(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      // Optionally, remove user's associated thoughts here
      res.json({ message: 'User deleted' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  addFriend: async (req, res) => {
    try {
      const userId = req.params.userId;
      const friendId = req.params.friendId;

      // Update the user's friend list with the friendId
      await User.findByIdAndUpdate(userId, { $push: { friends: friendId } });

      res.json({ message: 'Friend added' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  removeFriend: async (req, res) => {
    try {
      const userId = req.params.userId;
      const friendId = req.params.friendId;

      // Remove the friendId from the user's friend list
      await User.findByIdAndUpdate(userId, { $pull: { friends: friendId } });

      res.json({ message: 'Friend removed' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

module.exports = userController;
