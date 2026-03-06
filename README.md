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
