const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const authRoutes = require('./routes/auth');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connection established successfully'))
  .catch(err => console.log(err));

// Define your Mongoose schema (models) - It's best practice to define this in a separate file (models/Task.js)
const taskSchema = new mongoose.Schema({
    title: String,
    description: String,
    deadline: Date,
    priority: String,
    assignedTo: String,
    completed: { type: Boolean, default: false },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // Reference to the user who created the task
});

const Task = mongoose.model('Task', taskSchema); // If you define models here, make sure it's done only once.

// Import routes AFTER the model is defined (and only once)
const taskRoutes = require('./routes/tasks'); // Import your task routes
app.use('/api/tasks', taskRoutes); // Use the task routes
app.use('/api/auth', authRoutes); // Use the authentication routes (if separate)

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});