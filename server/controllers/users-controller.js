const { Users } = require('../models');
const { validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');
const validateDecorator = require('../services/validate-decorator');
const {createToken}= require('../services/auth-service')

function create(req, res, nextparams) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  //res.send(req.body);
  //Есть ли такой пользователь в БД
  Users.findOne({ where: { FIO_User: req.body.FIO_User } })
    .then((user) => {
      if (user) {
        return Promise.reject({
          //прерывает цепочку промисов и переходит на catch
          statusCode: 422,
          message: 'This User ia already used',
        });
      } else {
        // если пользователя нет то создать нового пользователя и передаем что выдернем из боди
        const { FIO_User, Posada_User, Password_User, Name_Region } = req.body;
        const salt = bcryptjs.genSaltSync(10);//соль с 10-ю итерациями
        console.log('Salt: ', salt);
        const passwordHash = bcryptjs.hashSync(Password_User, salt)
        return Users.create({
          FIO_User,
          Posada_User,
          Password_User: passwordHash,
          Name_Region,
        });
      }
    })
    .then((user) => {
      res.json(user);
    })
    .catch((error) => {
      res.status(error.statusCode || 400).json({ error: error.message });
    });
}

function login (req, res, next) {
  const loginUser = req.body;
  Users.login(loginUser).then(createToken).then(token =>{
    res.json({token});
    next();
  }).catch(error =>{
    res.status(401).json({ error});    
  })
//console.log(loginUser);
}


module.exports = validateDecorator ({
  create,
  login
});
