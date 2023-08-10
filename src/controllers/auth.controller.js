const { PORT, ADMIN_EMAIL } = require("../config/env.config.js")
const SessionDTO = require("../model/DTO/session.dto.js")
const AuthService = require("../services/auth.service.js")
const authService = new AuthService


class AuthController {
    async logOut(req, res, next) {
        authService.logOut(req.session)
        res.redirect('/auth/login')
        next()
    }

    async logInGet(req, res) {
        return res.render('login', {})
    }

    async login(req, res) {
        let clearUser = new SessionDTO(await req.user)
        req.session.user = clearUser
        return res.redirect('/products')
    }

    async registerGet(req, res) {
        return res.render('register', {})
    }

    async register(req, res) {
        let user = req.user.first_name
        return res.render('welcome', { user, PORT })
        //podria agregar una vista de registrado successfull
    }
    async failure(req, res) {
        return res.status(400).send({
            status: 'Something went wrong!',
            msg: `Something went wrong! Try again later`,
        });
    }

}


module.exports = AuthController