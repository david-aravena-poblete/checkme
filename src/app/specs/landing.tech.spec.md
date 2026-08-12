# Landing `/` — Spec Técnica

Derivada de: `landing.spec.md`

---

## Modelo de datos

```ts
interface Duda {
  id: string;
  title: string;
  content: string;
  category: string;
  authorName: string;
  authorId: string;
  createdAt: string;       // ISO date o "YYYY-MM-DD"
  responsesCount: number;
}

// Salida de utils/getDudas
type DudasByCategory = Record<string, DudaFormatted[]>;

interface DudaFormatted extends Omit<Duda, 'createdAt'> {
  date: string; // fecha formateada con toLocaleDateString('es-CL')
}
```

---

## Arquitectura de archivos

| Capa | Archivo | Responsabilidad |
|------|---------|-----------------|
| Lógica | `page.js` | Estado, handlers, renderiza UI |
| Utils | `utils/getDudas/getDudas.js` | `getDudasByCategory()` → agrupa + formatea |
| Serverless | `serverless/getDudas/getDudas.js` | `getDoubtsList()` → Firestore query o mock |

---

## Funciones

### `getDoubtsList(): Promise<Duda[]>`
- **Capa**: serverless
- **Entrada**: ninguna
- **Salida**: array de `Duda`
- **Comportamiento**: query Firestore `dudas` ordenada por `createdAt desc`. Fallback a mock si Firebase no está configurado.
- **Colección Firestore**: `dudas`

### `getDudasByCategory(): Promise<DudasByCategory>`
- **Capa**: utils
- **Entrada**: ninguna (llama a `getDoubtsList` internamente)
- **Salida**: objeto `{ [category]: DudaFormatted[] }`
- **Transformaciones**: agrupa por `category`, convierte `createdAt` a `date` con `formatDate()`

### `formatDate(dateString: string): string`
- **Capa**: utils (interna)
- **Formato**: `toLocaleDateString('es-CL', { day: 'numeric', month: 'short', year: 'numeric' })`

---

## Componentes UI (presentacionales)

### `NavbarUI`
- **Props**: ninguna
- **Elementos**: `<nav>`, logo "Check**Me**", link `/`, botón "Iniciar Sesión"

### `CategoryColumnUI`
- **Props**: `categoryName: string`, `doubts: DudaFormatted[]`, `count: number`, `searchValue: string`, `onSearchChange: (e) => void`
- **Renderiza**: header, `SearchInputUI`, lista de `DoubtCardUI`
- **Vacío**: muestra "No se encontraron dudas" si `doubts.length === 0`

### `SearchInputUI`
- **Props**: `value: string`, `onChange: (e) => void`, `placeholder: string`
- **Elemento**: `<input type="text">`

### `DoubtCardUI`
- **Props**: `title: string`, `content: string`, `authorName: string`, `date: string`, `responsesCount: number`
- **Condicional**: `responsesCount > 0` → muestra badge con conteo

---

## Estado de `page.js`

| Estado | Tipo | Inicial | Uso |
|--------|------|---------|-----|
| `dudasByCategory` | `DudasByCategory` | `{}` | Datos agrupados |
| `searchTerms` | `Record<string, string>` | `{}` | Término de búsqueda por categoría |
| `isLoading` | `boolean` | `true` | Controla loading state |

## Handlers de `page.js`

### `handleSearchChange(category, value)`
- Actualiza `searchTerms[category]` con `value`

### `getFilteredDoubts(category, doubts): DudaFormatted[]`
- Si `searchTerms[category]` está vacío → retorna `doubts` sin filtrar
- Filtra: `doubt.title.toLowerCase().includes(term.toLowerCase())`
- Scope: solo afecta la categoría indicada

---

## CSS crítico

| Selector | Propiedad clave | Criterio |
|----------|----------------|----------|
| `.categoriesContainer` | `display: flex; overflow-x: auto` | L-11 |
| `.column` | `min-width: 320px; flex-shrink: 0` | Columnas fijas en scroll |
| `.title` (card) | `-webkit-line-clamp: 2` | Máx 2 líneas |
| `.content` (card) | `-webkit-line-clamp: 3` | Máx 3 líneas |

Breakpoints responsive: `768px`, `480px` → L-13

---

## Mapeo criterios → verificación técnica

| ID | Qué verificar |
|----|---------------|
| L-01 | `Home` monta sin throw |
| L-02 | `isLoading=true` → existe `.loadingContainer` |
| L-03 | `Object.keys(dudasByCategory).length === columnas renderizadas` |
| L-04 | Cada `CategoryColumnUI` recibe `categoryName` y lo muestra en `<h2>` |
| L-05 | Prop `count` se muestra en `.count` |
| L-06 | `DoubtCardUI` renderiza `title`, `content`, `authorName`, `date` |
| L-07 | `responsesCount > 0` → `.responsesCount` visible |
| L-08 | `handleSearchChange` actualiza solo `searchTerms[category]` |
| L-09 | `getFilteredDoubts` usa `.toLowerCase().includes()` |
| L-10 | Filtro sin match → `.emptyState` visible |
| L-11 | `.categoriesContainer` tiene `overflow-x: auto` |
| L-12 | `NavbarUI` contiene logo, link "/", botón |
| L-13 | Media queries en `page.module.css` y `CategoryColumnUI.module.css` |
