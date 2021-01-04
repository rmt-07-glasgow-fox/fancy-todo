const express = require('express');
const router = express.Router();

const {
  list,
  create,
  detail,
  update,
  updateStatus,
  destroy,
} = require('../controllers/todo');

router.get('/', list);
router.post('/', create);
router.get('/:id', detail);
router.put('/:id', update);
router.patch('/:id', updateStatus);
router.delete('/:id', destroy);

module.exports = router;
