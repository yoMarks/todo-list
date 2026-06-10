import { formatDate } from "../utils/formatDate";

function TodoRow({
  todo,
  selectedFile,
  onStartEdit,
  onToggleDone,
  onDeleteTodo,
  onFileChange,
  onUploadFile,
}) {
  return (
    <tr>
      <td
        className={todo.done ? "done-text" : ""}
        onClick={() => onStartEdit(todo)}
        title="Haz clic para editar"
      >
        {todo.description}
      </td>

      <td>{formatDate(todo.date)}</td>

      <td>
        <button
          className="icon-button"
          onClick={() => onToggleDone(todo)}
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
          onChange={(event) => onFileChange(todo._id, event.target.files[0])}
        />

        <button type="button" onClick={() => onUploadFile(todo._id)}>
          Subir
        </button>

        {selectedFile && (
          <small className="selected-file-name">
            {selectedFile.name}
          </small>
        )}
      </td>

      <td>
        <button
          className="edit-button"
          onClick={() => onStartEdit(todo)}
          title="Editar tarea"
        >
          <span className="material-symbols-outlined">edit</span>
        </button>
      </td>

      <td>
        <button
          className="delete-button"
          onClick={() => onDeleteTodo(todo._id)}
          title="Eliminar tarea"
        >
          <span className="material-symbols-outlined">delete</span>
        </button>
      </td>
    </tr>
  );
}

export default TodoRow;