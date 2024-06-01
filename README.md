# Tienda en Línea - MiniMart PWA

## Descripción

Este proyecto es una tienda en línea desarrollada con React y Vite. La aplicación permite a los usuarios visualizar productos y categorías, aplicar filtros en la página de categorías, y gestionar un carrito de compras. Además, la aplicación está optimizada como una Progressive Web App (PWA), lo que permite que sea instalable, funcione offline y envíe notificaciones push.

## Características

- **Home**: Página principal donde se visualizan algunos productos destacados y todas las categorías.
- **Página de Categorías**: Permite a los usuarios ver productos filtrados por diferentes criterios (categoria, rango de precio y articulos en específicos por el buscador).
- **Página de Carrito**: Los usuarios pueden ver y gestionar los productos que desean comprar y simular una compra.
- **Página de Profile**: Los usuarios pueden registarse para poder agregar a favorito productos.
- **PWA**: La aplicación puede ser instalada en dispositivos móviles y de escritorio, funcionar sin conexión a internet y enviar notificaciones push.

## Tecnologías Utilizadas

- **React**: Biblioteca de JavaScript para construir interfaces de usuario.
- **Vite**: Herramienta de construcción rápida para proyectos de frontend.
- **PWA**: Implementación de Progressive Web App para funcionalidad offline e instalación.
- **Vitest**: Vitest es un framework de pruebas para aplicaciones JavaScript y TypeScript. Diseñado para ser rápido, ligero y fácil de usar, Vitest se integra perfectamente con Vite

## Instalación y Configuración

### Prerrequisitos

- Correr la api local-shop-ap

### Pasos para la instalación

1. **Clonar el repositorio**:

   ```bash
   git clone https://github.com/anailoki/convenience-store.git
   cd convenience-store
   ```

2. **Instalar librerias**:

```bash
 npm install
```

3. **Correr el proyecto**:

```bash
 npm run dev
```

### Pasos para la ejecución

1. **Modo Desarollo**:

   ```bash
   npm run dev
   ```

2. **Modo Produccion**:

```bash
 npm run build
 npm run preview
```

3. **Correr Pruebas**:

```bash
 npm run test
```

## Decisiones de diseño

1.  Tecnología y Herramientas
    Frontend: React con Vite

    React: Elegido por su popularidad, facilidad de uso, y su ecosistema robusto.
    Vite: Seleccionado por su rendimiento rápido en desarrollo y su capacidad para manejar proyectos modernos de frontend.

2.  Progressive Web App (PWA)
    Decisión: Implementar PWA

    Instalabilidad: Permitir a los usuarios instalar la aplicación en sus dispositivos.
    Funcionalidad Offline: Usar Service Workers para cachear recursos y datos, permitiendo el uso de la aplicación sin conexión.
    Notificaciones Push: Implementar notificaciones para mantener a los usuarios informados sobre promociones y actualizaciones.

3.  Estructura de la Aplicación
    Componentes Reutilizables: Crear componentes reutilizables para elementos UI comunes como botones, tarjetas de productos, y formularios.

    Se eligió tener filtros de categorías con íconos en la parte superior de la pantalla principal para simplificar el consumo de la información a los usuarios.

    El banner se incluyó para dar jerarquía a las promociones que busque resaltar el abarrotero. Ej.: Productos que no se hayan vendido que estén próximos a expirar.

    Se agregó la funcionalidad de Favoritos para simplificar que los usuarios encuentres productos recurrentes.

    Se buscó las imágenes de cada producto para simular la experiencia de compra del usuario.

4.  Gestión del Estado
    Decisión: Redux

    Redux: Se implemento Redux para la gestión de estado global, especialmente útil para manejar el estado del carrito, el estado de la data de los productos, y otros datos globales.

5.  Estilos y UI/UX
    Decisión: Framework de UI

    Tailwind CSS: Se implemento Tailwind CSS para un diseño rápido y eficiente.
    Componentes de UI: Utilizar Material-Ui por la facilidad que tiene de implementarlso en un poryecto y la variedad de modernos componentes.

6.  Pruebas
    Decisión: Herramientas de Pruebas

    Vitest: Se implemento para las pruebas unitarias y de integración.
    Testing Library: Se implemento @testing-library/react para pruebas de componentes React.

    Cobertura de Código: Se configuto Vitest para generar informes de cobertura de código.

7.  Despliegue y CI/CD
    Decisión: Plataforma de Despliegue

    Netlify: Se desplego el frontend en Netlify por su facilidad de uso e integracion que tiene con GITHUB.
