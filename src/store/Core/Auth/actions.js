import axios from 'axios'

const apiUrl = 'http://192.168.0.6'

export const doAuthAction = ({ commit }, payload ) => {
    return axios.get(`${apiUrl}/api/v1/auth/doAuth`, { params: { userName: payload.userName, userPassword: payload.userPassword } })
        .then(function (response) {
            return response.data
        }).then(tokens => {
            commit('DO_AUTH', tokens)
        })
        .catch(function (error) {
            console.log(error)
        })
}
