
// Esta es la capa donde se persisten los datos

import { MongoClient } from "mongodb";

// Cadena de conexión a MongoDB
const uri = "mongodb://root:12345@localhost:3001/?authSource=admin";

// Creamos el cliente de MongoDB
const client = new MongoClient(uri);

// Nombre de la base de datos
const dbName = "pizzasDB";

// Nombre de la colección
const collectionName = "pizzas";

// Función para obtener la colección de pizzas
async function obtenerColeccion() {
    await client.connect();

    const db = client.db(dbName);

    return db.collection(collectionName);
}


/**
 * Regresa una lista de todas las pizzas.
 * @returns {Array} Arreglo que contiene todas las pizzas.
 */
export async function obtenerTodasLasPizzasAsync() {

    const coleccion = await obtenerColeccion();

    const pizzas = await coleccion.find({}).toArray();

    return pizzas;
}


/**
 * Regresa la pizza del id buscado o undefined si no la encuentra.
 * @param {number} id Identificador de la pizza que se desea buscar.
 * @returns {Object|undefined} La pizza encontrada o undefined si no existe.
 */
export async function obtenerPizzaPorIdAsync(id) {

    const coleccion = await obtenerColeccion();

    const pizza = await coleccion.findOne({
        id: Number(id)
    });

    return pizza;
}


/**
 * Agrega una nueva pizza a la colección.
 * @param {Object} pizza Objeto que contiene los datos de la nueva pizza.
 * @returns {number} ID asignado a la nueva pizza.
 */
export async function agregarPizzaAsync(pizza) {

    const coleccion = await obtenerColeccion();

    // Buscamos la pizza que tenga el ID más alto
    const ultimaPizza = await coleccion.findOne(
        {},
        {
            sort: { id: -1 }
        }
    );

    // Generamos el siguiente ID
    const id = ultimaPizza ? ultimaPizza.id + 1 : 1;

    // Creamos la nueva pizza con su ID
    const nuevaPizza = {
        id: id,
        nombre: pizza.nombre,
        descripcion: pizza.descripcion
    };

    // Insertamos la pizza en MongoDB
    await coleccion.insertOne(nuevaPizza);

    return id;
}


/**
 * Actualiza los datos de una pizza existente.
 * @param {number} id Identificador de la pizza que se desea actualizar.
 * @param {Object} pizza Objeto que contiene los nuevos datos de la pizza.
 * @returns {Object|undefined} La pizza actualizada o undefined si no existe.
 */
export async function actualizarPizzaAsync(id, pizza) {

    const coleccion = await obtenerColeccion();

    const resultado = await coleccion.findOneAndUpdate(
        {
            id: Number(id)
        },
        {
            $set: {
                nombre: pizza.nombre,
                descripcion: pizza.descripcion
            }
        },
        {
            returnDocument: "after"
        }
    );

    return resultado;
}


/**
 * Elimina una pizza de la colección.
 * @param {number} id Identificador de la pizza que se desea eliminar.
 * @returns {Object|undefined} La pizza eliminada o undefined si no existe.
 */
export async function borrarPizzaAsync(id) {

    const coleccion = await obtenerColeccion();

    // Primero buscamos la pizza
    const pizza = await coleccion.findOne({
        id: Number(id)
    });

    // Si no existe, regresamos undefined
    if (!pizza) {
        return undefined;
    }

    // Eliminamos la pizza
    await coleccion.deleteOne({
        id: Number(id)
    });

    return pizza;
}

