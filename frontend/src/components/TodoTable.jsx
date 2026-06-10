import TodoRow from "./TodoRow";

function TodoTable({
  todos,
  selectedFiles,
  onStartEdit,
  onToggleDone,
  onDeleteTodo,
  onFileChange,
  onUploadFile,
}) {
  return (
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
          todos.map((todo) => (
            <TodoRow
              key={todo._id}
              todo={todo}
              selectedFile={selectedFiles[todo._id]}
              onStartEdit={onStartEdit}
              onToggleDone={onToggleDone}
              onDeleteTodo={onDeleteTodo}
              onFileChange={onFileChange}
              onUploadFile={onUploadFile}
            />
          ))
        )}
      </tbody>
    </table>
  );
}

export default TodoTable;