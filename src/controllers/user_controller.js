const User = require('../models/user_model')
const bcrypt = require('bcryptjs')
const { createAccessToken } = require('../libs/jwt.sign')

const getUser = async(req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!req.body) {
            return res.status(404).res.json({message: 'user not found'})
        }
        return res.status(200).send({
            id: user._id,
            username: user.username,

        })
    } catch (error) {
        return res.json({
            message: "error on getUser",
            detail: error.message
        })
    }
}

const registerUser = async(req,res) => {
    const { username, password } = req.body
    console.log(username, password)
    try {

        if (username === "" || password === "") {
            return res.status(400).json({
                message: "debes rellenar todos los campos."
            })
        }

        const usernameExists = await User.findOne({ username })
        if (usernameExists) {
            return res.status(400).json({
                message: 'nombre de usuario ya registrado'
            })
        }

        if (password.length < 6) {
            return res.status(400).json({
                message: 'contraseña debe ser mayor a 6 caracteres.'
            })
        }

        const passwordHash = await bcrypt.hash(password, 10)
        console.log(passwordHash)

        const user = await new User({
            username,
            hash: passwordHash
        })
        const newUser = await user.save()

        //create token
        const token = await createAccessToken({id: newUser._id})

        if (newUser){
            return res.json(
                {
                    message: "user created succesfully",
                    detail: {
                        id: newUser._id,
                        username: newUser.username,
                        token: token
                    }
                }
            )
        } else {
            return res.status(400).json({
                message: "user registration failed",
                detail: "unable to create user"
            })
        }

    } catch (error) {
        return res.json({
            message: "error registering new user",
            detail: error.message
        })
    }
}

const loginUser = async(req,res) => {
    const { username, password } = req.body

    try {

        if (username === "" || password === "") {
            return res.status(400).json({
                message: "debes ingresar usuario y contraseña."
            })
        }

        const userFound = await User.findOne({ username })
        if (!userFound) {
            return res.status(400).json({
                message: "usuario no encontrado."
            })
        }

        const isMatch = await bcrypt.compare(password, userFound.hash)

        if (!isMatch) {
            return res.status(400).json({
                message: 'contraseña incorrecta'
            })
        }

        const token = await createAccessToken({ id: userFound._id})

        return res.json({
            message: 'login con exito',
            detail: {
                id: userFound._id,
                username: userFound.username,
                token: token
            }
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }

}

const logoutUser = async(req, res) => {
    try {
        return res.status(200).json({
            message: "sesión cerrada con exito."
        })
    } catch (error) {
        return res.json({
            message: "error in logout",
            detail: error.message
        })
    }
}


module.exports = {registerUser, getUser, loginUser, logoutUser}