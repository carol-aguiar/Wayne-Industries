const express = require('express');
const router = express.Router();
const { getSecurityAlerts, addSecurityAlert, removeSecurityAlert, updateSecurityAlert } = require('../controllers/securityAlertController');

router.get('/', getSecurityAlerts);

router.post('/', addSecurityAlert);

router.delete('/:id', removeSecurityAlert);

router.put('/:id', updateSecurityAlert);

module.exports = router;

