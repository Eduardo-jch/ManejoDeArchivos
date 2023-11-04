var conexion = require("./conexion").conexionProductos;
var Producto = require("../modelos/Producto");

async function mostrarProductos() {
  try {
    var prods = [];
    var productosSnapshot = await conexion.get();

    if (!productosSnapshot.empty) {
      productosSnapshot.forEach(productoDoc => {
        const producto1 = new Producto(productoDoc.id, productoDoc.data());
        if (producto1.bandera === 0) {
          prods.push(producto1.obtenerProducto);
        }
      });
    } else {
      console.log("No se encontraron productos en la base de datos.");
    }

    return prods;
  } catch (err) {
    throw err; 
  }
}

async function nuevoProducto(newProd){ 
  var error=1; 
  try{
    var producto1 = new Producto(null,newProd); 
    if(producto1.bandera==0){
      console.log(producto1.obtenerProducto);
      await conexion.doc().set(producto1.obtenerProducto);
      error=0;
    }
    else{
      console.log("Datos incorrectos del formulario");
    }
  }
  catch(err){
    console.log("Error al crear un nuevo producto "+err);
  }
  return error; 
}

async function buscarPorIdP(id) {
  var prod;
  try {
    var productoBD = await conexion.doc(id).get();
    var productoObjeto= new Producto(productoBD.id, productoBD.data());
    if(productoObjeto.bandera==0){
      prod = productoObjeto.obtenerProducto;
    }
      } catch (err) {
    console.log("Error al buscar PRODUCTO por ID: " + err);
  }
  return prod; 
}

async function modificarProducto(datos){
  var prod= new Producto(datos.id,datos);
  var error=1;
  if(prod.bandera==0){
    try{
      await conexion .doc(prod.id).set(prod.obtenerProducto);
      console.log("Los datos del prod ya se modificaron nice");
      error=0; 
    }catch(err){
     console.log("Error al modificar el producto, nooo :(" + err);
    }
  }else{
    console.log("Error los datos no son validos");
  }
  return error; 
}

async function borrarProducto(id){
  var error=1;
  var prod=await buscarPorIdP(id);
  if(prod!=undefined){
  try{
    await conexion.doc(id).delete() ;
    console.log("Registro borrado");
    error=0;
  }catch(err){
    console.log("Error al borrar el producto "+err);
  }
}
  return error;
}



module.exports = {
   mostrarProductos,
   nuevoProducto,
   buscarPorIdP,
   modificarProducto,
   borrarProducto
};
