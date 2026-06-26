import { describe, it, expect } from 'vitest';
import request from 'supertest';
// Note: importing index.ts might start the server, better to export the app from index.ts.
// For now, let's assume we can import the app.
import { app } from './app.js';
describe('Health Check', () => {
    it('should return 200 OK', async () => {
        const response = await request(app).get('/api/health');
        expect(response.status).toBe(200);
        expect(response.body.status).toBe('ok');
    });
});
