# Utils — Spec de Usuario

## Descripción
Funciones utilitarias que transforman y preparan datos crudos provenientes de la capa serverless antes de entregarlos a la capa de lógica (page.js).

## Módulo: `getDudas`

### Comportamientos

#### 1. Obtener dudas agrupadas por categoría
- Se solicitan las dudas a la capa serverless.
- Las dudas se agrupan por su categoría.
- Las fechas se convierten a formato legible en español (Chile).
- Se retorna un objeto donde cada key es una categoría y su valor es la lista de dudas.

#### 2. Formateo de fechas
- Una fecha en formato ISO o "YYYY-MM-DD" se convierte a formato local chileno (ej: "10 ago 2025").
- Si la fecha es inválida, se retorna el string original sin modificar.

#### 3. Agrupación
- Las dudas sin categoría se agrupan bajo "Sin categoría".
- El orden de las categorías depende del orden de aparición en los datos.

---

## Criterios de aceptación

| ID | Criterio |
|----|----------|
| U-01 | `getDudasByCategory` retorna un objeto con keys de tipo string |
| U-02 | Cada value del objeto es un array de dudas |
| U-03 | Cada duda agrupada tiene un campo `date` formateado |
| U-04 | `formatDate("2025-08-10")` retorna un string con día, mes abreviado y año |
| U-05 | `formatDate("invalido")` retorna `"invalido"` |
| U-06 | Dudas sin campo `category` se agrupan bajo `"Sin categoría"` |
| U-07 | La cantidad total de dudas agrupadas es igual a la cantidad de dudas crudas |
