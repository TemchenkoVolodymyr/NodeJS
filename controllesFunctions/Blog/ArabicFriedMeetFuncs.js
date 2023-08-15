

const ArabicMeet = require('../../modulesDatabase/Blog/arabicMeetModules')
const factory = require("../HandlerFactory");



exports.getAllArabicMeets = factory.getAllHandler(ArabicMeet);
exports.createArabicMeet = factory.createHandler(ArabicMeet);
exports.deleteArabicMeet = factory.deleteHandler(ArabicMeet);