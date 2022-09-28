const VideosOcamFunctions = require('./Ocam')
const UploadFunctions = require('./UploadFunctions')
const databaseFunctions = require('./uploadDataBase')
const Server = require('./server')
const connectionMongoDB = require('./connection')
const OAuth2Functions = require('./getToken')
const {google} = require('googleapis');
let result
async function StartUpload(caminho, server){
    let path = caminho
    try {
        let ocamFiles = await VideosOcamFunctions.getOcamFiles(path)
        let videos = await VideosOcamFunctions.filterVideosFormat(ocamFiles)
        let video = await VideosOcamFunctions.CreateMidia(path, videos, result || 0)
        /* await databaseFunctions.verifyVideosNotUploadated(videos[result])
        await databaseFunctions.verifyVideosUploadated(videos[result]) */
        let uploaded = await UploadFunctions.StartUpload(video, videos[result || 0])
        /* let VideoUplodated = await databaseFunctions.addVideoNotUploadated(videos[result || 0]) */
        console.log('foi postado com sucesso no youtube')
        result = video.i
        while (result != 'done') {
            console.log('estamos no video ' + result + ' de ' + videos.length)
            return StartUpload('C:/Users/paulo/OneDrive/Documents/oCam/', google)
        }
        await Server.stopServer(server)
        return new Promise((resolve, reject) => {
            resolve()
        })
    } catch (error) {
        let ocamFiles = await VideosOcamFunctions.getOcamFiles(path)
        let videos = await VideosOcamFunctions.filterVideosFormat(ocamFiles)
        let video = await VideosOcamFunctions.CreateMidia(path, videos, result || 0)
       /*  let VideoNotUplodated = await databaseFunctions.addVideoUploadated(videos[result || 0], error.err) */
        console.log(' não foi postado no youtube, motivo -> ' + error.err)
        result = video.i
        while (result != 'done') {
            console.log(result)
            return StartUpload('C:/Users/paulo/OneDrive/Documents/oCam/')
        }
        await Server.stopServer(server)
        return new Promise((resolve, reject) => {
            resolve()
        })
    }
    
    
}

async function StartAll(path){ 
    try {
        let servidor = await Server.startServer()
        await connectionMongoDB()
        let dates = await OAuth2Functions.getAuth2UserAndToken(servidor)
        let tokens = await OAuth2Functions.generateAcessToken(dates.client, dates.token)
        let client = await OAuth2Functions.setCredentials(tokens, dates.client)
        google.options({
                auth:client
            })
        await StartUpload(path, servidor)
        console.log('script encerrado')

    }
    catch(err) {
        console.log(err)
    }


}
StartAll('C:/Users/paulo/OneDrive/Documents/oCam/')