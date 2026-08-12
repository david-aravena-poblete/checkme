# Landing `/` — User Spec

## Descripción
Página pública que muestra dudas publicadas agrupadas por categoría en un layout horizontal scrollable.

## Actores
- **Visitante**: usuario no autenticado que navega las dudas.

---

## Comportamientos

### 1. Carga inicial
- Al entrar a `/`, se muestra un estado de carga mientras se obtienen las dudas.
- Al completar la carga, se renderizan columnas de categorías ordenadas horizontalmente.
- Si no hay dudas, cada columna muestra un mensaje vacío.

### 2. Visualización de categorías
- Cada categoría se muestra como una columna con:
  - **Header**: nombre de la categoría + conteo total de dudas.
  - **Buscador**: input de texto para filtrar por título.
  - **Lista**: cards de dudas ordenadas verticalmente.

### 3. Card de duda
Cada card muestra:
- Título (máx. 2 líneas visibles).
- Contenido (máx. 3 líneas visibles).
- Autor, fecha y conteo de respuestas.

### 4. Búsqueda por título
- El visitante escribe en el buscador de una categoría.
- La lista se filtra en tiempo real (case-insensitive, match parcial en título).
- Si no hay resultados, se muestra mensaje vacío.
- El filtro de una categoría NO afecta las demás.

### 5. Navegación (Navbar)
- Logo "CheckMe" visible.
- Link "Inicio" apunta a `/`.
- Botón "Iniciar Sesión" visible.

---

## Flujo de datos

```
page.js (estado + handlers)
  → utils/getDudas (agrupa por categoría, formatea fechas)
    → serverless/getDudas (consulta Firestore o retorna mock)
```

---

## Criterios de aceptación (testables)

| ID | Criterio |
|----|----------|
| L-01 | La ruta `/` renderiza sin errores |
| L-02 | Se muestra estado de carga antes de obtener datos |
| L-03 | Se renderizan N columnas donde N = cantidad de categorías |
| L-04 | Cada columna muestra el nombre de categoría en su header |
| L-05 | Cada columna muestra el conteo total de dudas |
| L-06 | Cada card muestra título, contenido, autor, fecha |
| L-07 | Cards con respuestas > 0 muestran el conteo |
| L-08 | Escribir en el buscador filtra solo las dudas de esa categoría |
| L-09 | El filtro es case-insensitive y parcial sobre el título |
| L-10 | Filtro sin resultados muestra mensaje vacío |
| L-11 | El contenedor de categorías tiene scroll horizontal |
| L-12 | Navbar muestra logo, link Inicio y botón Iniciar Sesión |
| L-13 | La página es responsive (mobile, tablet, desktop) |
