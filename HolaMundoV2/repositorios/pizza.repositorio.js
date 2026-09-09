// Esta es la capa donde se persisten los datos

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

let pizzas = [
    {
        id: 1,
        nombre: "Hawaiana",
        descripcion: "Jamon y piña"
    }
];

/**
 * Regresa una lista de las pizzas
 * @returns []
 */
export async function obtenerTodasLasPizzasAsync() {
    await sleep(2000);
    return pizzas;
}

/**
 * Regresa la pizza del id buscado o undefined si no lo encuentra
 * @param {*} id
 */
export async function obtenerPizzaPorIdAsync(id) {
    await sleep(1000);

    const pizza = pizzas.find((x) => x.id == id);

    return pizza;
}

// ------------Tarea 08/09/26 }

//Agregar una nueva pizza
export async function agregarPizzaAsync(pizza) {
    await sleep(1000);
    pizzas.push(pizza);
    return pizzas.length
}


// Actualiza una pizza
export async function actualizarPizzaAsync(id, Pizza) {
    const index = pizzas.findIndex((x) => x.id == id);
    if (indice === -1) 
        return undefined
    pizzas[index].nombre = pizza.nombre
    pizzas[index].descripcion = pizza.descripcion

    return pizzas[index]
    

}


//Elimina una pizza
export async function borrarPizzaAsync(id) {
    const index = pizzas.findIndex(x => x.id == id)
    pizzas.splice(index)
}
