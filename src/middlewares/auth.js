const { ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_STATUS } = require("../config/env.config.js");

class Auth {
    async connectionCheck(req, res, next) {
        try {
            let email = req.session.user.email;
            if (email == undefined || email == false) {
                console.log('no estás logeado');
                return res.redirect('/auth/register')
            }
            console.log('estas log');
            return next()
        } catch (e) {
            console.log('no hay user en la session');
            return res.redirect('/auth/register')
        }
    }

    async currentSession(req, res, next) {
        if (req.session.user) {
            console.log('ya estas logeado');
            return res.redirect('/products')
        }
        console.log('podes loguearte/registrarte');
        return next()
    }

    async isAdmin(req, res, next) {
        console.log('estás en el isadmin');
        if (req.user.role == 'admin') {
            console.log('Seguí crack');
            return next();
        } else {
            throw new Error({ message: 'You have no permission to make perform these actions' })
        }
    }

    async denieUsersInSession(req, res, next) {
        if (req.session.user) {
            //hacer handler?
            
            console.log('There is a current session active');
            return res.redirect('/products')
        }
        return next()
    }

    async allowUsersInSession(req, res, next) {
        if (req.session.user) {
            console.log('There is a current session active');
            return next()
        }
        return res.redirect('/auth/login')
    }

    async isUserCart(req, res, next) {
        if (req.params.cid === req.session.user.cartID) {
            console.log('cart validation');
            return next()
        }
        return res.redirect('/auth/fail')

    }

    async blockAdmin(req, res, next) {
        if (req.user.role == 'admin') {
            console.log('necesitas ser user');
            return res.send({ message: 'Admins have not permission to do this' })
        }
        return next();
    }
}


module.exports = Auth;