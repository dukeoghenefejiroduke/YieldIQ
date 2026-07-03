import { fetchLocalizedWeather } from './src/services/weatherService.ts';
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

async function test() {
  try {
    const data = await fetchLocalizedWeather('Bayelsa');
    console.log('Success:', data);
  } catch (e) {
    console.error('Error:', e.message);
  }
}
test();
