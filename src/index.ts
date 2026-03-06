import 'dotenv/config';
import express, { Express, Request, Response } from 'express';
import cors from 'cors';

const app: Express = express();
const PORT = process.env.PORT || 3001;
const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;

app.use(cors());
app.use(express.json());

interface WeatherResponse {
  name: string;
  main: { temp: number; humidity: number };
  weather: { description: string }[];
  wind: { speed: number };
  _tempRounded?: number;
}

app.get('/current', async (req: Request, res: Response<WeatherResponse | { error: string }>): Promise<void> => {
  try {
    const { city } = req.query;
    
    if (!city || typeof city !== 'string') {
      res.status(400).json({ error: 'El parámetro "city" es requerido' });
      return;
    }

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${OPENWEATHER_API_KEY}&units=metric&lang=es`
    );

    if (!response.ok) {
      res.status(response.status).json({ error: 'Ciudad no encontrada o error en la API externa' });
      return;
    }

    const data = (await response.json()) as WeatherResponse;
    data._tempRounded = Math.round(data.main.temp);
    res.json(data);
    
  } catch (error) {
    console.error('Error en data-service:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.get('/health', (req: Request, res: Response<{ status: string; service: string }>): void => {
  res.json({ status: 'OK', service: 'data-service' });
});

app.listen(PORT, () => {
  console.log(`✓ Data-service corriendo en puerto ${PORT}`);
});