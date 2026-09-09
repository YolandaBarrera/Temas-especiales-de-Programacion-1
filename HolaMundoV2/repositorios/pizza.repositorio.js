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

//Agrega una nueva pizza
export async function agregarPizzaAsync(pizza) {
    await sleep(1000);

    pizzas.push(pizza);

    return pizza;
}


// Actualiza una pizza
export async function actualizarPizzaAsync(id, datosPizza) {
    await sleep(1000);

    const indice = pizzas.findIndex((x) => x.id == id);

    if (indice === -1) {
        return undefined;
    }

    pizzas[indice] = {
        ...pizzas[indice],
        ...datosPizza,
        id: pizzas[indice].id
    };

    return pizzas[indice];
}


//Elimina una pizza
export async function borrarPizzaAsync(id) {
    await sleep(1000);

    const indice = pizzas.findIndex((x) => x.id == id);

    if (indice === -1) {
        return undefined;
    }

    const pizzaEliminada = pizzas[indice];

    pizzas.splice(indice, 1);

    return pizzaEliminada;
}