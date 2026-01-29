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

---

## 📊 Evidencia de Funcionamiento

El sistema garantiza la persistencia correcta de los datos y el cumplimiento de los esquemas definidos.

![Estructura de la Base de Datos](./img/SQL%20-%20INC.png)
*Ejemplo de registro persistido en SQL Server con numeración automática y timestamps de auditoría.*


![Diseño del login](./img/Login%20-%20front%20.png)
*Diseño actual del login con protección de rutas.*


![Dashboard de incidentes](./img/Dash%20-%20front.png)
*Ejemplo de incidentes cargados y presentados en un dasboard con filtros de búsqueda.*


![Detalle de incidente](./img/Incident%20detail.png)
*Ejemplo de detalle de incidente junto con la maquina de estados y sus respectivas workNotes.*

---

## 🔐 Gestión de Usuarios

Para mantener la seguridad del sistema, el registro de nuevos técnicos se realiza mediante la API.

### Registro de Nuevo Usuario (Postman/cURL)
**Endpoint:** `POST /api/auth/register`

**Cuerpo de la petición (JSON):**
```json
{
  "username": "nombre_usuario",
  "password": "tu_password_segura"
}
```
El sistema aplicará automáticamente un hash con salt de 10 rondas a la contraseña antes de persistirla en SQL Server.

---

## 🚀 Instalación Rápida
1. Clonar: `git clone https://github.com/CapochaSan/incident-manager-api.git`
2. Configurar `.env` en `/backend` (ver `.env.example`).
3. Levantar con Docker: ```bash docker-compose up --build ```
4. Abrir: http://localhost:3001 (Frontend) y http://localhost:3000 (API).

---
**Desarrollado por Santiago Vagni** | *Cloud & OS Reliability Engineer | Estudiante de Ingeniería en Sistemas (UTN)*