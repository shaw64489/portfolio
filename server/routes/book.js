const express = require('express');
const router = express.Router();

const bookController = require('../controllers/book');

// add a book
router.post('', bookController.saveBook);

//get all books
router.get('', bookController.getBooks);

//update book
router.patch('/:id', bookController.updateBook);

//delete book
router.delete('/:id', bookController.deleteBook);

module.exports = router;
