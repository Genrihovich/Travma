//'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Users.init({
    FIO_User: DataTypes.STRING,
    Posada_User: DataTypes.STRING,
    Password_User: DataTypes.STRING,
    Name_Region: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Users',
  });

  Users.login = function(loginUser){

  }
 // console.log(Users);
  return Users;
};