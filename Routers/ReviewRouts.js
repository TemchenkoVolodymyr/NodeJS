const express = require("express");
const authController = require('../controllesFunctions/userFuncs')
const reviewRouter = express.Router({mergeParams: true});
// mergeParam - дает возможность получать id с другого роута(TourRouts)
const handlerFactory = require('../controllesFunctions/HandlerFactory')
const reviewFunc = require('../controllesFunctions/reviewFuncs')
const reviewSchema = require('../modulesDatabase/reviewsModules')

reviewRouter.route('/')
  .post(reviewFunc.setTourUserIds, reviewFunc.createReview) // Тут добавил middleware setTourUserIds для того что бы передать в функцию createReview две проверки
  .get( reviewFunc.getAllReviews)


reviewRouter.route('/:id')
  .delete(reviewFunc.deleteReview)
  .patch(reviewFunc.updateReview)
  .get(reviewFunc.getReview)
module.exports = reviewRouter;