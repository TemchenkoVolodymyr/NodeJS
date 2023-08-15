const path = require('path')
const express = require('express');
const app = express();
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH");
  next();
});

app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'))

app.use(express.static(path.join(__dirname,'public')))
const morgan = require("morgan");

const rateLimit = require('express-rate-limit') // npm i limiter // С помощю этой библиотеки мы можем настроить колличество запросов за один час
const helmet = require('helmet'); // npm i helmet
const ErrorHandler = require('./Errors/ErrorHandler');
const errorMidl = require('./Errors/errorMiddlewera')
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');


// NDB - tools который помогает работать с ошибками в Node.js
// npm i ndb
//  in package.json I should write this code ---- "debug": "ndb server.js";

//morgan
// npm i morgan (помогает свободней работать с middleware)

// 1) MIDDLEWARE

/////////////////
// SET HELMET SECURITY HTTP
app.use(helmet())
/////////////////


////////////// DEVELOPMENT LOGIN
app.use(morgan('dev'))
//////////////

//////////////////////// SET LIMIT requests
const limiter = rateLimit({
  max: 400,
  windowMs:60*60*1000,    // Тут указываем время через которое лимит обновится
  message:"Too many requests, try again later" // сообщение в случае превышения лимита
});
app.use('/api',limiter) // все адресса которые начинаются с /api будут иметь лимит
/////////////////////////



app.use(express.json()) // this is middleware , which give to us opportunity working between req and res


///////////////////////////// DATA SANITIZATION Эти фн помогают против хакера
app.use(mongoSanitize()); // Этот мидлвера проверяет что бы был введен логин
app.use(xss()) // Этот помогает от атак хакера
/////////////////////////////
// this is middleware  как он работает :
app.use((req, res, next) => {
  req.requestTime = new Date().toLocaleDateString();
  next();
})


// 3) ROUTES
const tourRouter = require('./Routers/TourRouts');
const userRouter = require('./Routers/UserRouts');
const reviewRouter = require('./Routers/ReviewRouts');
const bookRouter = require('./Routers/BookRouts');
const hireMeRouter = require("./Routers/HireMeRouts");
const pizzaRouter = require("./Routers/Pizza/PizzaRouts");
const drinkRouter = require("./Routers/Pizza/ItemDrinkRouts");
const burgerRouter = require("./Routers/Pizza/itemBurgerRouts");
const pastaRouter = require("./Routers/Pizza/itemPastaRouts");
const blogRouter = require("./Routers/Blog/BlogRouts")
const arabicMeetRouter = require("./Routers/Blog/ArabicMeetRouts")
const booksPizzaRouter = require("./Routers/Blog/BooksPizzaRouts")
const formRouter = require("./Routers/Form/FormRouts")


app.use("/api/v1/tours", tourRouter);
app.use('/api/v1/users', userRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/book", bookRouter);
app.use("/api/v1/hireMe", hireMeRouter);
app.use("/api/v1/pizza", pizzaRouter);
app.use("/api/v1/drink", drinkRouter);
app.use("/api/v1/pasta", pastaRouter);
app.use("/api/v1/burger", burgerRouter);
app.use("/api/v1/italianMeet", blogRouter);
app.use("/api/v1/arabicMeet", arabicMeetRouter);
app.use("/api/v1/booksPizzaMeet", booksPizzaRouter);
app.use("/api/v1/form", formRouter);



// 4) ERROR HANDLER
//
// Метод all добавляет этот код для каждого запроса (get,put,delete,post)
app.all('*', (req, res,next) => {
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH");
  next(new ErrorHandler(`Url with this path ${req.originalUrl} doesnt exist`),404);
})


// Error middleware
// Если в метод use передать 4 параметра то Express автоматические принимает это за метод ошибки
app.use(errorMidl)


module.exports = app;