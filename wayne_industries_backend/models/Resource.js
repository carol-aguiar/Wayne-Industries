const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true }, 
    status: { type: String, default: 'available' }
});

const Resource = mongoose.models.Resource || mongoose.model('Resource', resourceSchema);

module.exports = Resource;


