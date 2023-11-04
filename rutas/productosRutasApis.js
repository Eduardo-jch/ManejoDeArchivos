var ruta = require("express").Router();
var { mostrarProductos, nuevoProducto, buscarPorIdP, modificarProducto, borrarProducto } = require("../bd/productosBD");
var { buscarPorIdP } = require("../bd/productosBD");

ruta.get("/api/mostrarProductos",async (req,res)=>{
    var prod=await mostrarProductos();
    if(prod.length > 0){
    res.status(200).json(prod);
    }
    else{
        res.status(400).json("Producto no encontrados");
    }
});

ruta.post("/api/nuevoProducto",async (req,res)=>{
    var error= await nuevoProducto(req.body);
    if(error==0){
        res.status(200).json("Producto registrado correctamente");
    }
    else{
        res.status(400).json("Error al registrar el producto");
    }
}); 

ruta.get("/api/buscarPorIdP/:id", async (req,res)=>{
    var prod=await buscarPorIdP(req.params.id);
        if(prod!=undefined){
            res.status(200).json(prod);
        }else{
            res.status(400).json("Producto no encontrado");
        }
});

ruta.post("/api/editarProducto", async (req,res)=>{
    var error=await modificarProducto(req.body);
    if(error==0){
        res.status(200).json("Producto actualizado correctamente")
    }else{
        res.status(400).json("Error al actualizar al producto")
    }
});

ruta.get("/api/borrarProducto/:id", async (req,res)=>{
    var error=await borrarProducto(req.params.id);
if(error==0){
res.status(200).json("Producto borrado");
}
else{
    res.status(400).json("Error al encontrar producto");
}
});


module.exports = ruta;