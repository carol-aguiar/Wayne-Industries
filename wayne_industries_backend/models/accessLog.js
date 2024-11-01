const mongoose = require('mongoose');

const accessLogSchema = new mongoose.Schema({
    message: { type: String, required: true },
    userId: { type: String, required: true }, 
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('AccessLog', accessLogSchema);
