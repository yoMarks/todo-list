export function formatDate(date) {
  return new Date(date).toLocaleString("es-BO", {//conviete fecha a formtato legible
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}