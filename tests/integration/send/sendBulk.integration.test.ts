import { describe, test, expect, beforeAll } from 'vitest';
import { Smsir, smsBuilder } from '../../../src/index';
import * as dotenv from 'dotenv';

dotenv.config();

const API_KEY = process.env.SMSIR_API_KEY || '';
const LINE_NUMBER = Number(process.env.SMSIR_LINE_NUMBER) || 0;
const TEST_MOBILE = process.env.SMSIR_TEST_MOBILE || '';

describe('SendBulk Integration Tests', () => {
    
    beforeAll(() => {
        if (!API_KEY || !LINE_NUMBER || !TEST_MOBILE) {
            throw new Error('Missing environment variables. Please create .env file from .env.example');
        }
    });

    describe('Using Smsir Class', () => {
        
        test('should send bulk SMS successfully', async () => {
            const smsir = new Smsir(API_KEY, LINE_NUMBER);
            
            const result = await smsir.sendBulk(
                'این یک پیام تست از SDK است',
                [TEST_MOBILE]
            );

            expect(result.status).toBe(1);
            expect(result.data).toBeDefined();
            expect(result.data.packId).toBeDefined();
            expect(result.data.messageIds).toBeDefined();
            expect(Array.isArray(result.data.messageIds)).toBe(true);
            expect(result.data.messageIds.length).toBeGreaterThan(0);
            expect(result.data.cost).toBeGreaterThan(0);
        }, 30000);

        test('should send to multiple recipients', async () => {
            const smsir = new Smsir(API_KEY, LINE_NUMBER);
            
            const result = await smsir.sendBulk(
                'پیام تست چند گیرنده',
                [TEST_MOBILE, TEST_MOBILE]
            );

            expect(result.status).toBe(1);
            expect(result.data.messageIds.length).toBe(2);
        }, 30000);

        test('should send with custom line number', async () => {
            const smsir = new Smsir(API_KEY, LINE_NUMBER);
            
            const result = await smsir.sendBulk(
                'تست با خط سفارشی',
                [TEST_MOBILE],
                undefined,
                LINE_NUMBER
            );

            expect(result.status).toBe(1);
            expect(result.data.packId).toBeDefined();
        }, 30000);

    });

    describe('Using smsBuilder Function', () => {
        
        test('should send bulk SMS successfully', async () => {
            const sms = smsBuilder({
                apiKey: API_KEY,
                lineNumber: LINE_NUMBER
            });
            
            const result = await sms.sendBulk(
                'پیام تست از smsBuilder',
                [TEST_MOBILE]
            );

            expect(result.status).toBe(1);
            expect(result.data).toBeDefined();
            expect(result.data.packId).toBeDefined();
            expect(result.data.messageIds).toBeDefined();
            expect(result.data.cost).toBeGreaterThan(0);
        }, 30000);

        test('should handle Persian text correctly', async () => {
            const sms = smsBuilder({
                apiKey: API_KEY,
                lineNumber: LINE_NUMBER
            });
            
            const persianMessage = 'سلام! این یک پیام فارسی است با اعداد ۱۲۳۴۵';
            const result = await sms.sendBulk(persianMessage, [TEST_MOBILE]);

            expect(result.status).toBe(1);
            expect(result.data.messageIds.length).toBe(1);
        }, 30000);

    });

    describe('Error Handling', () => {
        
        test('should handle invalid API key', async () => {
            const smsir = new Smsir('invalid-api-key', LINE_NUMBER);
            
            await expect(
                smsir.sendBulk('Test', [TEST_MOBILE])
            ).rejects.toThrow();
        }, 30000);

        test('should handle empty mobile array', async () => {
            const smsir = new Smsir(API_KEY, LINE_NUMBER);
            
            await expect(
                smsir.sendBulk('Test', [])
            ).rejects.toThrow();
        }, 30000);

    });

});
