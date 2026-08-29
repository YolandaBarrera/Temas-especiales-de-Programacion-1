const express = require("express");
const app = express();
const PORT = 3001; // Puerto en el que escuchará el servidor

// Rutas
app.get("/", (req, res) => {
    const saludo = { mensaje: "Bienvenid@ a la Pizzería" };
    return res.json(saludo);
});

app.get("/api/v1/pizzas", (req, res) => {
    const pizzas = ["Pepperoni", "Hawaiana", "Mexicana", "Cuatro quesos"];
    return res.json(pizzas);
});

app.get("/api/v1/tamanios", (req, res) => {
    const tamanios = ["Chica", "Mediana", "Grande", "Familiar"];
    return res.json(tamanios);
});

app.get("/api/v1/bebidas", (req,res)=>{
    const bebidas = ["Coca Cola", "Pepsi", "Sprite", "Peñafiel"];
    return res.json(bebidas);
})

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});