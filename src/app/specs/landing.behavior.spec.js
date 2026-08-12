// Landing page.js — Spec de comportamiento

function Home() {
  // Estado: objeto vacío que almacenará las dudas agrupadas por nombre de categoría.
  // Cada key es un string (nombre de categoría), cada value es un array de dudas formateadas.
  estado dudasByCategory = {}

  // Estado: objeto vacío que almacenará el término de búsqueda activo por categoría.
  // Cada key es un string (nombre de categoría), cada value es el texto ingresado en el buscador.
  estado searchTerms = {}

  // Estado: booleano que inicia en true. Controla si se muestra el indicador de carga.
  estado isLoading = true

  // Efecto que se ejecuta una sola vez al montar el componente.
  // Llama a la función de utils para obtener las dudas agrupadas por categoría.
  // Al recibir los datos, los guarda en dudasByCategory.
  // Si falla, registra el error en consola.
  // Al finalizar (éxito o error), cambia isLoading a false.
  efecto fetchDudas()

  return render()
}

function handleSearchChange(category, value) {
  // Recibe el nombre de una categoría y el texto ingresado por el usuario.
  // Actualiza únicamente la entrada correspondiente a esa categoría en searchTerms.
  // No modifica los términos de búsqueda de otras categorías.
}

function getFilteredDoubts(category, doubts) {
  // Recibe el nombre de una categoría y su array de dudas.
  // Busca en searchTerms si existe un término activo para esa categoría.
  // Si no hay término, retorna el array completo sin modificar.
  // Si hay término, filtra las dudas cuyo título contenga el término.
  // La comparación es case-insensitive y por coincidencia parcial.
  // Retorna el array filtrado.
}

function render() {
  // Renderiza el componente NavbarUI sin props.

  // Renderiza una sección hero con un h1 de título y un párrafo de subtítulo.

  // Si isLoading es true:
  //   Renderiza un contenedor centrado con texto "Cargando dudas" y una animación de 3 puntos.

  // Si isLoading es false:
  //   Renderiza un contenedor con scroll horizontal.
  //   Itera sobre cada entrada de dudasByCategory (categoría, dudas).
  //   Por cada entrada renderiza un CategoryColumnUI con:
  //     - categoryName: el nombre de la categoría
  //     - doubts: resultado de getFilteredDoubts(categoría, dudas)
  //     - count: cantidad total de dudas (sin filtrar)
  //     - searchValue: término actual de searchTerms para esa categoría
  //     - onSearchChange: llama a handleSearchChange con la categoría y el valor del input
}
