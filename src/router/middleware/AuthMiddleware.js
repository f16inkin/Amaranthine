import axios from "axios";

const apiUrl = 'http://192.168.0.6'

const test = async () => {
    let promise1 = new Promise(function(resolve, reject) {
        setTimeout(() => resolve(sessionStorage.getItem('JWTExpTime')), 3000);
    });
    let result1 = await promise1
    console.log(result1)
    let promise2 = new Promise(function(resolve, reject) {
        setTimeout(() => resolve("done! after 6 secs"), 1000);
    });
    let result2 = await promise2
   console.log(result2)
}

const setStorage = (payload, accessToken, refreshToken) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            sessionStorage.setItem('JWT', accessToken)
            sessionStorage.setItem('JWTExpTime', payload.exp)
            sessionStorage.setItem('AccountId', payload.accountId)
            sessionStorage.setItem('AccountPermissions', payload.accountPermissions)
            sessionStorage.setItem('Talons', payload.talons)
            localStorage.setItem('RefreshToken', refreshToken)
            resolve();
        }, 5000)
    })
    /*sessionStorage.setItem('JWT', accessToken)
    sessionStorage.setItem('JWTExpTime', payload.exp)
    sessionStorage.setItem('AccountId', payload.accountId)
    sessionStorage.setItem('AccountPermissions', payload.accountPermissions)
    sessionStorage.setItem('Talons', payload.talons)
    localStorage.setItem('RefreshToken', refreshToken)*/
}

const refreshTokens = async(oldRefreshToken) => {
    try {
        console.log('Start requesting new pare of tokens')
        let result = await axios.get(`${apiUrl}/api/v1/auth/doRefresh`, { params: {RefreshToken: oldRefreshToken}})
        console.log('Finish requesting new pare of tokens')
        let newAccessToken = result.data.AccessToken
        let newRefreshToken = result.data.RefreshToken
        let payload = await JSON.parse(atob(newAccessToken.split('.')[1]))
        console.log('Start setting storage')
        await setStorage(payload, newAccessToken, newRefreshToken)
        console.log('Finish setting storage')
    }catch (e) {
        //console.log(e)
    }
}

export default async function process({next, router}) {
    let currentAccessToken = sessionStorage.getItem('JWT')
    let currentRefreshToken = localStorage.getItem('RefreshToken')
    let accessTokenExpTime = sessionStorage.getItem('JWTExpTime');
    let currentTime = Math.floor(Date.now() / 1000)
    console.log(accessTokenExpTime + ' accessTokenExpTime')
    console.log(currentTime + ' currentTime')
    if (currentAccessToken){
        if (accessTokenExpTime <= currentTime){
            //try {
                /*console.log('Start requesting new pare of tokens')
                let result = await axios.get(`${apiUrl}/api/v1/auth/doRefresh`, { params: {RefreshToken: currentRefreshToken}})
                console.log('Finish requesting new pare of tokens')
                let newAccessToken = result.data.AccessToken
                let newRefreshToken = result.data.RefreshToken
                let payload = await JSON.parse(atob(newAccessToken.split('.')[1]))
                console.log('Start setting storage')
                await setStorage(payload, newAccessToken, newRefreshToken)
                console.log('Finish setting storage')*/
                await refreshTokens(currentRefreshToken)
                console.log('refreshed')
                return next()
            //}catch(e){
            //    console.log(e.response)
            //}
        }else {
            return next()
        }
    }else {
        if (currentRefreshToken){
            axios.get(`${apiUrl}/api/v1/auth/doRefresh`, { params: {RefreshToken: currentRefreshToken}})
                .then(function (response) {
                    let accessToken = response.data.AccessToken
                    let refreshToken = response.data.RefreshToken
                    let payload = JSON.parse(atob(accessToken.split('.')[1]))
                    sessionStorage.setItem('JWT', accessToken)
                    sessionStorage.setItem('JWTExpTime', payload.exp)
                    sessionStorage.setItem('AccountId', payload.accountId)
                    //sessionStorage.setItem('UserName', payload.user.UserName)
                    sessionStorage.setItem('AccountPermissions', payload.accountPermissions)
                    sessionStorage.setItem('Talons', payload.talons)
                    localStorage.setItem('RefreshToken', refreshToken)
                }).then(function (){
                return router.push({ name: 'app.desktop' })
            })
        }else{
            return router.push({ name: 'core.authenticate' })
        }
    }
}

/*export default function process({ next, router }) {
    let jwt = sessionStorage.getItem('JWT')
    let currentRefreshToken = localStorage.getItem('RefreshToken')
    let promise1 = new Promise(function(resolve, reject) {
        setTimeout(() => resolve(sessionStorage.getItem('JWTExpTime')), 1000);
    });
    console.log('Start')
    //let expirationTime = await promise1
    let expirationTime = sessionStorage.getItem('JWTExpTime') - 10;
    let expirationTimeReal = sessionStorage.getItem('JWTExpTime');
    let currentTime = Math.floor(Date.now() / 1000)
    console.log(expirationTimeReal + ' expTimeReal')
    console.log(expirationTime + ' expTime')
    console.log(currentTime + ' current Time')
    if(jwt){
        if(expirationTime < currentTime){
            console.log('requestimg refresh toke with axios')
            axios.get(`${apiUrl}/api/v1/auth/doRefresh`, { params: {RefreshToken: currentRefreshToken}})
                .then(function (response) {
                    let accessToken = response.data.AccessToken
                    let refreshToken = response.data.RefreshToken
                    let payload = JSON.parse(atob(accessToken.split('.')[1]))
                    sessionStorage.setItem('JWT', accessToken)
                    sessionStorage.setItem('JWTExpTime', payload.exp)
                    sessionStorage.setItem('AccountId', payload.accountId)
                    //sessionStorage.setItem('UserName', payload.user.UserName)
                    sessionStorage.setItem('AccountPermissions', payload.accountPermissions)
                    sessionStorage.setItem('Talons', payload.talons)
                    localStorage.setItem('RefreshToken', refreshToken)
                }).then(function () {
                return next()
            }).catch(error =>{
                console.log(error.response)
            })
        }else {
            return next();
        }
    }else {
        if (currentRefreshToken){
            axios.get(`${apiUrl}/api/v1/auth/doRefresh`, { params: {RefreshToken: currentRefreshToken}})
                .then(function (response) {
                    let accessToken = response.data.AccessToken
                    let refreshToken = response.data.RefreshToken
                    let payload = JSON.parse(atob(accessToken.split('.')[1]))
                    sessionStorage.setItem('JWT', accessToken)
                    sessionStorage.setItem('JWTExpTime', payload.exp)
                    sessionStorage.setItem('AccountId', payload.accountId)
                    //sessionStorage.setItem('UserName', payload.user.UserName)
                    sessionStorage.setItem('AccountPermissions', payload.accountPermissions)
                    sessionStorage.setItem('Talons', payload.talons)
                    localStorage.setItem('RefreshToken', refreshToken)
                }).then(function (){
                return router.push({ name: 'app.desktop' })
            })
        }else{
            return router.push({ name: 'core.authenticate' })
        }
    }
}*/
