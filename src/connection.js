const mongoose = require('mongoose')
module.exports = function connectMongoDB(){
    return new Promise((resolve, reject) => {
        mongoose.connect('mongodb://localhost:27017/videosUpload')
        .then(y => {
            console.log('conectado ao bando de dados')
            resolve()
        })
        .catch(e => {
            console.log(e)
        })
    })
    
    
}
