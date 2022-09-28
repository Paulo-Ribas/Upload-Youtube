const {google} = require('googleapis');
const YTB = google.youtube('v3')
class Youtube {
    async StartUpload(video, title){
        let videoFileSize = video.size
        let requestParameter = {
            resource: {
                // Video title and description
                snippet: {
                    title: title
                    , description: "video uplodado pela minha API boy"
                }
                // I don't want to spam my subscribers
                , status: {
                    privacyStatus: "private"
                }
            }
            // This is for the callback function
            , part: "snippet,status"

            // Create the readable stream to upload the video
            , media: {
                body: video.video
            }
        }
        function onUploadProgress(event){
            const progress = Math.round(event.bytesRead / videoFileSize * 100)
        }
        return new Promise((resolve, reject) => {
            YTB.videos.insert(requestParameter, {onUploadProgress: onUploadProgress}, (err, data) => {
                if(err){
                    console.log('foi até aqui?')
                    console.log(err)
                   return reject({title, err})
                }
                console.log('ou aqui?')
                resolve({title, data})});
        })
    }
}

module.exports = new Youtube