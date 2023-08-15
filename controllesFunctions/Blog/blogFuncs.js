

const Blog = require('../../modulesDatabase/Blog/blogModules')
const factory = require("../HandlerFactory");



exports.getAllBlogs = factory.getAllHandler(Blog);
exports.createBlog = factory.createHandler(Blog);
exports.deleteBlog = factory.deleteHandler(Blog);