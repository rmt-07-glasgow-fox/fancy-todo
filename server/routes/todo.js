const express = require('express');
const router = express.Router();
const requireToken = require('../helpers/requireToken');

const {
  list,
  listByProject,
  create,
  detail,
  update,
  updateStatus,
  destroy,
} = require('../controllers/todo');

router.get('/', requireToken, list);
router.get('/project/:idProject', requireToken, listByProject);
router.post('/', requireToken, create);
router.get('/:id', requireToken, detail);
router.put('/:id', requireToken, update);
router.patch('/:id', requireToken, updateStatus);
router.delete('/:id', requireToken, destroy);

module.exports = router;
