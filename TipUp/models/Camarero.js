const mongoose = require("mongoose");

const CamareroSchema = mongoose.Schema({
    name: {
        type: String,
    },
    surname: {
        type: String,
        
    },
    age: {
        type: Number
    },
    restaurant: {
        type: mongoose.Types.ObjectId,
        ref: "Restaurante"
    },
    category: {
        type: String,
        enum: ['Jefe de sala', 'Encargado', 'Barman', 'Sumiller', 'Camarero', 'Maitre'],
    },
    schedule: {
        type: String,
        enum: ['Mañana', 'Tarde', 'Noche'],
    },
    username: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    tips: {
        type: mongoose.Types.ObjectId,
        ref: "tips"
    }
});
module.exports = mongoose.model("Camarero", CamareroSchema);