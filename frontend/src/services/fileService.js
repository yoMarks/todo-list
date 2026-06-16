import { FILES_URL } from "../config/api";
import { getAuthHeaders } from "./authService";

async function handleResponse(response) {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || data.message || "Error en la petición al servidor");
  }

  return data;
}

export async function getFiles() {
  const response = await fetch(FILES_URL, {
    headers: {
      ...getAuthHeaders(),
    },
  });

  return handleResponse(response);
}

export async function deleteFileById(fileId) {
  const response = await fetch(`${FILES_URL}/${fileId}`, {
    method: "DELETE",
    headers: {
      ...getAuthHeaders(),
    },
  });

  return handleResponse(response);
}

export async function downloadFileById(fileId, fileName) {
  const response = await fetch(`${FILES_URL}/${fileId}/download`, {
    headers: {
      ...getAuthHeaders(),
    },
  });

  if (!response.ok) {
    throw new Error("Error al descargar archivo");
  }

  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = fileName || "archivo";
  document.body.appendChild(link);
  link.click();

  link.remove();
  window.URL.revokeObjectURL(url);
}