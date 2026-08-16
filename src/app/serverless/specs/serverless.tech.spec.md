# Serverless — Spec Técnica

Derivada de: `serverless.spec.md`

---

## Modelo de datos

```ts
interface Publication {
  id: string;
  context: string;
  question: string;
  aiResponse: string;
  authorName: string;
  authorId: string;
  authorEmail: string;
  createdAt: string;
  updatedAt: string;
  validationCounts: {
    correct: number;
    partiallyCorrect: number;
    incorrect: number;
  };
}
```

## Dependencias externas

| Módulo | Imports |
|--------|---------|
| `@/lib/localStorageDb` | `getStoredPublications` |

---

## Funciones — Módulo `getDudas`

### `getDoubtsList(): Promise<Publication[]>`
- **Exportada**: sí
- **Entrada**: ninguna
- **Salida**: `Publication[]`
- **Fuente de datos**: `getStoredPublications()` desde LocalStorage
- **Ordenamiento**: Descendente por `createdAt`
- **Flujo**:
  1. Consulta `getStoredPublications()`
  2. Ordena las publicaciones por fecha descendente
  3. Retorna el arreglo de publicaciones

