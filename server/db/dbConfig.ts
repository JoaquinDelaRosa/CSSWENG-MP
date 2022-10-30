const { Sequelize, DataTypes } = require('sequelize');


let DATABASE_URL = "postgres://autoworks:password@localhost:5432/AutoworksDB"

const sequelize = new Sequelize(DATABASE_URL);

try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error("Sequelize error" + error);
}