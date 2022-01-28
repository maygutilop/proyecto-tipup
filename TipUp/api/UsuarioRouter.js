const express = require('express');
const Usuario = require('../models/Usuario');
const UsuarioRouter = express.Router();
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);
const jwt = require ("jsonwebtoken");
const tokenValidation = require("../middlewares/tokenValidation");

UsuarioRouter.get("/todos", tokenValidation, async (req, res) => {
    let usuarios = await Usuario.find({})
    return res.json({
        success: true,
        usuarios
    });
});
UsuarioRouter.get("/find", tokenValidation, async (req, res) => {
    const id = req.user;
try {
    let usuario = await Usuario.findById(id).select("username");

    return res.json({
        success: true,
        usuario
    });
} catch (err){
    return res.status(400).json({
        success: false,
        message: err.message
    });
}
});
UsuarioRouter.post("/modusuario", tokenValidation, async(req, res) =>{
    try {
        const {email, password, username } = req.body;
        await Usuario.findOneAndUpdate({_id: req.user}, {email, password, username})

        res.json({msg: "Usuario Actualizado Correctamente"})

    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
})
UsuarioRouter.post("/signup", async (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    let password = req.body.password;

    if (!username || !email || !password ) {
        res.status(400).json({
            auth: false,
            message: "llenar username, email y password"
        });
        return;
    }

    if (password.length < 8) {
        res.status(400).json({
            auth: false,
            message: "la contraseña necesita 8 caracteres"
        });
        return;
    }
    password = bcrypt.hashSync(password, salt);

    let usuario;
    try {
        usuario = await Usuario.create({
            username,
            email,
            password,
        });
    } catch(error) {
            res.status(500).json({
                auth: false,
                token: null,
                message: error.message,
            })
            return;
        }
    const token = jwt.sign({id: usuario._id}, "hola", { expiresIn: "1h"});
    res.json({
        auth: true,
        token,
        message: "Creado Correctamente"
    })
});
UsuarioRouter.post("/login", async (req, res) => {
    const email = req.body.email;
    let password = req.body.password;

    let usuario;

    try {
        usuario = await Usuario.findOne({email})
    } catch(error) {
            res.status(500).json({
                auth: false,
                message: error.message,
            });
        }
    let hashPass = usuario.password;
    let passwordIsValid = await bcrypt.compare(password, hashPass);

    if (passwordIsValid == false) {
        res.json({
            auth: false,
            message: "la contraseña no es valida",
        });
        return;
    }else {
        const token = jwt.sign({id: usuario._id}, "hola", { expiresIn:"1h"});
        res.json({
            auth: true,
            token,
            message: "Bienvenido a TipUp",
        });
    }
});
UsuarioRouter.post("/", tokenValidation, async (req, res) => {
    const {
        nombre,
        apellido,
        lugar,
        email,
        contraseña
    } = req.body

    let usuario = new Usuario({
        name: nombre,
        surname: apellido,
        place: lugar,
        email,
        password: contraseña,
    });
    usuario.save().then(newUsuario => {
        return res.json({
            success: true,
            usuario: newUsuario
        })
    })
});

module.exports = UsuarioRouter;