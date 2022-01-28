const jwt = require( "jsonwebtoken");
const { replaceOne } = require("../models/Camarero");

// let tokenValidation = (req, res, next) => {
//     let token = req.headers.token;

    const tokenValidation = (req, res, next) =>{
        try {
            const token = req.header("token")
            if(!token) return res.json({msg: "Invalid Authentication22"})
    
            jwt.verify(token, "hola", (err, decoded) =>{
                if(err) return res.json({msg: "Invalid Authentication"})
    
                req.user = decoded.id
                next()
            })
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }

    // if(!token){
    //     res.json({
    //         auth: false,
    //         message:"no hay token 2"
    //     })
    //     return;
    // }

    // if (token) {
    // jwt.verify(token, "hola", (error, decoded) => {
    //     if(error){
    //         res.json({
    //             auth: false,
    //             message: "Token no valido"
    //         })
    //         return;
    //     } else {
    //         // req.body.userid = decoded.id;
    //         req.user = decoded.id
    //         console.log(decoded)
    //         next();
    //     }
    // });

// else {
//     res.json({
//                 auth: false,
//                 message:"no hay token 2"
//             })
//             return;
// }

module.exports = tokenValidation;