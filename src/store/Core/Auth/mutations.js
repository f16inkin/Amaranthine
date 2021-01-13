import router from '../../../router'
export const DO_AUTH = (state, tokens) => {
    console.log(tokens)
    let accessToken = tokens.AccessToken
    let refreshToken = tokens.RefreshToken
    let payload = JSON.parse(atob(accessToken.split('.')[1]))
    sessionStorage.setItem('JWT', accessToken)
    sessionStorage.setItem('JWTExpTime', payload.exp)
    sessionStorage.setItem('UserId', payload.user.UserId)
    sessionStorage.setItem('UserName', payload.user.UserName)
    sessionStorage.setItem('UserPermissions', payload.user.UserPermissions)
    sessionStorage.setItem('UserTalons', payload.user.UserTalons)
    localStorage.setItem('RefreshToken', refreshToken)
    router.push({ name: 'app.desktop' })
}
