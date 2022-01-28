const express = require('express');
const Restaurante = require('../models/Restaurante');
const RestauranteRouter = express.Router();
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);
const jwt = require ("jsonwebtoken");
const tokenValidation = require("../middlewares/tokenValidation");

RestauranteRouter.get("/todos",tokenValidation, async (req, res) => {
    let restaurantes = await Restaurante.find({})
    return res.json({
        success: true,
        restaurantes
    });
});
RestauranteRouter.put("/modrestaurante", tokenValidation, async(req, res) =>{
    try {
        const {name, zipcode } = req.body;
        await Restaurante.findOneAndUpdate({_id: req.user}, {name, zipcode})

        res.json({msg: "Usuario Actualizado Correctamente"})
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
})
RestauranteRouter.post("/crearrestaurante", async (req, res) => {
    const{name, zipcode} = req.body

     let restaurante = new Restaurante({
         name,
         zipcode,
     });
     restaurante.save().then(newRestaurante => {
         return res.json({
             success: true,
             usuario: newRestaurante
         })
     })
    });

module.exports = RestauranteRouter;