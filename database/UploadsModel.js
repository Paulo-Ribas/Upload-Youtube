const mongoose = require('mongoose')
const UploadModel = new mongoose.Schema({
    VideosUplodated: Array,
    VideosNotUplodated: Array
})

module.exports = UploadModel