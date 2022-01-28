const mongoose = require("mongoose");

const PropinaSchema = mongoose.Schema({
    camarero: {
        type: mongoose.Types.ObjectId,
        ref: "Camarero"
    },
    restaurante: {
        type: mongoose.Types.ObjectId,
        ref: "Restaurante"  
    },
    usuario: {
        type: mongoose.Types.ObjectId,
        ref: "Usuario"   
    },
    tips: {
        type: Number
    },
});
module.exports = mongoose.model("Propina",PropinaSchema);