class SessionsController {
    user(req, res) {
        req.session.user = req.user
        return res.redirect('/products')
    }

    returnUser(req, res) {
        let user = req.user
        return res.status(200).send({
            status: 'Success',
            payload: user
        });
    }
}

module.exports = SessionsController