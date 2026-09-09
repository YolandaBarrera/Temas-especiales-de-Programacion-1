import express from "express";
import cors from "cors";

import {
    obtenerTodasLasPizzasAsync,
    obtenerPizzaPorIdAsync,
    agregarPizzaAsync,
    actualizarPizzaAsync,
    borrarPizzaAsync
} from "./repositorios/pizza.repositorio.js";

const app = express();

app.use(cors());

// Configuración para usar el body en métodos/verbo POST y PUT
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 3000;

// Rutas
app.get("/api/v1/pizzas", async (req, res) => {
    const pizzas = await obtenerTodasLasPizzasAsync();
    return res.status(200).json(pizzas);
});

// Obtener Pizza por Id
app.get("/api/v1/pizzas/:id", async (req, res) => {
    const id = req.params.id;
    const pizza = await obtenerPizzaPorIdAsync(id);
    if (!pizza) {
        return res.status(404).json({
            mensaje: "Pizza no encontrada"
        });
    }
    return res.status(200).json(pizza);
});


// Agregar Pizza por método POST
app.post("/api/v1/pizzas", async (req, res) => {
    const pizza = req.body;

    // Generar un nuevo Id
    const pizzas = await obtenerTodasLasPizzasAsync();
    const nuevoId = pizzas.length > 0
        ? Math.max(...pizzas.map((x) => x.id)) + 1
        : 1;

    const nuevaPizza = {
        id: nuevoId,
        nombre: pizza.nombre,
        descripcion: pizza.descripcion
    };

    const resultado = await agregarPizzaAsync(nuevaPizza);
    return res.status(201).json(resultado);
});


// Actualizar pizza por método PUT
app.put("/api/v1/pizzas/:id", async (req, res) => {
    const id = req.params.id;
    const datosPizza = req.body;
    const pizzaActualizada = await actualizarPizzaAsync(id, datosPizza);

    if (!pizzaActualizada) {
        return res.status(404).json({
            mensaje: "Pizza no encontrada"
        });
    }
    return res.status(200).json(pizzaActualizada);
});


// Borrar pizza por delete
app.delete("/api/v1/pizzas/:id", async (req, res) => {

    const id = req.params.id;

    const pizzaEliminada = await borrarPizzaAsync(id);

    if (!pizzaEliminada) {
        return res.status(404).json({
            mensaje: "Pizza no encontrada"
        });
    }

    return res.status(200).json({
        mensaje: "Pizza eliminada correctamente",
        pizza: pizzaEliminada
    });
});


// INICIAR SERVIDOR
app.listen(PORT, () => {
    console.log(
        `Servidor Express escuchando en el puerto http://localhost:${PORT}`
    );
});