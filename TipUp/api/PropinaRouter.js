const express = require('express');
const Propina = require('../models/Propina');
const PropinaRouter = express.Router();
const tokenValidation = require("../middlewares/tokenValidation");

PropinaRouter.get("/", tokenValidation, async (req, res) => {
    let propinas = await Propina.find({})
    return res.json({
        success: true,
        propinas
    });
});
PropinaRouter.get("/enviadas", tokenValidation, async (req, res) => {
    const id = req.user;
try {
    let propina = await Propina.find({usuario:id});

    return res.json({
        success: true,
        propina
    });
} catch (err){
    return res.status(400).json({
        success: false,
        message: err.message
    });
}
});
PropinaRouter.post("/crearpropina/:camareroId", tokenValidation, async (req, res) => {

    const {camareroId} = req.params
    const {tips} = req.body;
    const usuarioId = req.user;

     let propina = new Propina({
         camarero: camareroId,
         usuario: usuarioId,
         tips,
     });
     propina.save().then(newPropina => {
         return res.json({
             success: true,
             propina: newPropina
         })
     })
});
PropinaRouter.get("/recibidas", tokenValidation, async (req, res) => {
    const id = req.user;
try {
    let propina = await Propina.find({camarero:id});

    return res.json({
        success: true,
        propina
    });
} catch (err){
    return res.status(400).json({
        success: false,
        message: err.message
    });
}
});


module.exports = PropinaRouter;