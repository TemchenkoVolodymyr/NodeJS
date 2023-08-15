const express = require("express");

const pizzaRouter = express.Router({mergeParams: true});
// mergeParam - дает возможность получать id с другого роута(TourRouts)

const pizzaFunc = require('../../controllesFunctions/Pizza/pizzaFuncs')


pizzaRouter.route('/')
  .post(pizzaFunc.createPizza)
  .get(pizzaFunc.getAllPizzas)


// pizzaRouter.route('/:id')
//   .get(pizzaFunc.getAllBooks)
//   .delete(pizzaFunc.deleteBook)


module.exports = pizzaRouter;