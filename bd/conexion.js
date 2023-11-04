var admin=require("firebase-admin");
var keys=require("../keys.json");
admin.initializeApp({
    credential:admin.credential.cert(keys)
});
var miEjemploBD = admin.firestore();//conexion a la cuenta 
var conexionUsuarios=miEjemploBD.collection("usuarios");//conexion a la bd 
var conexionProductos=miEjemploBD.collection("productos");//conexion a la bd 

module.exports={
    conexionUsuarios,
    conexionProductos
}