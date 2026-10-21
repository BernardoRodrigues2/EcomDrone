const { DataTypes } = require('sequelize')

const db = require('../db/conn')

const Drone = db.define('drone',{
    codDrone: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    modelo: {
        type: DataTypes.STRING(50),
        allowNull: false
    },

    marca: {
        type: DataTypes.STRING(30),
        allowNull: false
    },

    numSerie: {
        type: DataTypes.STRING(255),
        allowNull: false
    },

    tipo: {
        type: DataTypes.STRING(60),
        allowNull: false
    },

    idCliente: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'clientes',
            key: 'codCliente'
        }
    }

},{
    timestamps: false,
    tableName: 'drones'
})

module.exports = Drone;