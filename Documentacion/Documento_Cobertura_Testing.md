# Informe de Cobertura de Pruebas Unitarias

**Proyecto:** HuertoHogar  
**Asignatura:** Desarrollo Full Stack II (DSY1104) - Duoc UC  
**Evaluación:** Evaluación 2 (30%)  
**Grupo 8:** Camilo Pérez, Bryan Rodríguez, Hugo Pinto  

---

## 1. Introducción
El presente informe describe las pruebas unitarias implementadas para la aplicación web HuertoHogar desarrollada en React con Vite. Las pruebas fueron diseñadas para validar los cuatro aspectos clave evaluados en componentes de React:

1. Renderizado de datos (renderizado estándar y renderizado condicional).
2. Manejo y recepción de propiedades (`props`).
3. Manejo del estado interno (`state`).
4. Simulación y control de eventos de usuario (`events`).

---

## 2. Herramientas y Entorno de Pruebas
Para la ejecución de pruebas se utilizó el ecosistema oficial integrado con Vite:

- **Vitest:** Test runner rápido y ligero para entornos Vite, compatible con la API de Jest y Jasmine.
- **@testing-library/react:** Utilidades para renderizar componentes en el DOM virtual y simular interacciones de usuario.
- **@testing-library/jest-dom:** Conjunto de matchers personalizados para aserciones (`toBeInTheDocument()`, `toHaveTextContent()`).
- **jsdom:** Entorno de emulación del navegador en Node.js.

### Comando para ejecutar las pruebas:
```bash
cd huertohogar-app
npm run test
```

---

## 3. Matriz de Cobertura de Pruebas

| ID | Categoría | Componente / Elemento Probado | Descripción de la Prueba | Resultado |
| :--- | :--- | :--- | :--- | :---: |
| **TEST-01** | Renderizado | `ProductCard.jsx` | Comprueba que el componente renderice correctamente los datos del producto (nombre, categoría, descripción y precio). | Aprobado |
| **TEST-02** | Renderizado Condicional | Formulario de validación | Verifica que el mensaje de error condicional no aparezca al inicio y solo se muestre cuando ocurre un error de validación. | Aprobado |
| **TEST-03** | Renderizado Condicional | `ProductCard.jsx` | Comprueba que el badge de oferta solo se muestre cuando la propiedad `enOferta` sea verdadera. | Aprobado |
| **TEST-04** | Propiedades (props) | Botón con props | Verifica que un componente de botón reciba la propiedad `etiqueta` ("Agregar al Carrito") y la despliegue correctamente en el DOM. | Aprobado |
| **TEST-05** | Estado (state) | Formulario controlado | Simula la escritura del usuario en un campo de texto y comprueba que el estado del componente se actualice correctamente. | Aprobado |
| **TEST-06** | Eventos (events) | Botón de acción | Simula un clic mediante `fireEvent.click()` y verifica que la función asociada (spy `vi.fn()`) sea ejecutada una vez. | Aprobado |

---

## 4. Resultados de la Ejecución

Salida obtenida al ejecutar la suite de pruebas en terminal:

```text
> huertohogar-app@0.0.0 test
> vitest run

 RUN  v5.0.5 C:/Users/Rose-/OneDrive/Documentos/GitHub/FS2_S04_G8/huertohogar-app

 ✓ src/__tests__/evaluacion2.test.jsx (6 tests) 99ms

 Test Files  1 passed (1)
      Tests  6 passed (6)
   Duration  977ms
```

---

## 5. Conclusiones
- Se ejecutaron satisfactoriamente el 100% de los casos de prueba sin fallos ni advertencias.
- Las pruebas cubren tanto componentes reales de la aplicación (`ProductCard.jsx`) como componentes de apoyo orientados a verificar props, estado y eventos.
- La configuración con Vitest y React Testing Library permite validar rápidamente los requerimientos de la evaluación y facilita la incorporación de nuevas pruebas a futuro.
