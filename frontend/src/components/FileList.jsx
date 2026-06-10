function FileList({ files, onDownloadFile }) {
  return (
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

              <button onClick={() => onDownloadFile(file._id)}>
                Descargar
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default FileList;