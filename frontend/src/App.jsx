import { useEffect, useState } from "react";
import "./App.css";

const API_URL = "http://localhost:5000/todos";

function App() {
  const [todos, setTodos] = useState([]);
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState(null);

  async function getTodos() {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error("Error al obtener tareas:", error);
    }
  }

  useEffect(() => {
    getTodos();
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
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      await getTodos();
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
              <th>Editar</th>
              <th>Eliminar</th>
            </tr>
          </thead>

          <tbody>
            {todos.length === 0 ? (
              <tr>
                <td colSpan="5">No hay tareas registradas</td>
              </tr>
            ) : (
              todos.map((todo) => (
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
      </section>
    </main>
  );
}

export default App;