const express = require('express');
const router = express.Router();

const requireToken = require('../helpers/requireToken');

const { list, create, destroy } = require('../controllers/project');

router.get('/', requireToken, list);
router.post('/', requireToken, create);
router.delete('/:id', requireToken, destroy);

module.exports = router;
