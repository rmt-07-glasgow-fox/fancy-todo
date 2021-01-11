const express = require('express');
const router = express.Router();

const requireToken = require('../helpers/requireToken');

const { listProject, invite } = require('../controllers/projectuser');

router.get('/projects', requireToken, listProject);
router.post('/invite', requireToken, invite);

module.exports = router;
