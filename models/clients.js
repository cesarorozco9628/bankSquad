'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Clients extends Model {
    
    static associate(models) {
      
    }
  };
  Clients.init({
    first_name: DataTypes.STRING,
    lats_name: DataTypes.STRING,
    email: DataTypes.STRING,
    telephone: DataTypes.INTEGER
  }, {
    sequelize,
    underscored: true,
    modelName: 'Clients',
  });
  return Clients;
};