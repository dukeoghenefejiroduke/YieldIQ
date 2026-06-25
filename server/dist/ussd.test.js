import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import { app } from './app.js';
import Farmer from './models/Farmer.js';
// Mock Mongoose models
vi.mock('./models/Farmer.js', () => {
    return {
        default: {
            findOne: vi.fn(),
            findByIdAndUpdate: vi.fn()
        }
    };
});
vi.mock('./models/Log.js', () => {
    const MockLog = vi.fn().mockImplementation(() => {
        return {
            save: vi.fn().mockResolvedValue({})
        };
    });
    // Add static methods on the class
    MockLog.find = vi.fn().mockResolvedValue([]);
    MockLog.findOneAndUpdate = vi.fn();
    MockLog.findById = vi.fn().mockReturnValue({
        populate: vi.fn().mockResolvedValue({
            farmerId: {
                cooperativeId: 'coop123'
            }
        })
    });
    return {
        default: MockLog
    };
});
describe('USSD Endpoint', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });
    it('should return unregistered message if farmer is not found', async () => {
        Farmer.findOne.mockResolvedValue(null);
        const response = await request(app)
            .post('/api/ussd')
            .send({
            sessionId: 'test_session_123',
            phoneNumber: '+2348011112222',
            text: ''
        });
        expect(response.status).toBe(200);
        expect(response.text).toContain('Welcome to AgroVoice. Your phone number is not registered.');
    });
    it('should return main menu if farmer is found and text is empty', async () => {
        Farmer.findOne.mockResolvedValue({
            _id: 'farmer123',
            name: 'John Doe',
            creditScore: 150,
            userId: 'user123'
        });
        const response = await request(app)
            .post('/api/ussd')
            .send({
            sessionId: 'test_session_123',
            phoneNumber: '+2348011112222',
            text: ''
        });
        expect(response.status).toBe(200);
        expect(response.text).toContain('CON Welcome, John Doe to AgroVoice.');
        expect(response.text).toContain('1. Check Credit Score');
    });
    it('should return credit score in menu 1', async () => {
        Farmer.findOne.mockResolvedValue({
            _id: 'farmer123',
            name: 'John Doe',
            creditScore: 150,
            userId: 'user123'
        });
        const response = await request(app)
            .post('/api/ussd')
            .send({
            sessionId: 'test_session_123',
            phoneNumber: '+2348011112222',
            text: '1'
        });
        expect(response.status).toBe(200);
        expect(response.text).toContain('END Your current AgroVoice Credit Score is: 150 pts.');
    });
    it('should handle logging transaction in menu 3', async () => {
        Farmer.findOne.mockResolvedValue({
            _id: 'farmer123',
            name: 'John Doe',
            creditScore: 150,
            userId: 'user123',
            cooperativeId: 'coop123'
        });
        // Step 1: Input choice 3
        let response = await request(app)
            .post('/api/ussd')
            .send({
            sessionId: 'test_session_123',
            phoneNumber: '+2348011112222',
            text: '3'
        });
        expect(response.text).toContain('CON Enter transaction amount');
        // Step 2: Input amount
        response = await request(app)
            .post('/api/ussd')
            .send({
            sessionId: 'test_session_123',
            phoneNumber: '+2348011112222',
            text: '3*5000'
        });
        expect(response.text).toContain('CON Enter crop item name');
        // Step 3: Input crop name (submitting log)
        response = await request(app)
            .post('/api/ussd')
            .send({
            sessionId: 'test_session_123',
            phoneNumber: '+2348011112222',
            text: '3*5000*Cassava'
        });
        expect(response.text).toContain('END Success! Logged sale of Cassava for ₦5000');
    });
});
//# sourceMappingURL=ussd.test.js.map