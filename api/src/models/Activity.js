const { DataTypes } = require('sequelize')

module.exports = (sequielize) => {
    sequielize.define('Activities', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING
        },
        difficulty: {
            type: DataTypes.INTEGER,
            validate: {
                min: 1,
                max: 5
            }
        },
        duration: {
            type: DataTypes.BIGINT
        },
        season: {
            type: DataTypes.ENUM('Primavera', 'Verano', 'Otoño', 'Invierno')
        }
    }, {
        timestamps: false,
        createdAt: false,
        updatedAt: false
    });
}