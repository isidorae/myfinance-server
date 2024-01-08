# Finance App Server


Este es el servidor backend de una aplicación de finanzas personales (https://github.com/isidorae/myfinance/) desarrollada utilizando la arquitectura MVC. El servidor maneja las siguientes operaciones CRUD; Crear, Leer y Eliminar, para los datos de cada usuario, implementando rutas, modelos y controladores para una gestión eficiente de la información financiera.

# Funcionalidades Principales

    Creación, lectura y eliminación de datos de usuario.
    Autenticación de usuarios mediante JSON Web Tokens (JWT).
    Generación de JWT al iniciar sesión o registrarse.
    Middleware de verificación de token para garantizar la validez en cada solicitud.

# Tecnologías Utilizadas

    Node.js
    Express.js
    MongoDB (conectado a través de Mongoose)
    JSON Web Tokens (JWT)