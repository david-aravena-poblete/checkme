// Components — Spec de comportamiento

function NavbarUI() {
  // No recibe props.
  // Renderiza un nav fijo en la parte superior.
  // Dentro del nav, renderiza un div con el logo: texto "Check" seguido de un span con "Me" en color acento.
  // Renderiza un div de navegación con un link "Inicio" apuntando a "/" y un botón "Iniciar Sesión".
}

function SearchInputUI({ value, onChange, placeholder }) {
  // Recibe value, onChange y placeholder como props.
  // Renderiza un contenedor con un wrapper que contiene un ícono de búsqueda y un input de texto.
  // El input tiene el value controlado por la prop value.
  // Al escribir en el input, se invoca la función onChange recibida.
  // Si no se recibe placeholder, usa "Buscar por título..." como valor por defecto.
}

function DoubtCardUI({ title, content, authorName, date, responsesCount }) {
  // Recibe title, content, authorName, date y responsesCount como props.
  // Renderiza un article que actúa como card.
  // Muestra el título en un h3 truncado a 2 líneas.
  // Muestra el contenido en un párrafo truncado a 3 líneas.
  // Renderiza una sección de metadata con el nombre del autor, un separador y la fecha.
  // Si responsesCount es mayor a 0, muestra un badge con el ícono 💬 y el número de respuestas.
  // Si responsesCount es 0, no renderiza el badge.
}

function CategoryColumnUI({ categoryName, doubts, count, searchValue, onSearchChange }) {
  // Recibe categoryName, doubts, count, searchValue y onSearchChange como props.
  // Renderiza una section que actúa como columna vertical.
  // En el header muestra el nombre de la categoría en un h2 y el conteo total en un span.
  // Renderiza un SearchInputUI pasándole searchValue, onSearchChange y placeholder "Buscar en {categoryName}...".
  // Si doubts tiene elementos, itera sobre cada uno y renderiza un DoubtCardUI con key=doubt.id.
  // Si doubts está vacío o es null, muestra un párrafo con "No se encontraron dudas".
}
