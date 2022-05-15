import bcrypt from 'bcryptjs'
import db from '../models/index';

const salt = bcrypt.genSaltSync(10);


let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPasswordFormBctypt = await hashUserPassword(data.password);
            await db.user.create({
                email: DataTypes.STRING,
                password: DataTypes.STRING,
                firstName: DataTypes.STRING,
                lastName: DataTypes.STRING,
                address: DataTypes.STRING,
                phonenumber: DataTypes.STRING,
                gender: DataTypes.BOOLEAN,
                image: DataTypes.STRING,
                roleId: DataTypes.STRING,
                positionId: DataTypes.STRING,
            })
        } catch (e) {
            reject(e)
        }
    })
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