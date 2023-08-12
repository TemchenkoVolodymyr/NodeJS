

const Hire = require('../modulesDatabase/hireMeModules')
const factory = require("./HandlerFactory");



// exports.getAllBooks = factory.getAllHandler(Hire);
exports.setNewOrder = factory.createHandler(Hire);
exports.getOrders = factory.getAllHandler(Hire)
// exports.deleteBook = factory.deleteHandler(Hire);