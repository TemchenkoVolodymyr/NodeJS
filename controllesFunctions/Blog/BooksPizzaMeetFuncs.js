

const BooksPizzaMeet = require('../../modulesDatabase/Blog/booksPizzaMeetModules')
const factory = require("../HandlerFactory");



exports.getAllBooksPizza = factory.getAllHandler(BooksPizzaMeet);
exports.createBooksPizza = factory.createHandler(BooksPizzaMeet);
exports.deleteBooksPizza = factory.deleteHandler(BooksPizzaMeet);