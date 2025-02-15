const mongoose = require('mongoose');

// Check if the model is already compiled before defining it
let Task; // Declare Task outside the if block

try {
  Task = mongoose.model('Task'); // Try to retrieve the existing model
} catch (error) {
  // If the model hasn't been compiled yet, define it
  const taskSchema = new mongoose.Schema({
    title: String,
    description: String,
    deadline: Date,
    priority: String,
    assignedTo: String,
    completed: { type: Boolean, default: false },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  });

  Task = mongoose.model('Task', taskSchema);
}

module.exports = Task;