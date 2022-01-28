const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require ("cors")
require("dotenv").config();


const CamareroRouter = require("./api/CamareroRouter");
const PropinaRouter = require('./api/PropinaRouter');
const RestauranteRouter = require('./api/RestauranteRouter');
const UsuarioRouter = require('./api/UsuarioRouter');

const PORT = process.env.PORT || 5000;
const {DB_URI} = process.env;

mongoose.connect(DB_URI, {
        useCreateIndex: true,
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
    .then(() => {
        console.log("DB connected");
    }).catch(err => {
        console.log(err);
    });

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(cors());
app.get("/ruta", (req, res) => {
    res.json("este es el contenido que devolvemos");
});

app.get("/", (req, res) => {
    return res.send({
        success: true,
        message: "hola"
    });
});
app.use("/camareros", CamareroRouter);
app.use("/usuarios", UsuarioRouter);
app.use("/restaurantes", RestauranteRouter);
app.use("/propinas", PropinaRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// app.post("/create", (req, res) => {
//     let obj = {
//         Nombre: "Daniel",
//         Apellido: "Gutierrez",
//         Edad: "25"
//     }
//     fs.writeFile(`./camareros/${Date.now()}.json`, JSON.stringify(obj), (err) => {
//         if (err) {
//             return res.send({
//                 success: false,
//                 message: err
//             })
//         }
//         return res.send("creado correctamente");
//     });
// });
// app.post("/create", (req, res) => {
//     let obj = {
//         nombre: "Juan Carlos",
//         poblacion: "Quito"
//     }
//     fs.writeFile(`./data/${Date.now()}.json`, JSON.stringify(obj), (err) => {
//         if (err) {
//             return res.send({
//                 success: false,
//                 message: err
//             })
//         }
//        return res.send("creado correctamente");
//     });
// });
