const mongoose = require("mongoose");

const UsuarioSchema = mongoose.Schema({
    name: {
        type: String,
    },
    surname: {
        type: String,
    },
    place: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    username:{
        type: String,
    }
});
module.exports = mongoose.model("Usuario",UsuarioSchema);