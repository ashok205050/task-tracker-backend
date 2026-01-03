const Task = require('../models/Task');

const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find().sort({ createdAt: -1 });
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


const createTask = async (req, res) => {
    try {
        const { title, description, priority, dueDate } = req.body;

        if (!title || !dueDate) {
            return res.status(400).json({ msg: "Title and Due Date are required" });
        }

        const newTask = new Task({ title, description, priority, dueDate });
        const savedTask = await newTask.save();
        res.json(savedTask);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


const updateTask = async (req, res) => {
    try {
        const { status } = req.body;
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id, 
            { status }, 
            { new: true }
        );
        res.json(updatedTask);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


const deleteTask = async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.json({ msg: "Task deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getTasks,
    createTask,
    updateTask,
    deleteTask
};