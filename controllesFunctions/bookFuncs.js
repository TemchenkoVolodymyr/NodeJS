

const Book = require('../modulesDatabase/bookModules')
const factory = require("./HandlerFactory");



exports.getAllBooks = factory.getAllHandler(Book);
exports.createBook = factory.createHandler(Book);
exports.deleteBook = factory.deleteHandler(Book);