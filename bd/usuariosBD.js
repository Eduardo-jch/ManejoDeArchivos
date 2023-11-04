var conexion=require("./conexion").conexionUsuarios;
var Usuario=require("../modelos/Usuario");

async function mostrarUsuarios(){
    var users=[];
    try{
        var usuario=await conexion.get();
        //console.log(usuario);
        usuario.forEach(usuario => {
            //console.log(usuario.data());
            var usuario1=new Usuario(usuario.id, usuario.data());
            if(usuario1.bandera==0){
                users.push(usuario1.obtenerUsuario);
            }
        });
    }
    catch(err){
        console.log("Error al mostrar usuarios "+err);
        users = [];
    }
    return users;
}

async function nuevoUsuario(newUser){
    var error=1;
    try{
        var usuario1=new Usuario(null,newUser);
        if(usuario1.bandera==0){
            console.log(usuario1.obtenerUsuario);
            await conexion.doc().set(usuario1.obtenerUsuario);
            error=0;
        }
        else{
            console.log("Datos incorrectos del formulario");
        }
    }
    catch(err){
        console.log("Error al crear nuevo usuario "+err);
    }
    return error;
}

async function buscarPorID(id){
    var user;
    try{
        var usuarioBD=await conexion.doc(id).get();
        var usuarioObjeto=new Usuario((await usuarioBD).id, usuarioBD.data());
        if(usuarioObjeto.bandera==0){
            user=usuarioObjeto.obtenerUsuario;
        }
    }
    catch(err){
        console.log("Error al recuperar el usuario "+err);
    }
    return user;
}

async function modificarUsuario(datos){
    var user=await buscarPorID(datos.id);
    if(user!=undefined){
        var user=new Usuario(datos.id, datos);
        var error=1;
        if(user.bandera==0){
            try{
                await conexion.doc(user.id).set(user.obtenerUsuario);
                console.log("Los datos se modificaron correctamente");
                error=0;
            }  
            catch(err){
                console.log("Error al modificar el usuario "+err);
            }
        }
        else{
            console.log("Error los datos no son validos");
        }
    }
    return error;
}

async function borrarUsuario(id){
    var error=1;
    var user= await buscarPorID(id);
    if(user!=undefined){
        try{
            await conexion.doc(id).delete();
            console.log("Registro borrado");
            error=0;
        }
        catch(err){
            console.log("Error al borrar el usuario "+err);
        }
    }
    return error;
}


module.exports={
    mostrarUsuarios,
    buscarPorID,
    nuevoUsuario, 
    modificarUsuario,
    borrarUsuario
}