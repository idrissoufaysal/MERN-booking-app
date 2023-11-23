const {Sequelize}=require('sequelize')

const sequelize=  new Sequelize('Book_app','root','',{dialect : 'mysql', host:'localhost'})

module.exports=sequelize