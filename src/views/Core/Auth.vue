<template>
    <div class="wrapper">
        <div class="login">
            <div class="login-screen">
                <div class="app-title">
                    <h1>Авторизация в системе</h1>
                </div>

                <div class="login-form">
                    <div class="control-group">
                        <input type="text" class="login-field" v-model="userName" placeholder="Имя пользователя" id="login-name">
                        <label class="login-field-icon fui-user" for="login-name"></label>
                    </div>

                    <div class="control-group">
                        <input type="password" class="login-field" v-model="userPassword" placeholder="Пароль" id="login-pass">
                        <label class="login-field-icon fui-lock" for="login-pass"></label>
                    </div>
                    <a class="btn btn-primary btn-large btn-block" @click="doAuth()">Войти</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { ref } from 'vue'
    import { useStore } from 'vuex'
    import Button from "primevue/components/button/Button";
    export default {
        name: "Auth",
        components: {Button},
        setup () {
            const store = useStore()
            const userName = ref('')
            const userPassword = ref('')
            const doAuth = () => {
                store.dispatch('auth/doAuthAction', { userName: userName.value, userPassword: userPassword.value })
            }
            return {
                userName,
                userPassword,
                doAuth
            }
        }
    }
</script>

<style scoped>
    .wrapper {
        font-family: Arial;
        background-color: #db3434;
        padding: 50px;
        min-height: 100vh;
    }
    .login {
        margin: 20px auto;
        width: 400px;
    }
    .login-screen {
        background-color: #FFF;
        padding: 20px;
        border-radius: 5px
    }

    .app-title {
        text-align: center;
        color: #777;
    }

    .login-form {
        text-align: center;
    }
    .control-group {
        margin-bottom: 10px;
    }

    input {
        text-align: center;
        background-color: #ECF0F1;
        border: 2px solid transparent;
        border-radius: 3px;
        font-size: 16px;
        font-weight: 200;
        padding: 10px 0;
        width: 350px;
        transition: border .5s;
    }

    input:focus {
        border: 2px solid #3498DB;
        box-shadow: none;
    }

    .btn {
        border: 2px solid transparent;
        background: #db3434;
        color: #ffffff;
        font-size: 16px;
        line-height: 25px;
        padding: 10px 0;
        text-decoration: none;
        text-shadow: none;
        border-radius: 3px;
        box-shadow: none;
        transition: 0.25s;
        display: block;
        width: 350px;
        margin: 0 auto;
    }

    .btn:hover {
        background-color: #2980B9;
        cursor: pointer;
    }

    .login-link {
        font-size: 12px;
        color: #444;
        display: block;
        margin-top: 12px;
    }
</style>
