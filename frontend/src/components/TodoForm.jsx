function TodoForm({
  description,
  editingId,
  onDescriptionChange,
  onSubmit,
  onCancelEdit,
}) {
  return (
    <section className="form-section">
      <h1>{editingId ? "Editar" : "Nuevo"}</h1>

      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={description}
          onChange={(event) => onDescriptionChange(event.target.value)}
          placeholder="Escribe una tarea"
        />

        <button type="submit">
          {editingId ? "Guardar" : "Añadir"}
        </button>

        {editingId && (
          <button type="button" className="cancel-button" onClick={onCancelEdit}>
            Cancelar
          </button>
        )}
      </form>
    </section>
  );
}

export default TodoForm;