const { Users } = require('../models');
const { validationResult } = require('express-validator');

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
        return Users.create({
          FIO_User,
          Posada_User,
          Password_User,
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

module.exports = {
  create,
};
