Todo-List

Autor: Cristian Heredia Suaznabar

Descripción del proyecto
Aplicación web Todo-List que permite a los usuarios:

- Registrar tareas
- Ver lista de tareas
- Mostrar fecha y hora de creación
- Editar tareas
- Marcar como completadas o pendientes
- Eliminar tareas
- Subir y descargar archivos por tarea
- Autenticación de usuarios registro, login y perfil protegido

El sistema incluye autenticación con JWT, control de sesiones y rutas protegidas.

Funcionalidades principales
- CRUD completo de tareas
- Autenticación de usuarios
- Protección de rutas con JWT
- Subida y descarga de archivos
- Paginación de tareas
- Interfaz dinámica en React
- Validación de datos en backend

Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- Passport.js
- JWT 
- bcrypt

Frontend

- React+Vite
- JavaScript
- CSS
- Fetch API
- Google Fonts / Material Symbols

Autenticación

El sistema utiliza:

- Registro de usuarios
- Login con Passport Local
- Hash de contraseñas con bcrypt
- Generación de token JWT
- Rutas protegidas (profile, futuras rutas privadas)
- Almacenamiento del token en el cliente

Instalacion
1.Clonar repositorio
git clone https://github.com/yoMarks/todo-list.git
2.entra la carpeta
cd todo-list
3.instalar dependencias del Backend
npm install
4.cd Frontend
npm install

Backend se ejecuta en:
http://localhost:5000

Frontend se ejecuta en:
http://localhost:5173

Nota:
Se conto con ayuda de la IA y asistencia durante el desarrollo.
