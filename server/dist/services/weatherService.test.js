import { describe, it, expect } from 'vitest';
import { fetchLocalizedWeather } from './weatherService.js';
describe('weatherService', () => {
    it('should throw error when OPENWEATHERMAP_API_KEY is not set', async () => {
        const originalEnv = process.env.OPENWEATHERMAP_API_KEY;
        delete process.env.OPENWEATHERMAP_API_KEY;
        await expect(fetchLocalizedWeather('LGA')).rejects.toThrow('OPENWEATHERMAP_API_KEY is not configured');
        process.env.OPENWEATHERMAP_API_KEY = originalEnv;
    });
});
//# sourceMappingURL=weatherService.test.js.map