const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Countries', {
    id: {
      type: DataTypes.STRING(3),
      unique: true,
      allowNull: false,
      primaryKey: true,
      validate: {
        min: 3,
        max: 3
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isNotNull(value) {
          if (value === null) {
            throw new Error('It requires a valid name')
          }
        }
      }
    },
    flag: {
      type: DataTypes.STRING,
      allowNull: false
    },
    continent: {
      type: DataTypes.STRING,
      allowNull: false
    },
    population: {
      type: DataTypes.INTEGER
    },
    capital: {
      type: DataTypes.STRING,
      allowNull: false
    },
    subRegion: {
      type: DataTypes.STRING
    },
    area: {
      type: DataTypes.INTEGER,
      allowNull: false,
      get() {
        let km2 = this.getDataValue('area') * 0.000001
        return `${Math.round((km2 + Number.EPSILON) * 100) / 100} km2`
      }
    }
  }, {
    timestamps: false,
    createdAt: false,
    updatedAt: false
  });
};
