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

//Agregar pizza por POST
app.post("/api/v1/pizzas", async (req, res) => {
    const pizza = req.body
    const id = await agregarPizzaAsync(pizza)
    const idDto = { id: id, fecha: new Date() }
    return res.status(201).json(idDto);
})

// Actualizar pizza por método PUT
app.put("/api/v1/pizzas/:id", async (req, res) => {
    const id = req.params.id
    const pizza = await obtenerPizzaPorIdAsync(id)
    if (pizza == undefined) {
        const mensaje = { mensaje: "No existe la pizza con ese id" }
        return res.status(404).json(mensaje);
    }
    const pizzaActualizar = req.body
    await actualizarPizzaAsync(id, pizzaActualizar)
    const mensaje = { mensaje: "Datos Actualizados" }
    return res.status(202).json(mensaje);

})


// Borrar pizza por delete
app.delete("/api/v1/pizzas/:id", async (req, res) => {
    const id = req.params.id
    await eliminarPizzaAsync(id)

    const mensaje = { mensaje: "Datos Eliminados" }
    return res.status(202).json(mensaje);
});


// INICIAR SERVIDOR
app.listen(PORT, () => {
    console.log(
        `Servidor Express escuchando en el puerto http://localhost:${PORT}`
    );
});
