const {Sequelize, DataTypes } = require('sequelize')
const sequelize=require('../db/db')


const Book= sequelize.define('books',
{
    title:{
        type:DataTypes.STRING,
        allowNull: false
    },
    desc: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    imageUrl: { 
        type: DataTypes.STRING,
        
    }

});

module.exports=Book