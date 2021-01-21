import {doRefresh} from "../../services/RefreshTokens";

export default async function process({next, router}) {
    let currentAccessToken = sessionStorage.getItem('JWT')
    if (currentAccessToken){
        return next()
    }
    else {
        let currentRefreshToken = localStorage.getItem('RefreshToken')
        if (currentRefreshToken){
            await doRefresh(currentRefreshToken);
            console.log('Y\'ll be redirecting after 3 seconds')
            await new Promise((resolve, reject) => setTimeout(resolve, 3000));
            return router.push({ name: 'app.desktop' })
        }else{
            return router.push({ name: 'core.authenticate' })
        }
    }
}
/*export default async function process({next, router}) {
    let currentAccessToken = sessionStorage.getItem('JWT')
    let currentRefreshToken = localStorage.getItem('RefreshToken')
    let accessTokenExpTime = sessionStorage.getItem('JWTExpTime');
    let currentTime = Math.floor(Date.now() / 1000)
    console.log(accessTokenExpTime + ' accessTokenExpTime')
    console.log(currentTime + ' currentTime')
    if (currentAccessToken){
        if (accessTokenExpTime <= currentTime){
            await doRefresh(currentRefreshToken)
            console.log('Tokens have been refreshed')
            return next()
        }else {
            return next()
        }
    }else {
        if (currentRefreshToken){
            await doRefresh(currentRefreshToken);
            console.log('Yll be redirecting after 3 seconds')
            await new Promise((resolve, reject) => setTimeout(resolve, 3000));
            return router.push({ name: 'app.desktop' })
        }else{
            return router.push({ name: 'core.authenticate' })
        }
    }
}*/
