import { useState } from "react";
import "./App.css";

function App() {
  const [description, setDescription] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    alert(`Tarea escrita: ${description}`);
  }

  return (
    <main className="app-container">
      <section className="form-section">
        <h1>Nuevo</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Escribe una tarea"
          />

          <button type="submit">Añadir</button>
        </form>
      </section>

      <section className="list-section">
        <table>
          <thead>
            <tr>
              <th>Descripción</th>
              <th>Fecha</th>
              <th>Hecho</th>
              <th>Eliminar</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Limpiar casa</td>
              <td>21-05-2026</td>
              <td>✅</td>
              <td>❌</td>
            </tr>
          </tbody>
        </table>
      </section>
    </main>
  );
}

export default App;