import { useEffect, useState } from "react";
import "./App.css";

import TodoForm from "./components/TodoForm";
import TodoTable from "./components/TodoTable";
import Pagination from "./components/Pagination";
import FileList from "./components/FileList";

import {
  getTodos,
  createTodo,
  updateTodoText,
  updateTodoDone,
  deleteTodoById,
  uploadFileToTodo,
} from "./services/todoService";

import {
  getFiles,
  getDownloadFileUrl,
  deleteFileById,
} from "./services/fileService";

function App() {
  const [todos, setTodos] = useState([]);
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [files, setFiles] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 3;

  async function loadTodos() {
    try {
      const data = await getTodos();
      setTodos(data);
    } catch (error) {
      console.error("Error al obtener tareas:", error);
    }
  }

  async function loadFiles() {
    try {
      const data = await getFiles();
      setFiles(data);
    } catch (error) {
      console.error("Error al obtener archivos:", error);
    }
  }

  useEffect(() => {
    loadTodos();
    loadFiles();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    if (description.trim() === "") {
      alert("La descripción no puede estar vacía");
      return;
    }

    try {
      if (editingId) {
        await updateTodoText(editingId, description);
      } else {
        await createTodo(description);
      }

      setDescription("");
      setEditingId(null);
      setCurrentPage(1);
      await loadTodos();
    } catch (error) {
      console.error("Error al guardar tarea:", error);
    }
  }

  function handleFileChange(todoId, file) {
    setSelectedFiles({
      ...selectedFiles,
      [todoId]: file,
    });
  }

  async function handleUploadFile(todoId) {
    const file = selectedFiles[todoId];

    if (!file) {
      alert("Selecciona un archivo primero");
      return;
    }

    try {
      await uploadFileToTodo(todoId, file);

      setSelectedFiles({
        ...selectedFiles,
        [todoId]: null,
      });

      await loadFiles();
      alert("Archivo subido correctamente");
    } catch (error) {
      console.error("Error al subir archivo:", error);
    }
  }

  function handleDownloadFile(fileId) {
    window.open(getDownloadFileUrl(fileId), "_blank");
  }

  async function handleDeleteFile(fileId) {
    const confirmDelete = confirm("¿Seguro que quieres eliminar este archivo?");

    if (!confirmDelete) {
      return;
    }

    try {
      await deleteFileById(fileId);
      await loadFiles();
      alert("Archivo eliminado correctamente");
    } catch (error) {
      console.error("Error al eliminar archivo:", error);
    }
  }

  async function handleToggleDone(todo) {
    try {
      await updateTodoDone(todo._id, !todo.done);
      await loadTodos();
    } catch (error) {
      console.error("Error al actualizar estado:", error);
    }
  }

  async function handleDeleteTodo(id) {
    const confirmDelete = confirm("¿Seguro que quieres eliminar esta tarea?");

    if (!confirmDelete) {
      return;
    }

    try {
      await deleteTodoById(id);
      await loadTodos();
      await loadFiles();
      setCurrentPage(1);
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

  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const paginatedTodos = todos.slice(firstItemIndex, lastItemIndex);
  const totalPages = Math.ceil(todos.length / itemsPerPage);

  function previousPage() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function nextPage() {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }

  return (
    <main className="app-container">
      <TodoForm
        description={description}
        editingId={editingId}
        onDescriptionChange={setDescription}
        onSubmit={handleSubmit}
        onCancelEdit={cancelEdit}
      />

      <section className="list-section">
        <TodoTable
          todos={paginatedTodos}
          selectedFiles={selectedFiles}
          onStartEdit={startEdit}
          onToggleDone={handleToggleDone}
          onDeleteTodo={handleDeleteTodo}
          onFileChange={handleFileChange}
          onUploadFile={handleUploadFile}
        />

        <Pagination
          totalItems={todos.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPreviousPage={previousPage}
          onNextPage={nextPage}
        />
      </section>

      <FileList
        files={files}
        onDownloadFile={handleDownloadFile}
        onDeleteFile={handleDeleteFile}
      />
    </main>
  );
}

export default App;