import axios from "axios";

const apiUrl = 'http://192.168.0.6'

export default function process({ next, router }) {
    let jwt = sessionStorage.getItem('JWT')
    if(jwt){
        let expirationTime = sessionStorage.getItem('JWTExpTime')
        let currentTime = Math.floor(Date.now() / 1000)
        if(expirationTime < currentTime){
            let result = axios.get(`${apiUrl}/api/v1/auth/doRefresh`)
                .then(function (response) {
                    let accessToken = response.data.AccessToken
                    let refreshToken = response.data.RefreshToken
                    let payload = JSON.parse(atob(accessToken.split('.')[1]))
                    sessionStorage.setItem('JWT', accessToken)
                    sessionStorage.setItem('JWTExpTime', payload.exp)
                    sessionStorage.setItem('UserId', payload.user.UserId)
                    sessionStorage.setItem('UserName', payload.user.UserName)
                    sessionStorage.setItem('UserPermissions', payload.user.UserPermissions)
                    localStorage.setItem('RefreshToken', refreshToken)
                })
            if (result){
                return next();
            }
        }else {
            return next();
        }
    }else {
        return router.push({ name: 'core.authenticate' })
    }
}
