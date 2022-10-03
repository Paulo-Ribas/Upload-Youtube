const express = require('express')
const app = express()
const axios = require('axios')

class Server{
    async startServer(){
        return new Promise((resolve, reject) => {
            let server = app.listen(3338, ()=> {
                console.log('iniciamos o servidor para o começo de um ou mais upload de um video')
            })
            resolve({server, app})
            
        })
    }
    async stopServer(webServer){
        return new Promise((resolve, reject) => {
            webServer.server.close()
            resolve()
        
        })

    }
    async request(){
            try{
                let request = await axios.get('http://localhost:3338/')
                return request
            }
            catch(err){
                throwerr
            }

    }
}

module.exports = new Server