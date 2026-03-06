# 📊 Data Service - OpenWeather API Consumer

Servicio backend encargado de consumir la API pública de OpenWeather y procesar los datos meteorológicos.

---

## 📋 Descripción

Este servicio es responsable de:
- Consultar la API de OpenWeather
- Validar parámetros de entrada
- Procesar y transformar datos (ej: redondeo de temperatura)
- Manejar errores de la API externa
- Proveer un endpoint de health check

---

## 🛠️ Tecnologías

- **Node.js 18** - Runtime de JavaScript
- **Express 4.x** - Framework web
- **TypeScript 5** - Tipado estático
- **CORS** - Cross-Origin Resource Sharing
- **dotenv** - Variables de entorno

---

## 📁 Estructura

```
data-service/
├── src/
│   └── index.ts           # Código principal del servicio
├── dist/                  # Archivos compilados (generado)
├── node_modules/          # Dependencias (generado)
├── Dockerfile
├── .dockerignore
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🚀 Ejecución

### Con Docker (desde la raíz)
```bash
cd ..
docker-compose up data-service
```

### Localmente (desarrollo)
```bash
# Instalar dependencias
npm install

# Compilar TypeScript
npm run build

# Ejecutar
npm start

# Modo desarrollo (con recompilación)
npm run dev
```

---

## 🌐 Endpoints

### GET `/current`

Consulta el clima actual de una ciudad.

**Query Parameters:**
- `city` (string, required) - Nombre de la ciudad

**Ejemplo de petición:**
```bash
curl "http://localhost:4001/current?city=Monterrey"
```

**Respuesta exitosa (200):**
```json
{
  "name": "Monterrey",
  "main": {
    "temp": 25.3,
    "humidity": 60
  },
  "weather": [
    {
      "description": "cielo claro"
    }
  ],
  "wind": {
    "speed": 3.5
  },
  "_tempRounded": 25
}
```

**Respuestas de error:**

- **400 Bad Request** - Parámetro `city` faltante
```json
{
  "error": "El parámetro \"city\" es requerido"
}
```

- **404 Not Found** - Ciudad no encontrada
```json
{
  "error": "Ciudad no encontrada o error en la API externa"
}
```

- **500 Internal Server Error** - Error en el servidor
```json
{
  "error": "Error interno del servidor"
}
```

---

### GET `/health`

Health check del servicio.

**Ejemplo de petición:**
```bash
curl http://localhost:4001/health
```

**Respuesta (200):**
```json
{
  "status": "OK",
  "service": "data-service"
}
```

---

## 🔐 Variables de Entorno

Crear archivo `.env` en la raíz de `data-service/`:

```env
PORT=3001
OPENWEATHER_API_KEY=your_api_key_here
```

| Variable | Descripción | Requerido | Default |
|----------|-------------|-----------|---------|
| `PORT` | Puerto del servicio | No | 3001 |
| `OPENWEATHER_API_KEY` | API key de OpenWeather | Sí | (required) |

---

## 📝 Scripts Disponibles

```json
{
  "build": "tsc",                    // Compilar TypeScript
  "start": "node dist/index.js",     // Ejecutar versión compilada
  "dev": "tsc && node dist/index.js" // Compilar y ejecutar
}
```

---

## 🧪 Pruebas

### Probar health check
```bash
curl http://localhost:4001/health
```

### Probar consulta de clima
```bash
# Ciudad válida
curl "http://localhost:4001/current?city=Madrid"

# Ciudad con espacios
curl "http://localhost:4001/current?city=Mexico%20City"

# Error: sin parámetro city
curl "http://localhost:4001/current"
```

---

## 🔍 Detalles de Implementación

### Validaciones
- Verifica que el parámetro `city` esté presente
- Verifica que `city` sea de tipo string

### Procesamiento de Datos
- Redondea la temperatura: `_tempRounded = Math.round(temp)`
- Devuelve datos en español usando parámetro `lang=es`

### Manejo de Errores
```typescript
try {
  // Petición a OpenWeather
  const response = await fetch(...);
  
  if (!response.ok) {
    // Error HTTP de OpenWeather
    res.status(response.status).json({ error: '...' });
  }
  
  // Éxito
  res.json(data);
} catch (error) {
  // Error de red o servidor
  res.status(500).json({ error: '...' });
}
```

---

## 🐳 Docker

### Dockerfile
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3001
CMD ["npm", "start"]
```

### .dockerignore
```
node_modules
dist
*.log
.env.local
```

---

## 📊 Logs

El servicio genera logs en la consola:

```
✓ Data-service corriendo en puerto 3001
Error en data-service: [detalles del error]
```

---

## 🔗 Dependencias

```json
{
  "dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^16.0.3",
    "express": "^4.18.2"
  },
  "devDependencies": {
    "@types/cors": "^2.8.19",
    "@types/express": "^4.17.25",
    "@types/node": "^20.19.37",
    "typescript": "^5.3.3"
  }
}
```

---

## 📈 Mejoras Futuras

- [ ] Agregar cache de peticiones
- [ ] Implementar rate limiting
- [ ] Agregar más endpoints (forecast, historical)
- [ ] Implementar tests unitarios
- [ ] Agregar logging estructurado (Winston)

---

## 🤝 Integración

Este servicio se integra con:
- **Gateway**: Recibe peticiones proxy desde el gateway
- **OpenWeather API**: Consume datos meteorológicos

**No debe ser accedido directamente por el frontend** - siempre a través del Gateway.

---

## 👨‍💻 Mantenimiento

### Actualizar dependencias
```bash
npm update
```

### Verificar vulnerabilidades
```bash
npm audit
npm audit fix
```

### Recompilar después de cambios
```bash
npm run build
```

---

**Data Service - Parte del proyecto WeatherSOA** 🌤️
