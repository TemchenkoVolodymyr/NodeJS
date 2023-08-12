// This is script which working with database mongoDB .  Import or delete data to database
// Call "node import-dev-data.js --delete or --import"     to use this script



const mongoose = require('mongoose');
const fs = require("fs");
const Tour = require('../modulesDatabase/tourModules');
const User = require('../modulesDatabase/userModules');
const Review = require('../modulesDatabase/reviewsModules');


mongoose.connect("mongodb+srv://temcenkovova8:brFMAZAjzkX4ighR@cluster0.4dgfzzn.mongodb.net/natours?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
}).then(() => console.log('DB connection successful'));


// const jsonData = JSON.parse(fs.readFileSync('./dataToursLesson-11.json', "utf-8"));
const jsonReview = JSON.parse(fs.readFileSync('./reviewsNow.json', "utf-8"));
// const jsonUsers = JSON.parse(fs.readFileSync('./users.json', "utf-8"));

const toursData = JSON.parse(fs.readFileSync('./toursNew.json',"utf-8"))

const importData = async () => {

  try {
    await Tour.create(toursData) // Метод добавляет все в базу данных
    console.log('Data was import successful')
  } catch (err) {
    console.log(err)
  }
  process.exit();  // Обьязательно прописываем этот кусок для того что бы остановить процес после создания записи в базе
};

const deleteData = async () => {
  try {
    await Tour.deleteMany(); // этот метод удаляет все что есть в базе данных
    console.log("Data was delete")
  } catch (err) {
    console.log(err)
  }
  process.exit(); // Обьязательно прописываем этот кусок для того что бы остановить процес после удаления записи в базе
}


// Когда запускаю данный файл в консоле (node import-dev-data.js --import/ -- delete) эти два флага в конце я ставлю взависимости что мне надо (удалить или добавить)
// Эти флаги попадают в process.argv начиная с 3 индекса и я могу их читать process.argv
if(process.argv[2] === "--delete"){
  deleteData().catch(err => console.log(err))
}else if(process.argv[2] === "--import"){
  importData().catch(err => console.log(err))
}
