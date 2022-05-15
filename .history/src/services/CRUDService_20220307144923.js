import bcrypt from 'bcryptjs'

var salt = bcrypt.genSaltSync(10);


let createNewUser = async (data) => {
    let hashPasswordFormBctypt = await hashUserPassword(data.password);
    console.log(hashPasswordFormBctypt)
    console.log(data)
}

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            var hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword)
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createNewUser
}