const mongoose = require('mongoose')
let videosModel = require('../database/UploadsModel')
let Videos = mongoose.model('videosUpload', videosModel)
class databaseFunctions {
    async addVideoUploadated(videoName){
        let videos = await Videos.find()
        if (videos.length < 1 && videos != undefined) {
            let video = await new Videos.model({
                VideosUplodated:[{videoName}]
            })
            await Videos.Save(video)
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

    async addVideoNotUploadated(videoName, reason){
        let videos = await Videos.find()
        if (videos.length < 1 && videos != undefined) {
            let video = await new Videos.model({
                VideosNotUplodated: [{ videoName, reason }]
            })
            await Videos.Save(video)
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
    async verifyVideosUploadated(videoName){
        let videos = await Videos.find()
        console.log(videos)
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
    async verifyVideosNotUploadated(videoName) {
        console.log('not uploadated')
        let videos = await Videos.find()
        console.log(videos)
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