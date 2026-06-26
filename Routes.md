# Rutas pendientes por definir

## Rutas utilizando el verbo HTTP POST

### Ruta POST /api/.../leads

- Ruta: POST /api/v1/landing/leads
- Descripción: Recibe el payload JSON del formulario de cotización (ContactForm.svelte). Al ser procesado por tu backend, se encarga de aplicar las reglas de validación deterministas y almacenar o disparar la notificación del cliente potencial.

Enviar el siguiente `payload`:

```json
{
  "fullName": "Juan Pérez",
  "email": "juan@ejemplo.com",
  "phone": "3001234567",
  "projectType": "residencial",
  "details": "Solicito cotización para estructura de edificio de 4 pisos, planos listos."
}
```

### Respuesta HTTP esperada

Con el código 201:

```json
{ "status": "success", "message": "Lead registrado correctamente." }
```

Con el código 400:

```json
{ "status": "error", "errors": { "email": "El formato del correo electrónico no es válido." } }
```

## Algunas consideraciones

Es posible que se consideren estas estructuras de rutas para la página:

```bash
# Hidratación y Contenido
GET  /api/v1/landing/content          -> Retorna la estructura visual de la Landing

# Captación de Clientes y Archivos
POST /api/v1/landing/leads            -> Registra los datos de contacto del interesado
POST /api/v1/landing/leads/attachments-> Sube planos/documentos adjuntos (Multipart)

# Gestión Administrativa (Futura Consola)
PUT  /api/v1/landing/content          -> Actualiza dinámicamente secciones/proyectos

# Infraestructura y Monitoreo
GET  /api/v1/health                   -> Estado del microservicio y telemetría
```