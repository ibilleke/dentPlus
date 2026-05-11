# 🦷 DentPlus — Sistema de Gestión de Afiliados

![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?style=flat-square&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.18-000000?style=flat-square&logo=express&logoColor=white)
![Handlebars](https://img.shields.io/badge/Handlebars-7.1-f0772b?style=flat-square&logo=handlebarsdotjs&logoColor=white)
![Licencia](https://img.shields.io/badge/Licencia-MIT-blue?style=flat-square)

> Plataforma web para administrar afiliados de una red dental, con cálculo automático de descuentos según nivel de membresía.

---

## ¿Qué es DentPlus?

DentPlus es una aplicación web construida con arquitectura **MVC** que permite gestionar el programa de afiliados de una clínica o red dental. Cada afiliado tiene asignado un nivel de membresía (Silver, Gold o Platinum) que determina el porcentaje de descuento que recibe en sus tratamientos. La plataforma incluye un simulador interactivo para calcular precios finales en tiempo real.

---

## Características

- **CRUD completo** de afiliados: crear, listar, ver detalle, editar y eliminar
- **3 niveles de membresía** con descuentos diferenciados:
  - 🥈 **Silver** — 5% de descuento
  - 🥇 **Gold** — 10% de descuento
  - 💎 **Platinum** — 20% de descuento
- **Simulador de descuentos** interactivo por afiliado
- **Interfaz web responsive** con diseño corporativo
- **Sin base de datos externa** — persistencia liviana en archivo JSON

---

## Stack Tecnológico

| Tecnología          | Versión | Rol                                       |
|---------------------|---------|-------------------------------------------|
| Node.js             | 20.x    | Runtime de servidor                       |
| TypeScript          | 5.3.3   | Lenguaje tipado                           |
| Express             | 4.18.2  | Framework HTTP                            |
| Express Handlebars  | 7.1.2   | Motor de plantillas (vistas HTML)         |
| method-override     | 3.0.0   | Soporte PUT/DELETE en formularios HTML    |
| ts-node-dev         | 2.0.0   | Recarga automática en desarrollo          |

---

## Estructura del Proyecto

```
dentplus/
├── src/
│   ├── app.ts                        # Punto de entrada: configura Express y middleware
│   ├── models/
│   │   └── AffiliateModel.ts         # Lógica de negocio, CRUD y cálculo de descuentos
│   ├── controllers/
│   │   └── AffiliateController.ts    # Controladores HTTP (7 acciones)
│   ├── routes/
│   │   └── affiliateRoutes.ts        # Definición de rutas
│   └── views/
│       ├── layouts/
│       │   └── main.handlebars       # Layout base con navegación
│       └── affiliates/
│           ├── index.handlebars      # Listado de afiliados
│           ├── show.handlebars       # Detalle + simulador de descuentos
│           └── form.handlebars       # Formulario crear/editar
├── public/
│   └── css/
│       └── style.css                 # Estilos responsivos
├── data/
│   └── affiliates.json               # Base de datos en archivo JSON
├── package.json
└── tsconfig.json
```

---

## Arquitectura MVC

| Capa            | Archivo                  | Responsabilidad                                        |
|-----------------|--------------------------|--------------------------------------------------------|
| **Model**       | `AffiliateModel.ts`      | Leer/escribir JSON, calcular descuentos por membresía  |
| **Controller**  | `AffiliateController.ts` | Procesar requests, llamar al modelo, elegir vista      |
| **Router**      | `affiliateRoutes.ts`     | Mapear URLs a métodos del controller                   |
| **View**        | `views/affiliates/`      | Presentar datos al usuario sin lógica de negocio       |

---

## Instalación y Uso

### Requisitos previos

- [Node.js](https://nodejs.org/) v18 o superior
- npm (incluido con Node.js)

### Pasos

**1. Clonar el repositorio**

```bash
git clone <url-del-repositorio>
cd dentplus
```

**2. Instalar dependencias**

```bash
npm install
```

**3. Iniciar en modo desarrollo** (con recarga automática)

```bash
npm run dev
```

La aplicación estará disponible en **http://localhost:3000**

**4. Compilar para producción**

```bash
npm run build
```

**5. Ejecutar versión compilada**

```bash
npm start
```

---

## Scripts Disponibles

| Comando          | Descripción                                              |
|------------------|----------------------------------------------------------|
| `npm run dev`    | Inicia el servidor en modo desarrollo con hot-reload     |
| `npm run build`  | Compila TypeScript a JavaScript en la carpeta `/dist`    |
| `npm start`      | Ejecuta el servidor desde los archivos compilados        |

---

## Rutas de la Aplicación

| Método     | Ruta                       | Descripción                               |
|------------|----------------------------|-------------------------------------------|
| `GET`      | `/affiliates`              | Listado de todos los afiliados            |
| `GET`      | `/affiliates/new`          | Formulario para crear un afiliado         |
| `POST`     | `/affiliates`              | Guardar nuevo afiliado                    |
| `GET`      | `/affiliates/:id`          | Ver detalle y simulador de descuentos     |
| `GET`      | `/affiliates/:id/edit`     | Formulario para editar afiliado           |
| `PUT`      | `/affiliates/:id`          | Guardar cambios de un afiliado            |
| `DELETE`   | `/affiliates/:id`          | Eliminar afiliado                         |
| `POST`     | `/affiliates/:id/simulate` | Calcular descuento para un monto dado     |

---

## Modelo de Datos

### Afiliado (`Affiliate`)

```typescript
interface Affiliate {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  membershipType: 'silver' | 'gold' | 'platinum';
}
```

### Tabla de Descuentos

| Membresía      | Descuento | Ejemplo sobre $100.000 |
|----------------|-----------|------------------------|
| 🥈 Silver      | 5%        | $95.000                |
| 🥇 Gold        | 10%       | $90.000                |
| 💎 Platinum    | 20%       | $80.000                |

---

## Licencia

Este proyecto está bajo la licencia **MIT**.
