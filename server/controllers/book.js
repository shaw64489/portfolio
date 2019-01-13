
//Models
const Book = require('../models/book');

// get all books
exports.getBooks = (req, res) => {
  // find all books
  Book.find({}, (err, allBooks) => {
    if (err) {
      return res.status(422).send(err);
    }

    return res.json(allBooks);
  });
};

// add and save book
exports.saveBook = (req, res) => {
  const bookData = req.body;
  const book = new Book(bookData);

  book.save((err, createdBook) => {
    if (err) {
      return res.status(422).send(err);
    }

    return res.json(createdBook);
  });
};

// update a book by id
exports.updateBook = (req, res) => {
  const bookId = req.params.id;
  const bookData = req.body;

  Book.findById(bookId, (err, foundBook) => {
    if (err) {
      return res.status(422).send(err);
    }

    foundBook.set(bookData);
    foundBook.save((err, savedBook) => {
      if (err) {
        return res.status(422).send(err);
      }

      return res.json(savedBook);
    });
  });
};

// delete a book by ID
exports.deleteBook = (req, res) => {
  const bookId = req.params.id;

  Book.deleteOne({ _id: bookId }, (err, deletedBook) => {
    if (err) {
      return res.status(422).send(err);
    }

    return res.json({ status: 'DELETED' });
  });
};
