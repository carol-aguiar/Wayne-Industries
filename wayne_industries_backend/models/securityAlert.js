const mongoose = require('mongoose');

const securityAlertSchema = new mongoose.Schema({
    description: { type: String, required: true },
    severity: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SecurityAlert', securityAlertSchema);

