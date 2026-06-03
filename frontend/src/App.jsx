import { useEffect, useState } from "react";
import "./App.css";

const API_URL = "http://localhost:5000/todos";
const FILES_URL = "http://localhost:5000/files";

function App() {
  const [todos, setTodos] = useState([]); //lista tareas
  const [description, setDescription] = useState("");//texto tarea form
  const [editingId, setEditingId] = useState(null); //guard id tarea editando
  const [files, setFiles] = useState([]);//list archivos subidos
  const [selectedFiles, setSelectedFiles] = useState({}); //Guarda temp
  const [paginaActual, setPaginaActual] = useState(1); //Guarda la página actual de la tabla
  const tareasPorPagina = 3;

  async function getTodos() {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error("Error al obtener tareas:", error);
    }
  }

  async function getFiles() {
    try {
      const response = await fetch(FILES_URL);
      const data = await response.json();
      setFiles(data);
    } catch (error) {
      console.error("Error al obtener archivos:", error);
    }
  }

  function handleFileChange(todoId, file) {
    setSelectedFiles({
      ...selectedFiles,
      [todoId]: file,
    });
  }

  async function uploadFileToTodo(todoId) {
    const file = selectedFiles[todoId];

    if (!file) {
      alert("Selecciona un archivo primero");
      return;
    }

    const formData = new FormData();
    formData.append("document", file);

    try {
      await fetch(`${API_URL}/${todoId}/upload`, {
        method: "POST",
        body: formData,
      });

      setSelectedFiles({
        ...selectedFiles,
        [todoId]: null,
      });

      await getFiles();
      alert("Archivo subido correctamente");
    } catch (error) {
      console.error("Error al subir archivo:", error);
    }
  }

  function downloadFile(fileId) {
    window.open(`${FILES_URL}/${fileId}/download`, "_blank");
  }

  useEffect(() => {
    getTodos();
    getFiles();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    if (description.trim() === "") {
      alert("La descripción no puede estar vacía");
      return;
    }

    if (editingId) {
      await updateTodoText(editingId);
    } else {
      await createTodo();
    }

    setDescription("");
    setEditingId(null);
    await getTodos();
    setPaginaActual(1);
  }

  async function createTodo() {
    try {
      await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          description: description,
        }),
      });
    } catch (error) {
      console.error("Error al crear tarea:", error);
    }
  }

  async function updateTodoText(id) {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          description: description,
        }),
      });
    } catch (error) {
      console.error("Error al editar texto:", error);
    }
  }

  async function toggleDone(todo) {
    try {
      await fetch(`${API_URL}/${todo._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          done: !todo.done,
        }),
      });

      await getTodos();
    } catch (error) {
      console.error("Error al actualizar estado hecho:", error);
    }
  }

async function deleteTodo(id) {
  const confirmDelete = confirm("¿Seguro que quieres eliminar esta tarea?");

  if (!confirmDelete) {
    return;
  }

  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("No se pudo eliminar la tarea");
    }

    await getTodos();
    await getFiles();
    setPaginaActual(1);
  } catch (error) {
    console.error("Error al eliminar tarea:", error);
  }
}

  function startEdit(todo) {
    setDescription(todo.description);
    setEditingId(todo._id);
  }

  function cancelEdit() {
    setDescription("");
    setEditingId(null);
  }

  function formatDate(date) {
    return new Date(date).toLocaleString("es-BO", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  const indiceUltimaTarea = paginaActual * tareasPorPagina;
  const indicePrimeraTarea = indiceUltimaTarea - tareasPorPagina;
  const tareasPaginadas = todos.slice(indicePrimeraTarea, indiceUltimaTarea);

  const totalPaginas = Math.ceil(todos.length / tareasPorPagina);

  function paginaAnterior() {
    if (paginaActual > 1) {
      setPaginaActual(paginaActual - 1);
    }
  }

  function paginaSiguiente() {
    if (paginaActual < totalPaginas) {
      setPaginaActual(paginaActual + 1);
    }
  }

  return (
    <main className="app-container">
      <section className="form-section">
        <h1>{editingId ? "Editar" : "Nuevo"}</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Escribe una tarea"
          />

          <button type="submit">
            {editingId ? "Guardar" : "Añadir"}
          </button>

          {editingId && (
            <button type="button" className="cancel-button" onClick={cancelEdit}>
              Cancelar
            </button>
          )}
        </form>
      </section>

      <section className="list-section">
        <table>
          <thead>
            <tr>
              <th>Tarea</th>
              <th>Fecha</th>
              <th>Hecho</th>
              <th>Archivo</th>
              <th>Editar</th>
              <th>Eliminar</th>
            </tr>
          </thead>

          <tbody>
            {todos.length === 0 ? (
              <tr>
                <td colSpan="6">No hay tareas registradas</td>
              </tr>
            ) : (
              tareasPaginadas.map((todo) => (
                <tr key={todo._id}>
                  <td
                    className={todo.done ? "done-text" : ""}
                    onClick={() => startEdit(todo)}
                    title="Haz clic para editar"
                  >
                    {todo.description}
                  </td>

                  <td>{formatDate(todo.date)}</td>

                  <td>
                    <button
                      className="icon-button"
                      onClick={() => toggleDone(todo)}
                      title={todo.done ? "Marcar como pendiente" : "Marcar como hecho"}
                    >
                      <span className="material-symbols-outlined">
                        {todo.done ? "check_box" : "check_box_outline_blank"}
                      </span>
                    </button>
                  </td>

                  <td>
                    <input
                      type="file"
                      onChange={(event) =>
                        handleFileChange(todo._id, event.target.files[0])
                      }
                    />

                    <button
                      type="button"
                      onClick={() => uploadFileToTodo(todo._id)}
                    >
                      Subir
                    </button>
                  </td>

                  <td>
                    <button
                      className="edit-button"
                      onClick={() => startEdit(todo)}
                      title="Editar tarea"
                    >
                      <span className="material-symbols-outlined">edit</span>
                    </button>
                  </td>

                  <td>
                    <button
                      className="delete-button"
                      onClick={() => deleteTodo(todo._id)}
                      title="Eliminar tarea"
                    >
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {todos.length > tareasPorPagina && (
          <div className="pagination">
            <button
              type="button"
              onClick={paginaAnterior}
              disabled={paginaActual === 1}
            >
              Anterior
            </button>

            <span>
              Página {paginaActual} de {totalPaginas}
            </span>

            <button
              type="button"
              onClick={paginaSiguiente}
              disabled={paginaActual === totalPaginas}
            >
              Siguiente
            </button>
          </div>
        )}

      </section>
      <section className="files-section">
        <h2>Archivos subidos</h2>

        {files.length === 0 ? (
          <p>No hay archivos subidos</p>
        ) : (
          <ul>
            {files.map((file) => (
              <li key={file._id}>
                <span>{file.originalName}</span>

                {file.todo && (
                  <small>
                    {" "} - Tarea: {file.todo.description}
                  </small>
                )}

                <button onClick={() => downloadFile(file._id)}>
                  Descargar
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

export default App;