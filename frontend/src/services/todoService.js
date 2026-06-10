import { TODOS_URL } from "../config/api";

async function handleResponse(response) {
  if (!response.ok) {
    throw new Error("Error en la petición al servidor");
  }

  return response.json();
}

export async function getTodos() {
  const response = await fetch(TODOS_URL);
  return handleResponse(response);
}

export async function createTodo(description) {
  const response = await fetch(TODOS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ description }),
  });

  return handleResponse(response);
}

export async function updateTodoText(id, description) {
  const response = await fetch(`${TODOS_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ description }),
  });

  return handleResponse(response);
}

export async function updateTodoDone(id, done) {
  const response = await fetch(`${TODOS_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ done }),
  });

  return handleResponse(response);
}

export async function deleteTodoById(id) {
  const response = await fetch(`${TODOS_URL}/${id}`, {
    method: "DELETE",
  });

  return handleResponse(response);
}

export async function uploadFileToTodo(todoId, file) {
  const formData = new FormData();
  formData.append("document", file);

  const response = await fetch(`${TODOS_URL}/${todoId}/upload`, {
    method: "POST",
    body: formData,
  });

  return handleResponse(response);
}