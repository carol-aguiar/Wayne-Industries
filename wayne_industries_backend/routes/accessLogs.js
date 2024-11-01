const express = require('express');
const router = express.Router();
const { getAccessLogs, addAccessLog, deleteAccessLog, updateAccessLog } = require('../controllers/accessLogController');

router.get('/', getAccessLogs);

router.post('/', addAccessLog);

router.delete('/:id', deleteAccessLog);

router.put('/:id', updateAccessLog);

module.exports = router;
