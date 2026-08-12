# Utils — Spec Técnica

Derivada de: `utils.spec.md`

---

## Modelo de datos

```ts
// Entrada (desde serverless)
interface Duda {
  id: string;
  title: string;
  content: string;
  category: string;
  authorName: string;
  authorId: string;
  createdAt: string;
  responsesCount: number;
}

// Salida (hacia page.js)
interface DudaFormatted extends Omit<Duda, 'createdAt'> {
  date: string;
}

type DudasByCategory = Record<string, DudaFormatted[]>;
```

---

## Funciones — Módulo `getDudas`

### `getDudasByCategory(): Promise<DudasByCategory>`
- **Exportada**: sí
- **Entrada**: ninguna
- **Dependencia**: `getDoubtsList()` de `serverless/getDudas`
- **Salida**: `Record<string, DudaFormatted[]>`
- **Flujo**: llama a `getDoubtsList()` → pasa resultado a `groupByCategory()`

### `groupByCategory(dudas: Duda[]): DudasByCategory`
- **Exportada**: no (interna)
- **Entrada**: array de `Duda`
- **Salida**: objeto agrupado por `category`
- **Lógica**: `reduce` sobre el array. Cada duda se asigna a `acc[category]`. Si `category` es falsy, usa `"Sin categoría"`. Aplica `formatDate(createdAt)` a cada duda.

### `formatDate(dateString: string): string`
- **Exportada**: no (interna)
- **Entrada**: string de fecha
- **Salida**: fecha formateada o string original si falla
- **Formato**: `toLocaleDateString('es-CL', { day: 'numeric', month: 'short', year: 'numeric' })`

---

## Mapeo criterios → verificación técnica

| ID | Qué verificar |
|----|---------------|
| U-01 | `typeof resultado === 'object'` y cada key es `string` |
| U-02 | `Array.isArray(resultado[key])` para cada key |
| U-03 | Cada elemento tiene propiedad `date` de tipo `string` |
| U-04 | `formatDate("2025-08-10")` retorna string que contiene `"2025"` y un mes |
| U-05 | `formatDate("invalido")` retorna `"invalido"` |
| U-06 | Duda con `category: undefined` → aparece en key `"Sin categoría"` |
| U-07 | Suma de `.length` de todos los arrays === `dudas.length` original |
