const mongoose = require('mongoose')
let videosModel = require('../database/UploadsModel')
let Videos = mongoose.model('VideosUpload', videosModel)
class databaseFunctions {
    async addVideoUploaded(videoName){
        let videos = await Videos.find()
        if (videos.length < 1 && videos != undefined) {
            let video = new Videos({
                VideosUplodated: [{ videoName }]
            })
            video.save(video)
            videos = await Videos.find()
        }
        else {
            let id = videos[0]._id
            let newVideo = videos.push({videoName})
            try {
                await Videos.updateOne({_id: id}, {VideosUplodated: newVideo})
                return videoName
            } catch (error) {
                throw error
            }
        }
    }

    async addVideoNotUploaded(videoName, reason){
        let videos = await Videos.find()
        if (videos.length < 1 && videos != undefined) {
            let video =  new Videos({
                VideosNotUplodated: [{ videoName, reason }]
            })
            video.save(video)
            videos = await Videos.find()
        }
        else {
            let id = videos[0]._id
            let newVideo = videos.push({ videoName, reason })
            try {
                await Videos.updateOne({ _id: id }, { VideosNotUplodated: newVideo })
                return videoName
            } catch (error) {
                throw error
            }
        }
    }
    async verifyVideosUploaded(videoName){
        let videos = await Videos.find()
        return new Promise((resolve, reject) => {
            if (videos.length > 0) {
                let found = videos[0].VideosUplodated.find(video => {
                    return video.videoName === videoName
                })
                if (found) {
                    return reject({err: 'video já foi postado', type: 'verify'})
                }
                else {
                    resolve()
                }
                
            }
            else {
                resolve()
            }
        })
    }
    async verifyVideosNotUploaded(videoName) {
        let videos = await Videos.find()
        return new Promise((resolve, reject) => {
            if (videos.length > 0) {
                let found = videos[0].VideosNotUplodated.find(video => {
                    console.log('analisando', video)
                    return video.videoName === videoName
                })
                if (found) {
                    return reject({err: `já não foi possivel postar esse video antes: ${found.reason}`, type: 'verify'})
                }
                else {
                    resolve()
                }
            }
            else {
                resolve()
            }
        })
    }
}

module.exports = new databaseFunctions