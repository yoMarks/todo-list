function FileList({ files, onDownloadFile, onDeleteFile }) {
  return (
    <section className="files-section">
      <h2>Archivos subidos</h2>

      {files.length === 0 ? (
        <p>No hay archivos subidos</p>
      ) : (
        <ul>
          {files.map((file) => (
            <li key={file._id}>
              <div className="file-info">
                <span>{file.originalName}</span>

                {file.todo && (
                  <small>
                    {" "} - Tarea: {file.todo.description}
                  </small>
                )}
              </div>

              <div className="file-actions">
                <button onClick={() => onDownloadFile(file._id)}>
                  Descargar
                </button>

                <button
                  className="delete-file-button"
                  onClick={() => onDeleteFile(file._id)}
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default FileList;