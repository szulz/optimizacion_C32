
class AuthService {
    async logOut(session) {
        return session.destroy()
    }
}

module.exports = AuthService