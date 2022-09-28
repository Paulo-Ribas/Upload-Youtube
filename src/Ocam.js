const fsPromisse = require('fs/promises')
const fs = require('fs')
class Ocam {
    async getOcamFiles(caminho) {
        let videos = await fsPromisse.readdir(caminho)
        console.log('lendo arquvios do ocam')
        return new Promise((resolve, reject) => {
            resolve(videos)
        })

    }
    async filterVideosFormat(videos){
        let videosMP4 = videos.filter(video => {
            return video.split('.')[1] === 'mp4' && video.split('.').length === 2
        })
        return new Promise((resolve, reject) => {
            resolve(videosMP4)
        })
    }
    async CreateMidia(path, videos, i = 0) {
        return new Promise((resolve, reject) => {
            console.log('transformando o video em um arquivo legivel...', path)
            let video = fs.createReadStream(`${path}/${videos[i]}`)
            let size =  fs.statSync(`${path}/${videos[i]}`).size
            if(i <= videos.length){
                return resolve({video: video, i: i+= 1, size: size})
            }
            return resolve('done')
            
        })
    }
}

module.exports = new Ocam