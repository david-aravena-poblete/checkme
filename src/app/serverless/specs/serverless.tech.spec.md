# Serverless — Spec Técnica

Derivada de: `serverless.spec.md`

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
  createdAt: string;
  responsesCount: number;
}
```

## Dependencias externas

| Módulo | Imports |
|--------|---------|
| `firebase/firestore` | `collection`, `getDocs`, `query`, `orderBy` |
| `@/lib/firebase` | `db` (import dinámico) |

---

## Funciones — Módulo `getDudas`

### `getDoubtsList(): Promise<Duda[]>`
- **Exportada**: sí
- **Entrada**: ninguna
- **Salida**: `Duda[]`
- **Colección Firestore**: `dudas`
- **Query**: `query(collection(db, 'dudas'), orderBy('createdAt', 'desc'))`
- **Import de db**: dinámico (`await import('@/lib/firebase')`) para aislar el fallo si Firebase no está configurado
- **Flujo**:
  1. Intenta importar `db`
  2. Ejecuta query a Firestore
  3. Si `snapshot.empty` → retorna `MOCK_DUDAS`
  4. Si hay docs → mapea `doc.id + doc.data()` → retorna array
  5. Si catch → `console.warn` + retorna `MOCK_DUDAS`

### `MOCK_DUDAS: Duda[]` (constante)
- **Exportada**: no (interna)
- **Longitud**: 15 elementos
- **Categorías**: Salud (3), Tecnología (3), Ciencia (3), Política (3), Educación (3)

---

## Mapeo criterios → verificación técnica

| ID | Qué verificar |
|----|---------------|
| S-01 | `Array.isArray(await getDoubtsList())` |
| S-02 | Cada elemento tiene las 8 propiedades del modelo `Duda` |
| S-03 | Mock de Firestore con docs → retorna esos docs mapeados |
| S-04 | Mock de Firestore con `snapshot.empty = true` → retorna `MOCK_DUDAS` |
| S-05 | Import de firebase lanza error → catch retorna `MOCK_DUDAS` sin throw |
| S-06 | `MOCK_DUDAS.length >= 15` |
| S-07 | `new Set(MOCK_DUDAS.map(d => d.category)).size >= 5` |
