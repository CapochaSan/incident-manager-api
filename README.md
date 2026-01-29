# 🚀 ITSM Incident Manager: Fullstack Solution
**Sistema de Gestión de Incidentes con Arquitectura Empresarial**

Este proyecto es una plataforma integral para el seguimiento de tickets de IT, diseñada bajo principios de **Reliability Engineering** y estándares **ITIL**. Conecta una interfaz moderna en React con una API robusta en Node.js y persistencia en SQL Server.

## 🛠️ Ecosistema Tecnológico
### Frontend (React)
- **UI Pro:** Componentes dinámicos con estados visuales (New, In Progress, Resolved).
- **Seguridad:** Rutas protegidas y persistencia de sesión con JWT.
- **UX:** Navegación fluida y Activity Stream de notas en tiempo real.

### Backend (Node.js & Express)
- **Identificación SNOW Style:** Generación automática de tickets (ej: `INC00000001`).
- **ORM:** Sequelize gestionando relaciones complejas 1:N con SQL Server.
- **Seguridad:** Hashing de contraseñas con bcrypt y autenticación JWT.

### Infraestructura & DevOps
- **Docker:** Orquestación completa mediante Docker Compose.
- **Database:** Microsoft SQL Server para persistencia de datos empresarial.

## 📁 Estructura del Proyecto
- `/frontend`: Aplicación SPA en React con estilos Enterprise.
- `/backend`: API RESTful con arquitectura MVC y modelos relacionales.
- `docker-compose.yml`: Configuración para levantar todo el entorno con un comando.

## 🚀 Instalación Rápida
1. Clonar: `git clone https://github.com/CapochaSan/incident-manager-api.git`
2. Configurar `.env` en `/backend` (ver `.env.example`).
3. Levantar con Docker: docker-compose up --build
4. Abrir: http://localhost:3001 (Frontend) y http://localhost:3000 (API).

---
**Desarrollado por Santiago Vagni** | *Cloud & OS Reliability Engineer | Estudiante de Ingeniería en Sistemas (UTN)*