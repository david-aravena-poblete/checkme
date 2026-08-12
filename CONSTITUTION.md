# Constitución del Proyecto (Spec Driven Development)

Esta constitución define la arquitectura inmutable y el flujo de trabajo para el desarrollo de cualquier nueva característica, ruta o módulo dentro de este proyecto. Se basa en la metodología **Spec Driven Development (SDD)**, garantizando consistencia, mantenibilidad y facilidad de prueba en todo el código base.

## 1. Proceso de Desarrollo (SDD)

Antes de escribir cualquier línea de código de implementación para una nueva característica o ruta, se **DEBE** seguir este proceso estrictamente:

1.  **Spec de Usuario (`*.spec.md`)**: Definir los comportamientos del sistema desde la perspectiva del usuario. Debe incluir actores, flujos y criterios de aceptación enumerados y testables (ej. U-01, U-02).
2.  **Spec Técnica (`*.tech.spec.md`)**: Derivar de la Spec de Usuario. Definir modelos de datos (interfaces/tipos), firmas de funciones, props de componentes, dependencias y un mapeo directo de cómo cada criterio de aceptación de usuario se verificará técnicamente.
3.  **Spec de Comportamiento (`*.behavior.spec.js` / `.ts`)**: Representar las funciones y componentes a construir mediante esqueletos (stubs/mocks) con comentarios en lenguaje natural en sus cuerpos que expliquen paso a paso su lógica interna.
4.  **Implementación**: Escribir el código real respetando fielmente las especificaciones previamente aprobadas.

Las especificaciones deben residir en una carpeta `specs/` dentro del dominio correspondiente (ej. `app/specs/`, `app/components/specs/`, `app/utils/specs/`).

---

## 2. Arquitectura de Capas por Ruta

Toda ruta en la aplicación **DEBE** subdividirse en las siguientes capas de responsabilidad separadas. Queda estrictamente prohibido mezclar responsabilidades (ej. llamadas a base de datos dentro de un componente UI, o lógica de UI dentro de una función de datos).

### A. Capa de Lógica y Estado (`page.js` / `layout.js`)
- **Propósito**: Gestionar el ciclo de vida, el estado local (`useState`, `useReducer`), los efectos (`useEffect`) y manejar los eventos de usuario.
- **Reglas**:
  - Actúa como el controlador de la ruta.
  - No contiene HTML/CSS complejo, sino que importa y orquesta **Componentes Presentacionales (UI)**.
  - No formatea datos ni interactúa con la base de datos directamente; debe delegar estas tareas a la **Capa de Utils**.
  - Si maneja estado de cliente, debe llevar la directiva `'use client'`.

### B. Capa de Componentes Presentacionales (`components/`)
- **Propósito**: Renderizar la interfaz de usuario puramente en base a las `props` recibidas.
- **Reglas**:
  - Todos los componentes deben llevar el sufijo `UI` en su nombre de archivo y función (ej. `HeaderUI.jsx`).
  - No deben tener estado complejo ni efectos secundarios relacionados con la lógica de negocio (no `'use client'` salvo para animaciones estrictamente necesarias).
  - Cada componente reside en su propia carpeta junto a su módulo CSS (`ComponentUI.module.css`).
  - Solo reciben datos, renderizan UI y emiten eventos hacia arriba a través de callbacks (ej. `onClick`).

### C. Capa de Transformación de Datos (`utils/`)
- **Propósito**: Preparar, limpiar, agrupar y formatear los datos crudos para que la UI pueda consumirlos directamente.
- **Reglas**:
  - Son funciones puras o transformadores asíncronos.
  - Orquestan el llamado a la **Capa Serverless** para obtener datos crudos.
  - Deben manejar los errores a nivel de formateo o proveer defaults seguros.

### D. Capa Serverless / Acceso a Datos (`serverless/`)
- **Propósito**: Interactuar directamente con el SDK de backend (ej. Firebase, Supabase, APIs externas).
- **Reglas**:
  - Es la **única** capa autorizada para realizar consultas (`queries`), escrituras (`mutations`) o importar los SDKs de la base de datos.
  - Deben retornar datos crudos.
  - Deben implementar estrategias de fallback (ej. datos mock) o manejar los errores de red de manera que no rompan la aplicación si el servicio no está disponible.

---

## 3. Flujo de Datos Estándar

El flujo de información unidireccional para cualquier ruta debe verse así:

```text
[Interacción del Usuario] -> (Capa de Lógica: page.js) 
                                      |
                                      v
(Capa de Lógica: page.js) -> llama a -> (Capa de Transformación: utils/...)
                                      |
                                      v
(Capa de Transformación)  -> llama a -> (Capa Serverless: serverless/...)
                                      |
                                      v
(Capa Serverless)         -> retorna -> (Datos Crudos)
                                      |
                                      v
(Capa de Transformación)  -> retorna -> (Datos Formateados)
                                      |
                                      v
(Capa de Lógica: page.js) -> pasa props a -> (Componentes Presentacionales: components/*UI.jsx)
                                      |
                                      v
[Renderizado en Pantalla]
```

## 4. Estilo y Diseño
- Se debe utilizar un sistema de diseño basado en variables CSS globales (`globals.css`).
- Los componentes deben consumir estas variables para colores, espaciados, tipografías y transiciones, garantizando la coherencia visual en toda la aplicación.
