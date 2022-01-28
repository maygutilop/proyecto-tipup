const express = require('express');
const Camarero = require('../models/Camarero');
const CamareroRouter = express.Router();
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);
const jwt = require ("jsonwebtoken");
const tokenValidation = require("../middlewares/tokenValidation");

CamareroRouter.get("/todos", tokenValidation, async (req, res) => {
    let camareros = await Camarero.find({})
    return res.json({
        success: true,
        camareros
    });
});
CamareroRouter.post("/signup", async (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    let password = req.body.password;

    if (!username || !email || !password) {
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

    let camarero;
    try {
        camarero = await Camarero.create({
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
    const token = jwt.sign({id: camarero._id}, "hola", { expiresIn: "1h"});
    res.json({
        auth: true,
        token,
        message: "Creado Correctamente"
    })
});
CamareroRouter.post("/login", async (req, res) => {
    const email = req.body.email;
    let password = req.body.password;

    let camarero;

    try {
        camarero = await Camarero.findOne({email})
    } catch(error) {
            res.status(500).json({
                auth: false,
                message: error.message,
            });
        }
    let hashPass = camarero.password;
    let passwordIsValid = await bcrypt.compare(password, hashPass);

    if (passwordIsValid == false) {
        res.json({
            auth: false,
            message: "la contraseña no es valida",
        });
        return;
    }else {
        const token = jwt.sign({id: camarero._id}, "hola", { expiresIn: "1h"});
        res.json({
            auth: true,
            token,
            message: "Bienvenido a TipUp",
        });
    }
});
CamareroRouter.put("/modcamarero", tokenValidation,  async(req, res) =>{
        try {
            const {username, email, password } = req.body;
            await Camarero.findOneAndUpdate({_id: req.user}, {username, email, password })

            res.json({msg: "Camarero Actualizado Correctamente"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    })
CamareroRouter.post("/crearcamarero", tokenValidation, async (req, res) => {
    const {
        nombre,
        apellido,
        edad,
        categoria,
        jornada,
    } = req.body

    let camarero = new Camarero({
        name: nombre,
        surname: apellido,
        age: edad,
        category: categoria,
        schedule: jornada,
    });
    camarero.save().then(newCamarero => {
        return res.json({
            success: true,
            camarero: newCamarero
        })
    })
});
CamareroRouter.get("/findtips", tokenValidation, async (req, res) => {
    const id = req.body.userid;
try {
    let camarero = await Camarero.findById(id).select("tips")
    return res.json({
        success: true,
        camarero
    });
} catch (err){
    return res.status(400).json({
        success: false,
        message: err.message
    });
}
});
CamareroRouter.get("/find", tokenValidation, async (req, res) => {
    const id = req.user;
try {
    let camarero = await Camarero.findById(id).select("username");

    return res.json({
        success: true,
        camarero
    });
} catch (err){
    return res.status(400).json({
        success: false,
        message: err.message
    });
}
});

module.exports = CamareroRouter;