const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const app = require('./index')

                                               // MONGOOSE
mongoose.connect("mongodb+srv://temcenkovova8:brFMAZAjzkX4ighR@cluster0.4dgfzzn.mongodb.net/natours?retryWrites=true&w=majority",{
  useNewUrlParser:true,
  useCreateIndex:true,
  useFindAndModify:false,
}).then(() => console.log('DB connection successful'));


// const myNewTour = new Tour({
//   name:"Avatar",
//   price:50
// })
//
// myNewTour.save().then(doc => { // метод save сохраняет данные в базу данных
//   console.log(doc)
// }).catch(error => {
//   console.log(error)
// })


// прослушка порта
app.listen(port, () => {
  console.log(`App running on ${port}...`)
});