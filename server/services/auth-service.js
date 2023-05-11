const jwt = require('jsonwebtoken');
const config = require('../config/config');

//Создание токена
function createToken(userFromDB){
const token = jwt.sign({ id: userFromDB.dataValues.id }, config.secret, {
    expiresIn: 86400
})
return token;
}

//Сервис по верификации пользователя, получаем токен от пользователя и проверять правильность этого токена
function verifyToken(req,res,next){
    let token;
    //токен будем передавать в заголовке запроса header
    if (req.headers['autorization']) token = req.headers['autorization'];
    if (token) {
       token = token.replace(/bearer|jwt\s+/i, '');
       jwt.verify(token, config.secret, (err, decodedToken)=>{
            if (err) {
                res.status(401).json({error: "Failed to authenticate token"})
                return;
            }
            //если токен правильный то запишем инфу об id пользователя
            req.userId = decodedToken.id;
            next();//и передаем управление дальше
       }) 
    } else {
        res.status(401).json({error: "No token provided"})
    }
     
}

module.exports = {
    createToken,
    verifyToken
}
