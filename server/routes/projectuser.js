const express = require('express');
const router = express.Router();

const requireToken = require('../helpers/requireToken');

const { listProject } = require('../controllers/projectuser');

router.get('/projects', requireToken, listProject);

module.exports = router;
