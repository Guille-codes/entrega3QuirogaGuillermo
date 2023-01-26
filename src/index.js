const express = require('express');
const fs = require('fs');
const app = express();
const port = "8080"
const path = "./src/ProductManager.json"


app.get('/products', async (req, res) => {
  try {
    const products = await fs.promises.readFile(path, (err, data) => {
      if (err) throw err;
      products = JSON.parse(data);
    }, 'utf8');
    const limit = req.query.limit;
    let limitedProducts = JSON.parse(products);
    if (limit) {
      limitedProducts = limitedProducts.slice(0, limit);
    }
    res.json(limitedProducts);
  } catch (err) {
    res.status(500).send(err.message);
  }
});


app.get('/products/:pid', async (req, res) => {
  try {
    const products = await fs.promises.readFile(path, (err, data) => {
      if (err) throw err;
      products = JSON.parse(data);
    }, 'utf8');
    const pid = req.params.pid;
    const product = JSON.parse(products).filter(p => p.id === Number(pid))[0];
    if(!product) {
      res.status(404).send('product not found');
    } else {
      res.json(product);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});


app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
});
