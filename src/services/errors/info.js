class GenerateErrorCauses {
    userEmail(email) {
        return `The email you typed '${email}' does not correspond to an email scheme. Here is an example of how an email should look like: 'example@gmail.com'`
    }

    
}


module.exports = GenerateErrorCauses