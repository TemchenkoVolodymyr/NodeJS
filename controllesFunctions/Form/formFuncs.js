

const Form = require('../../modulesDatabase/Form/formModules')
const factory = require("../HandlerFactory");




exports.getForm = factory.getAllHandler(Form);
exports.createForm = factory.createHandler(Form);
exports.deleteForm = factory.deleteHandler(Form);