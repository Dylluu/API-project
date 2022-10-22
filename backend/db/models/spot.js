'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Spot.belongsTo(models.User, {
        foreignKey: 'ownerId'
      })
      Spot.hasMany(models.SpotImage, {
        foreignKey: 'spotId'
      })
      Spot.hasMany(models.Booking, {
        foreignKey: 'spotId'
      })
      Spot.hasMany(models.Review, {
        foreignKey: 'spotId'
      })
    }
  }
  Spot.init({
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: 'Street address is required'
        },
        len: {
          args: [1, 254],
          msg: 'Address is required'
        }
      }
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'City is required'
        },
        len: {
          args: [1, 254],
          msg: 'City is required'
        }
      }
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'State is required'
        },
        len: {
          args: [1, 254],
          msg: 'State is required'
        }
      }
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Country is required'
        },
        len: {
          args: [1, 254],
          msg: 'Country is required'
        }
      }
    },
    lat: {
      type: DataTypes.FLOAT,
      allowNull: true,
      validate: {
        max: {
          args: [90],
          msg: 'Latitude is not valid'
        },
        min: {
          args: [-90],
          msg: 'Latitude is not valid'
        }
      }
    },
    lng: {
      type: DataTypes.FLOAT,
      allowNull: true,
      validate: {
        max: {
          args: [180],
          msg: 'Longitue is not valid'
        },
        min: {
          args: [-180],
          msg: 'Longitude is not valid'
        }
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Name is required'
        },
        len: {
          args: [1, 50],
          msg: 'Name must be between 1 and 50 characters'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Description is required'
        },
        len: {
          args: [1, 254],
          msg: 'Description must be between 1 and 255 characters'
        }
      }
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Price per day is required'
        },
        len: {
          args: [1, 254],
          msg: 'Price per day is required'
        },
        min: {
          args: [1],
          msg: "Price per day cannot be lower than 1"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};
