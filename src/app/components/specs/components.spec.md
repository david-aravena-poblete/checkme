# Components — Spec de Usuario

## Descripción
Componentes presentacionales (sufijo UI) que reciben props y renderizan interfaz. No contienen lógica de negocio ni estado.

---

## NavbarUI
- Muestra el logo "CheckMe" con acento visual en "Me".
- Muestra un link "Inicio" que apunta a `/`.
- Muestra un botón "Iniciar Sesión".
- Es fijo en la parte superior de la pantalla.

## SearchInputUI
- Muestra un campo de texto con ícono de búsqueda.
- Muestra el placeholder recibido o "Buscar por título..." por defecto.
- Emite el evento onChange al escribir.

## DoubtCardUI
- Muestra título (máx. 2 líneas) y contenido (máx. 3 líneas).
- Muestra autor y fecha.
- Si responsesCount > 0, muestra el conteo con ícono 💬.
- Si responsesCount es 0, no muestra el badge.

## CategoryColumnUI
- Muestra un header con nombre de categoría y conteo total.
- Renderiza un SearchInputUI con el placeholder "Buscar en {categoría}...".
- Renderiza una lista vertical de DoubtCardUI.
- Si el array de dudas está vacío, muestra "No se encontraron dudas".

---

## Criterios de aceptación

| ID | Criterio |
|----|----------|
| C-01 | NavbarUI renderiza logo con texto "Check" y "Me" |
| C-02 | NavbarUI renderiza link con href "/" y texto "Inicio" |
| C-03 | NavbarUI renderiza botón con texto "Iniciar Sesión" |
| C-04 | SearchInputUI renderiza un input type="text" |
| C-05 | SearchInputUI usa placeholder por defecto si no recibe prop |
| C-06 | SearchInputUI invoca onChange al escribir |
| C-07 | DoubtCardUI renderiza title, content, authorName y date |
| C-08 | DoubtCardUI muestra badge de respuestas solo si responsesCount > 0 |
| C-09 | CategoryColumnUI renderiza categoryName en un h2 |
| C-10 | CategoryColumnUI renderiza el count |
| C-11 | CategoryColumnUI renderiza un SearchInputUI |
| C-12 | CategoryColumnUI renderiza N DoubtCardUI donde N = doubts.length |
| C-13 | CategoryColumnUI muestra estado vacío cuando doubts está vacío |
