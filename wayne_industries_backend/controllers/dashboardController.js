const AccessLog = require('../models/accessLog'); 
const Resource = require('../models/Resource'); 
const Alert = require('../models/alert'); 

exports.getAccessLogs = async (req, res) => {
    try {
        const logs = await AccessLog.find(); 
        res.json(logs);
    } catch (error) {
        console.error('Error fetching access logs:', error);
        res.status(500).send('Internal Server Error');
    }
};

exports.getResourceStatus = async (req, res) => {
    try {
        const resources = await Resource.find(); 
        res.json(resources);
    } catch (error) {
        console.error('Error fetching resource status:', error);
        res.status(500).send('Internal Server Error');
    }
};

exports.getSecurityAlerts = async (req, res) => {
    try {
        const alerts = await Alert.find();
        res.json(alerts);
    } catch (error) {
        console.error('Error fetching security alerts:', error);
        res.status(500).send('Internal Server Error');
    }
};
