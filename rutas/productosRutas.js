var rutaP = require("express").Router();
var subirArchivo=require("../middlewares/middleware").subirArchivo;
var fs = require("fs");
var path= require("path");
var { mostrarProductos, nuevoProducto, buscarPorIdP, modificarProducto, borrarProducto } = require("../bd/productosBD");
const { log } = require("console");

rutaP.get("/mostrarProductos", async (req, res) => {
    try {
        const prods = await mostrarProductos();
        console.log("Productos obtenidos:", prods);
        res.render("productos/mostrarP", { prods });
    } catch (error) {
        console.error("Error al mostrar productos:", error);
        res.status(500).send("Error al mostrar productos");
    }
});

rutaP.get("/nuevoProducto", (req, res) => {
    res.render("productos/nuevoP");
});

rutaP.post("/nuevoProducto", subirArchivo(), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send("No file was uploaded.");
        }

        req.body.foto = req.file.originalname;
        var error = await nuevoProducto(req.body);

        if (error) {
            console.error("Error creating a new prod:", error);
            return res.status(500).send("Error creating a new prod.");
        }

        res.redirect("/");
    } catch (error) {
        console.error("An unexpected error occurred:", error);
        res.status(500).send("An unexpected error occurred.");
    }
});

rutaP.post("/nuevoProducto", async (req, res) => {
    try {
        const error = await nuevoProducto(req.body);
        console.log(error);
        res.redirect("/mostrarProductos");
    } catch (error) {
        console.error("Error al crear un nuevo producto:", error);
        res.status(500).send("Error al crear un nuevo producto");
    }
});

rutaP.get("/editarProducto/:id",async(req,res)=>{
    var prod= await buscarPorIdP(req.params.id);
    res.render("productos/modificarP",{prod});
});

rutaP.post("/editarProducto",subirArchivo(), async (req,res)=>{
    try {
            var rutaImagen = path.join(__dirname, "..", "web", "images", req.body.foto);
            if (fs.existsSync(rutaImagen)) {
                fs.unlinkSync(rutaImagen);
                req.body.foto= req.file.originalname;
                await modificarProducto(req.body);
            }
        
        res.redirect("/");
    } catch (error) {
        console.error("Error al editar producto:", error);
    }

});



rutaP.get("/borrarProducto/:id", async (req, res) => {
    try {
        await borrarProducto(req.params.id);
        res.redirect("/mostrarProductos");
    } catch (error) {
        console.error("Error al borrar el producto:", error);
        res.status(500).send("Error al borrar el producto");
    }
});

module.exports = rutaP;
