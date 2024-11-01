const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const { getAccessLogs } = require('../controllers/accessLogController');
const securityAlertController = require('../controllers/securityAlertController'); 
const accessLogRoutes = require('./accessLogs');

router.get('/access-logs', getAccessLogs);

router.get('/access-logs', dashboardController.getAccessLogs);

router.get('/resource-status', dashboardController.getResourceStatus);

router.get('/security-alerts', securityAlertController.getSecurityAlerts); 

router.use('/access-logs', accessLogRoutes);

module.exports = router;
