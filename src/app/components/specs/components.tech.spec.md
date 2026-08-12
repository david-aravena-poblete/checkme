# Components — Spec Técnica

Derivada de: `components.spec.md`

---

## Convenciones
- Sufijo `UI` en nombre de componente y archivo.
- Extensión `.jsx`.
- Cada componente en su propia carpeta con CSS module homónimo.
- Sin `'use client'` — son presentacionales puros.

---

## NavbarUI
- **Props**: ninguna
- **Elementos**: `<nav>` → `<div>.logo` ("Check" + `<span>.logoAccent` "Me"), `<div>.nav` → `<a href="/">`, `<button>`
- **CSS**: posición fixed, top 0, z-index 100, height `var(--navbar-height)`

## SearchInputUI
- **Props**: `value: string`, `onChange: (e) => void`, `placeholder?: string`
- **Elementos**: `<div>.container` → `<div>.wrapper` → `<span>.icon` "⌕" + `<input type="text">`
- **Default**: `placeholder` fallback a `'Buscar por título...'`
- **Evento**: `onChange` se pasa directo al `<input>`

## DoubtCardUI
- **Props**: `title: string`, `content: string`, `authorName: string`, `date: string`, `responsesCount: number`
- **Elementos**: `<article>.card` → `<h3>.title`, `<p>.content`, `<div>.meta` → `.author`, `.dot`, `.date`, `.responsesCount` (condicional)
- **Condicional**: `responsesCount > 0` → renderiza `<span>.responsesCount` con "💬 {n}"
- **CSS truncado**: title `-webkit-line-clamp: 2`, content `-webkit-line-clamp: 3`

## CategoryColumnUI
- **Props**: `categoryName: string`, `doubts: array`, `count: number`, `searchValue: string`, `onSearchChange: (e) => void`
- **Elementos**: `<section>.column` → `.header` (`<h2>` + `<span>.count`), `SearchInputUI`, `<div>.list` (loop `DoubtCardUI` o `.emptyState`)
- **Hijos**: `SearchInputUI` recibe `placeholder="Buscar en ${categoryName}..."`, `DoubtCardUI` recibe `key={doubt.id}`
- **Vacío**: `doubts.length === 0 || !doubts` → `<p>.emptyState`

---

## Mapeo criterios → verificación técnica

| ID | Qué verificar |
|----|---------------|
| C-01 | `NavbarUI` contiene texto "Check" y span con "Me" |
| C-02 | Existe `<a>` con `href="/"` y textContent "Inicio" |
| C-03 | Existe `<button>` con textContent "Iniciar Sesión" |
| C-04 | `SearchInputUI` renderiza `<input type="text">` |
| C-05 | Sin prop placeholder → input.placeholder === "Buscar por título..." |
| C-06 | Simular typing → onChange es invocado con el event |
| C-07 | `DoubtCardUI` renderiza los 4 textos recibidos por props |
| C-08 | `responsesCount=0` → no existe `.responsesCount`; `responsesCount=5` → existe |
| C-09 | `CategoryColumnUI` renderiza `<h2>` con texto de `categoryName` |
| C-10 | Existe `.count` con textContent igual a `count` |
| C-11 | Existe un `SearchInputUI` como hijo |
| C-12 | Cantidad de `DoubtCardUI` renderizados === `doubts.length` |
| C-13 | `doubts=[]` → existe `.emptyState` con texto "No se encontraron dudas" |
