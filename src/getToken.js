const  {google} = require('googleapis');
const credentials = require('../OAuthCredentials/oAuth.json')
module.exports = new class OAuth2{
    async getAuth2UserAndToken(server){
        const OAuthClient = new google.auth.OAuth2(
            credentials.web.client_id,
            credentials.web.client_secret,
            credentials.web.redirect_uris[0]
            )
        const scopes = ['https://www.googleapis.com/auth/youtube']
    
        const authorizationUrl = OAuthClient.generateAuthUrl({
            access_type: 'offline',
            scope: scopes,
            include_granted_scopes: true
        })
        console.log('url para o consenso: ' + authorizationUrl)
        return new Promise((resolve, reject) => {
            server.app.get(`/youtube`, (req, res ) => {
                const authCode = req.query.code
                console.log(authCode + 'o código do token')
                res.json({sucesso:true})
                resolve({client: OAuthClient, token: authCode})
            })
    
        })
    }
    async generateAcessToken(client, token) {
        let {tokens} = await client.getToken(token)
        console.log(tokens)
        return new Promise((resolve, reject) => {
            resolve(tokens)
        })
    }
    async setCredentials(tokens, client){
        return new Promise((resolve, reject) => {
            client.setCredentials(tokens)
            resolve(client)
        })
    }
}