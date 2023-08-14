const express = require('express');
const Auth = require('../middlewares/auth.js');
const auth = new Auth;
const authRouter = express.Router();
const passport = require('passport');
const AuthController = require('../controllers/auth.controller.js');
const CartsController = require('../controllers/carts.controller.js');
const cartsController = new CartsController
const authController = new AuthController


authRouter.get('/logOut', cartsController.returnCartStock, authController.logOut)

authRouter.get('/login', auth.denieUsersInSession, authController.logInGet)

authRouter.post('/login', auth.denieUsersInSession, passport.authenticate('login', { failureRedirect: '/auth/fail' }), authController.login)

authRouter.get('/register', auth.denieUsersInSession, authController.registerGet)

authRouter.post('/register', auth.denieUsersInSession, passport.authenticate('register', { failureRedirect: '/auth/fail' }), authController.register)

authRouter.get('/fail', authController.authFailure)

module.exports = authRouter;