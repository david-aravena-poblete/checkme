// Utils — Spec de comportamiento

function formatDate(dateString) {
  // Recibe un string que representa una fecha.
  // Crea un objeto Date a partir del string.
  // Lo formatea con localización chilena: día numérico, mes abreviado, año completo.
  // Si el parseo o formateo falla, retorna el string original sin modificar.
}

function groupByCategory(dudas) {
  // Recibe un array de dudas crudas.
  // Itera sobre cada duda y la asigna a un grupo según su campo category.
  // Si una duda no tiene category (undefined, null o vacío), la asigna al grupo "Sin categoría".
  // A cada duda le agrega un campo date aplicando formatDate sobre su createdAt.
  // Retorna un objeto donde cada key es el nombre de una categoría y cada value es el array de dudas formateadas.
}

async function getDudasByCategory() {
  // Llama a getDoubtsList de la capa serverless para obtener las dudas crudas.
  // Pasa el resultado a groupByCategory para agrupar y formatear.
  // Retorna el objeto agrupado.
}
