function promiseError(error, statusCode = 500){
    //проверим или error передается как строка, то сгенерируем на основе этой строки новую ошибку, если нет то возвращаем обратно
    error = (typeof error === 'string') ? new Error(error) : error;
    //проверка или наш error является экземпляром класса Error
    if (error instanceof Error) {
        error.statusCode = statusCode;
        return Promise.reject(error);
    }else{ //если не является экземплятром то генерим ошибку по умолчанию
        const e = new Error('Server error');
        e.statusCode = 500;
        return Promise.reject(e);
    }
}

module.exports = {
    promiseError
}