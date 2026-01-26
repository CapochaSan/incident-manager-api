# Incident Management API 🛠️

API RESTful profesional para la gestión de incidentes técnicos, diseñada bajo principios de **Reliability Engineering** y estándares **ITIL**. Este sistema permite la creación, seguimiento y auditoría de tickets de infraestructura, integrando procesos de observabilidad y persistencia de datos empresarial.

## 🚀 Características Principales
* **Identificación Unívoca (SNOW Style):** Generación automática de tickets incrementales (ej: `INC00000001`) mediante Sequelize Hooks.
* **Trazabilidad de Auditoría (Activity Stream):** Arquitectura relacional **1:N** que permite asociar múltiples notas de trabajo (`WorkNotes`) a un único incidente, preservando el historial de troubleshooting.
* **Persistencia Empresarial:** Integración robusta con **SQL Server (MSSQL)** utilizando Sequelize ORM.
* **Validación de Datos:** Capa de seguridad en modelos para garantizar integridad en severidades (`Critical`, `High`, etc.) y estados (`New`, `In Progress`, `Resolved`).

## 🛠️ Stack Tecnológico
* **Backend:** Node.js & Express.
* **Base de Datos:** SQL Server.
* **ORM:** Sequelize.
* **Arquitectura:** MVC (Model-View-Controller).

## 📁 Estructura del Proyecto
Basado en la arquitectura del repositorio:
- `src/config/db.js`: Configuración de la conexión a MSSQL.
- `src/controllers/incident.controller.js`: Lógica de negocio y manejo de respuestas HTTP.
- `src/models/index.js`: Centralizador de modelos y definición de relaciones.
- `src/models/incident.model.js`: Definición de la entidad principal de incidentes.
- `src/models/worknote.model.js`: Entidad para el registro cronológico de actualizaciones.
- `src/routes/incident.routes.js`: Definición de los endpoints de la API.

## 📊 Evidencia de Funcionamiento
El sistema garantiza la persistencia correcta de los datos y el cumplimiento de los esquemas definidos.

![Estructura de la Base de Datos](./img/SQL%20-%20INC.png)
*Ejemplo de registro persistido en SQL Server con numeración automática y timestamps de auditoría.*

## ⚙️ Instalación y Configuración
1. Clonar el repositorio.
2. Ejecutar `npm install`.
3. Configurar las credenciales de la base de datos en un archivo `.env`.
4. Iniciar el servidor con `npm run dev`.

---
**Desarrollado por Santiago Vagni** | *Cloud & OS Reliability Engineer | Estudiante de Ingeniería en Sistemas (UTN)*