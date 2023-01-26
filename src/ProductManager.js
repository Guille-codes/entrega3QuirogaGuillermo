const fs = require("fs");
const path = "./src/ProductManager.json";

if (!fs.existsSync(path)) {
  fs.writeFileSync(path, JSON.stringify([], null, "\t"));
} 

class ProductManager {
  #Products = [];

  constructor() {
    this.id = 0;
    this.path = "./src/ProductManager.json";
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    const productosObjeto = JSON.parse(fs.readFileSync(this.path, "utf-8"));
  

    if (productosObjeto) {
      this.id++;
      const producto = {
        id: this.id,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      };
      const searchProduct = productosObjeto.find(
        (product) => product.code === code
      );
      console.log(searchProduct);

      if (
        !searchProduct &&
        title &&
        description &&
        price &&
        thumbnail &&
        code &&
        stock
      ) {
        productosObjeto.push(producto);
        fs.writeFileSync(
          this.path,
          JSON.stringify(productosObjeto, null, "\t")
        );
        console.log(`Evento 1 creado, id: ${this.id}`);
      } else {
        console.log("ERROR: Ya existe el producto con ese código.");
      }
    } else {
      this.id++;
      const producto = {
        id: this.id,
        title, 
        description,
        price,
        thumbnail,
        code,
        stock,
      };

      if (title && description && price && thumbnail && code && stock) {
        
        fs.writeFileSync(this.path, JSON.stringify(producto));

        console.log(`Evento creado, id: ${this.id}`);
      } else {
        console.log("ERROR: Complete los datos de entrada.");
      }
    } 
  }

  getProducts() {
    const prod = JSON.parse(fs.readFileSync(this.path, "utf-8"));
    console.log(prod);
  }

  getProductById(idProduct) {
    const productosOb = JSON.parse(fs.readFileSync(this.path, "utf-8"));

    const producto = productosOb.find((evento) => evento.id === idProduct);

    if (!producto) {
      return console.log("No hay ningún producto.");
    }

    return console.log(producto);
  }

  updateProduct(idProduct, title, description, price, thumbnail, code, stock) {
    const productosObjeto = JSON.parse(fs.readFileSync(this.path, "utf-8"));

    const findProducto = productosObjeto.find(
      (evento) => evento.id === idProduct
    );
    const indexProducto = productosObjeto.indexOf(findProducto);

    const product = {
      id: idProduct,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };
    if (findProducto) {
      if (title && description && price && thumbnail && code && stock) {
        productosObjeto.splice(indexProducto, 1, product);
        fs.writeFileSync(
          this.path,
          JSON.stringify(productosObjeto, null, "\t")
        );

        console.log(`Evento modificado - Id: ${this.id}`);
        return console.log(productosObjeto[indexProducto]);
      } else {
        console.log("ERROR: Complete los datos de entrada.");
      }
    } else {
      console.log(`El producto, id ${idProduct} no existe.`);
    }
  }

  deleteProduct(idProduct) {
    const productosObjeto = JSON.parse(fs.readFileSync(this.path, "utf-8"));

    const findProducto = productosObjeto.find(
      (evento) => evento.id === idProduct
    );
    const indexProducto = productosObjeto.indexOf(findProducto);
    if (findProducto) {
      productosObjeto.splice(indexProducto, 1);
      fs.writeFileSync(this.path, JSON.stringify(productosObjeto, null, "\t"));
      console.log(`Se eliminó el producto, id ${idProduct}`)
    } else {
      console.log(`El producto, id ${idProduct} no existe.`);
    }
  }
}

export default ProductManager;

