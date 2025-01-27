const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

router.post('/', itemController.createItem);
router.get('/', itemController.getItems);
router.get('/search', itemController.searchItems);
router.put('/:id', itemController.updateItem);

module.exports = router;