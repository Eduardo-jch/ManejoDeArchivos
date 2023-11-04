class Producto {
    constructor(id, data) {
        this.bandera = 0;
        this.id = id;
        this.nombre = data.nombre;
        this.precio = data.precio;
        this.stock = data.stock;
        this.foto = data.foto;

        this._categoria = data.categoria; // Cambiado el nombre interno
    }

    set categoria(categoria) {
        categoria.length > 0 ? this._categoria = categoria : this.bandera = 1;
    }

    set id(id) {
        if (id != null)
            id.length > 0 ? this._id = id : this.bandera = 1;
    }

    set nombre(nombre) {
        nombre.length > 0 ? this._nombre = nombre : this.bandera = 1;
    }

    set precio(precio) {
        precio.length > 0 ? this._precio = precio : this.bandera = 1;
    }

    set stock(stock) {
        stock.length > 0 ? this._stock = stock : this.bandera = 1;
    }

    set foto(foto) {
        if (foto && foto.length) {
            this._foto = foto;
        } else {
            this.bandera = 1;
        }
    }
    

    get categoria() {
        return this._categoria;
    }

    get id() {
        return this._id;
    }

    get nombre() {
        return this._nombre;
    }

    get precio() {
        return this._precio;
    }

    get stock() {
        return this._stock;
    }

    get foto() {
        return this._foto;
    }

    // Obtener el producto con el valor de _categoria
    get obtenerProducto() {
        if (this._id != null)
            return {
                id: this.id,
                nombre: this.nombre,
                precio: this.precio,
                stock: this.stock,
                categoria: this._categoria, // Utilizar la propiedad interna
                foto: this.foto
            };
        else
            return {
                nombre: this.nombre,
                precio: this.precio,
                stock: this.stock,
                categoria: this._categoria, // Utilizar la propiedad interna
                foto: this.foto
            };
    }
}

module.exports = Producto;
