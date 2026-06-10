import { FILES_URL } from "../config/api";

async function handleResponse(response) {
  if (!response.ok) {
    throw new Error("Error en la petición al servidor");
  }

  return response.json();
}

export async function getFiles() {
  const response = await fetch(FILES_URL);
  return handleResponse(response);
}

export async function deleteFileById(fileId) {
  const response = await fetch(`${FILES_URL}/${fileId}`, {
    method: "DELETE",
  });

  return handleResponse(response);
}

export function getDownloadFileUrl(fileId) {
  return `${FILES_URL}/${fileId}/download`;
}