# Documento de Cobertura de Testing
## Proyecto: HuertoHogar (Evaluación 2 - 30%)
### Duoc UC - Desarrollo Fullstack II
**Grupo 8:** Camilo Perez, Bryan Rodriguez, Hugo Pinto

---

## 1. Introducción y Objetivos de las Pruebas
El presente documento detalla la estrategia, cobertura y resultados de la batería de pruebas unitarias implementadas para los componentes de la aplicación web **HuertoHogar en React**.

El objetivo es asegurar la estabilidad, robustez y calidad del software verificando cuatro aspectos esenciales de React:
1. **Renderizado de datos (Correcto y Condicional).**
2. **Recepción y uso de propiedades (`props`).**
3. **Gestión del estado interno (`state`).**
4. **Simulación de eventos de usuario (`events`).**

---

## 2. Herramientas y Entorno de Pruebas
- **Framework de Pruebas:** `Vitest` (ejecutor de pruebas ultrarrápido integrado con Vite, con compatibilidad sintáctica con Jasmine / Jest).
- **Librería de Testing en React:** `@testing-library/react`.
- **Extensiones DOM:** `@testing-library/jest-dom` (matchers como `toBeInTheDocument()`, `toHaveTextContent()`).
- **Simulación del DOM:** `jsdom`.

Para ejecutar las pruebas en consola:
```bash
cd huertohogar-app
npm run test
```

---

## 3. Matriz de Cobertura de Pruebas Unitarias

| ID Test | Categoría | Componente / Caso Probado | Descripción y Tarea Verificada | Resultado |
| :--- | :--- | :--- | :--- | :---: |
| **TEST-01** | **Renderizado** | `ProductCard.jsx` | **Renderizado correcto:** Verifica que el componente muestre el nombre, categoría, descripción y precio recibidos en los datos. | **PASSED (✓)** |
| **TEST-02** | **Renderizado** | `FormularioPrueba` | **Renderizado condicional:** Comprueba que el mensaje de error condicional `role="alert"` NO se muestre inicialmente y se haga visible SOLO cuando hay un error presente. | **PASSED (✓)** |
| **TEST-03** | **Renderizado** | `ProductCard.jsx` | **Renderizado condicional:** Verifica que la etiqueta/badge de oferta (`🔥 OFERTA`) solo se dibuje si la propiedad `enOferta === true`. | **PASSED (✓)** |
| **TEST-04** | **Propiedades** | `BotonAccion` | **Propiedades recibidas:** Confirma que un componente botón reciba la propiedad `etiqueta` ("Agregar al Carrito") y la despliegue correctamente en el DOM. | **PASSED (✓)** |
| **TEST-05** | **Estado** | `FormularioPrueba` | **Gestión del estado (`state`):** Simula la escritura del usuario en un campo de texto y verifica que el estado interno se actualice fielmente en el valor del input. | **PASSED (✓)** |
| **TEST-06** | **Eventos** | `BotonAccion` | **Simulación de eventos:** Ejecuta un clic en el botón mediante `fireEvent.click()` y comprueba que la función espía (`spy / vi.fn()`) se ejecute exactamente 1 vez. | **PASSED (✓)** |

---

## 4. Análisis y Ejecución de Resultados

### Resumen de la Ejecución en Consola:
```text
> huertohogar-app@0.0.0 test
> vitest run

 RUN  v5.0.5 C:/Users/Rose-/OneDrive/Documentos/GitHub/FS2_S04_G8/huertohogar-app

 ✓ src/__tests__/evaluacion2.test.jsx (6 tests) 125ms

 Test Files  1 passed (1)
      Tests  6 passed (6)
   Duration  1.42s
```

### Conclusiones Técnicas:
1. **100% de éxito en los casos de prueba:** Todos los tests pasaron sin advertencias ni errores de aserción.
2. **Cumplimiento estricto de la rúbrica docente:** Se cubrieron todas las tareas exigidas en la sección *"Propuesta de pruebas con Jasmine/React"* (Renderizado de datos, Renderizado condicional de errores, Props en botones, State reactivo en formularios y Eventos de clic).
3. **Mantenibilidad:** El código de prueba está desacoplado y puede extenderse fácilmente para futuros sprints del desarrollo semestral.
