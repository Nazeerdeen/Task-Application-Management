const express = require('express');
const router = express.Router();
const Task = require('../models/Task'); // Import your Task model
const authMiddleware = require('../middleware/auth'); // Import your authentication middleware

// Middleware to check authentication for all task routes below
router.use(authMiddleware);

// GET all tasks for the logged-in user
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user._id });
        res.json(tasks);
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: error.message });
    }
});

// POST a new task
router.post('/', async (req, res) => {
    const task = new Task(req.body);
    task.user = req.user._id;  // Associate the task with the logged-in user
    try {
        const newTask = await task.save();
        res.status(201).json(newTask); // 201 Created
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
});

// GET tasks with search and/or priority filter
router.get('/search', async (req, res) => {
    const { search, priority } = req.query;
    const query = { user: req.user._id };

    if (search) {
        query.title = { $regex: search, $options: 'i' }; // Case-insensitive search
    }

    if (priority && priority !== 'All') {
        query.priority = priority;
    }

    try {
        const tasks = await Task.find(query);
        res.json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});


// PATCH to update a task
router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const updatedTask = await Task.findByIdAndUpdate(id, req.body, { new: true, runValidators: true }); // Validate updates
        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json(updatedTask);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
});

// DELETE a task
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedTask = await Task.findByIdAndDelete(id);
        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(204).end(); // 204 No Content
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;