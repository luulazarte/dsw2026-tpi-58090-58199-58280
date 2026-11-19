# Sistema de Turnos Médicos — Frontend

TPI de Desarrollo de Software 2026 — UTN FRT.

Aplicación web en React para el Sistema de Turnos Médicos. Se conecta a la API REST del backend (ASP.NET Core) y tiene dos portales: el del **paciente** (reservar y ver sus turnos) y el del **administrador** (gestionar especialidades, médicos, disponibilidad horaria y buscar turnos).

## Integrantes

- Arias Thillois, Nazarena — 58280 - 3K4
- Lazarte, Luciana — 58199 - 3K4
- Romero Scro, Martina — 58090 - 3K2


## Cómo ejecutarlo

1. Tener el backend corriendo.
2. Revisar el archivo ".env.development" la variable "VITE_BACKEND_URL" tiene que apuntar a la URL del backend.
3. Instalar las dependencias (solo la primera vez): "npm install"
4. Iniciar la aplicación: "npm run dev"
5. Abrir en el navegador:
   - Portal del paciente: "http://localhost:5173/login"
   - Portal del administrador: "http://localhost:5173/admin/login" (admin inicial: admin@system.com / Admin1234)
