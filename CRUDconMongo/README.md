# API de Pizzas

API REST desarrollada con **Node.js, Express y MongoDB**, que permite administrar un catálogo de pizzas mediante operaciones CRUD.

El proyecto utiliza **MongoDB ejecutándose mediante Docker** para la persistencia de los datos y **Postman** para realizar y probar las peticiones HTTP.

## Descripción del proyecto

El proyecto consiste en una API REST para gestionar información de pizzas. La API permite realizar las siguientes operaciones:

* Consultar todas las pizzas.
* Consultar una pizza por su ID.
* Agregar una nueva pizza.
* Actualizar una pizza existente.
* Eliminar una pizza.

La aplicación está desarrollada utilizando **Express.js** y cuenta con una capa de repositorio encargada de realizar las operaciones sobre MongoDB.

## Tecnologías utilizadas

* Node.js
* Express.js
* MongoDB
* Docker
* MongoDB Driver
* Postman
* CORS

## Requisitos

Antes de ejecutar el proyecto es necesario contar con:

* Node.js y npm instalados.
* Docker Desktop instalado y ejecutándose.
* Postman para realizar las pruebas de la API.

## Instalación

Clonar el repositorio y entrar a la carpeta del proyecto:

```bash
git clone <URL_DEL_REPOSITORIO>
cd <NOMBRE_DEL_PROYECTO>
```

Instalar las dependencias:

```bash
npm install
```

Si las dependencias todavía no están instaladas, instalar Express, CORS y el driver de MongoDB:

```bash
npm install express cors mongodb
```

## Configuración de MongoDB

El proyecto utiliza MongoDB dentro de un contenedor de Docker.

El contenedor utilizado se llama:

```text
mongoFes
```

MongoDB utiliza el puerto `27017` dentro del contenedor, pero se encuentra publicado en el puerto `3001` de la computadora:

```text
3001:27017
```

La conexión utilizada por la aplicación es:

```text
mongodb://root:12345@localhost:3001/?authSource=admin
```

### Crear y ejecutar el contenedor

Si todavía no existe el contenedor, se puede crear con:

```bash
docker run -d \
  --name mongoFes \
  -p 3001:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=root \
  -e MONGO_INITDB_ROOT_PASSWORD=12345 \
  mongo:latest
```

Para comprobar que el contenedor está ejecutándose:

```bash
docker ps
```

Debe aparecer un contenedor similar a:

```text
mongoFes
0.0.0.0:3001->27017/tcp
```

Si el contenedor ya existe pero está detenido, se puede iniciar con:

```bash
docker start mongoFes
```

## Ejecución del proyecto

Una vez que MongoDB esté ejecutándose, iniciar el servidor de Express:

```bash
npm run dev
```

El servidor se ejecutará en:

```text
http://localhost:3000
```

La API utiliza el puerto `3000`, mientras que MongoDB utiliza el puerto `3001` en la computadora.

La comunicación queda de la siguiente manera:

```text
Postman
   |
   v
Express / Node.js
localhost:3000
   |
   v
Repositorio
   |
   v
MongoDB
localhost:3001
   |
   v
Docker
   |
   v
MongoDB:27017
```

## Endpoints

La API cuenta con los siguientes endpoints:

| Método | Endpoint             | Descripción              |
| ------ | -------------------- | ------------------------ |
| GET    | `/api/v1/pizzas`     | Obtener todas las pizzas |
| GET    | `/api/v1/pizzas/:id` | Obtener una pizza por ID |
| POST   | `/api/v1/pizzas`     | Agregar una nueva pizza  |
| PUT    | `/api/v1/pizzas/:id` | Actualizar una pizza     |
| DELETE | `/api/v1/pizzas/:id` | Eliminar una pizza       |

## Pruebas con Postman

Para probar la API se puede utilizar Postman.

### 1. Obtener todas las pizzas

Método:

```text
GET
```

URL:

```text
http://localhost:3000/api/v1/pizzas
```

La respuesta será un arreglo con las pizzas almacenadas en MongoDB.

Ejemplo:

```json
[
  {
    "_id": "6aa71600e456ca522aa3b2fd",
    "id": 1,
    "nombre": "Mexicana",
    "descripcion": "Jalapeño y chorizo"
  }
]
```

### 2. Obtener una pizza por ID

Método:

```text
GET
```

URL:

```text
http://localhost:3000/api/v1/pizzas/1
```

Devuelve la pizza cuyo `id` sea `1`.

### 3. Agregar una pizza

Método:

```text
POST
```

URL:

```text
http://localhost:3000/api/v1/pizzas
```

En Postman seleccionar:

```text
Body → raw → JSON
```

Enviar un objeto como:

```json
{
  "nombre": "Hawaiana",
  "descripcion": "Jamón y piña"
}
```

La API asignará automáticamente un ID a la nueva pizza y la almacenará en MongoDB.

### 4. Actualizar una pizza

Método:

```text
PUT
```

URL:

```text
http://localhost:3000/api/v1/pizzas/1
```

En:

```text
Body → raw → JSON
```

Enviar:

```json
{
  "nombre": "Mexicana Especial",
  "descripcion": "Jalapeño, chorizo y queso"
}
```

La información de la pizza será actualizada en MongoDB.

### 5. Eliminar una pizza

Método:

```text
DELETE
```

URL:

```text
http://localhost:3000/api/v1/pizzas/1
```

La pizza con el ID indicado será eliminada de MongoDB.

## Base de datos

La aplicación utiliza la base de datos:

```text
pizzasDB
```

y la colección:

```text
pizzas
```

Cada documento contiene información como:

```json
{
  "_id": "ObjectId generado por MongoDB",
  "id": 1,
  "nombre": "Mexicana",
  "descripcion": "Jalapeño y chorizo"
}
```

El campo `_id` es generado automáticamente por MongoDB, mientras que el campo `id` es utilizado por la API para identificar las pizzas en sus endpoints.

## Estructura del proyecto

Una estructura aproximada del proyecto es:

```text
proyecto/
│
├── index.js
├── package.json
├── package-lock.json
│
└── repositorios/
    └── pizza.repositorio.js
```

El archivo `index.js` contiene la configuración de Express y las rutas de la API.

El archivo `pizza.repositorio.js` contiene las funciones encargadas de realizar las operaciones de consulta, inserción, actualización y eliminación de datos en MongoDB.
