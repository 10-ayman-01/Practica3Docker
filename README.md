# 🔐 Aplicación de Autenticación Modular con Docker Compose

Este repositorio contiene una aplicación de autenticación completa (Login y Registro) diseñada para demostrar la **contenedorización modular de un stack de desarrollo moderno utilizando Docker Compose**.

La aplicación separa la interfaz de usuario (Frontend estático) de la lógica de negocio (Backend Node.js/Express) y la persistencia de datos (MongoDB).

-----

## 🏗️ Arquitectura del Proyecto

El stack se compone de tres contenedores aislados que se comunican a través de una red interna de Docker:

1.  **`frontend` (Nginx):** Servidor web ligero que sirve los archivos estáticos (HTML, CSS, JS). Maneja la lógica de la interfaz de usuario y las llamadas a la API.
      * **Puerto Externo (Host):** `8080`
2.  **`backend` (Node.js/Express/Mongoose):** Servidor de API REST encargado de la autenticación. Implementa el registro con *hashing* seguro de contraseñas (`bcryptjs`) y la verificación de credenciales.
      * **Puerto Externo (Host):** `3001` (Interno: `3000`)
3.  **`mongo-db` (MongoDB):** La base de datos NoSQL para la persistencia de los datos de usuario.
      * **Puerto Externo (Host):** `27017`



-----

## 🚀 Cómo Levantar el Proyecto

Sigue estos pasos para poner en marcha el stack completo en tu máquina local.

### 1\. Requisitos

  * [Docker Desktop](https://www.docker.com/products/docker-desktop) (o Docker Engine) instalado y en ejecución.
  * Conocimientos básicos de comandos de terminal.

### 2\. Dependencias del Backend

Asegúrate de que el archivo `backend/package.json` incluye las siguientes dependencias, ya que Docker las instalará durante el proceso de construcción:

| Paquete | Función |
| :--- | :--- |
| `express` | Servidor web principal. |
| `mongoose` | Conexión y modelado de MongoDB. |
| `bcryptjs` | Algoritmo rápido para *hashing* de contraseñas. |
| `cors` | Habilita las peticiones del frontend al backend. |
| `dotenv` | Gestión de variables de entorno. |

### 3\. Pasos de Ejecución

1.  Navega a la carpeta raíz del proyecto (`Practica3Docker/`).

2.  **Ejecutar Docker Compose:** Utiliza el siguiente comando para construir las imágenes, instalar las dependencias (`npm install`) y levantar los tres contenedores:

    ```bash
    docker compose up --build -d
    ```

    > **Nota:** El servicio `backend` está configurado para ejecutarse con `npm run dev` (usando `nodemon`) para permitir la recarga en caliente durante el desarrollo.

3.  **Verificar el Estado:** Confirma que todos los servicios estén corriendo:

    ```bash
    docker ps
    ```

4.  **Acceder a la Aplicación:** Abre tu navegador y navega a la dirección del Frontend:

    ```
    http://localhost:8080
    ```

-----

## 🛠️ Desarrollo y Recarga en Caliente

Gracias a los **Volúmenes de Docker** configurados en `docker-compose.yml`, los cambios se reflejan inmediatamente:

  * **Frontend (HTML/CSS/JS):** Al editar archivos en la carpeta `frontend/`, solo necesitas **recargar tu navegador** (`F5` o `Ctrl+R`) para ver los cambios, ya que Nginx lee directamente de tu host.
  * **Backend (Node.js):** El `nodemon` en el contenedor `backend` detecta los cambios en los archivos `.js` de tu host y reinicia el servidor automáticamente.

### Detener el Proyecto

Para detener y limpiar los contenedores y la red (manteniendo los datos de MongoDB para futuras ejecuciones):

```bash
docker compose down
