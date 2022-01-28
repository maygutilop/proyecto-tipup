const mongoose = require("mongoose");

const RestauranteSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    zipcode: {
        type: String,
    },
});
module.exports = mongoose.model("Restaurante",RestauranteSchema);