import {describe, test, expect, beforeEach, vi, afterEach} from 'vitest'
import { Smsir } from '../../../src/index';

describe("Smsir Class - sendBulk Method",()=> {
    let smsir: Smsir;
    
    beforeEach(()=> {
        smsir = new Smsir('test-api-key', 30007732000000);
        vi.clearAllMocks();
    })

    afterEach(() => {
        vi.restoreAllMocks();
    });

    test("should have sendBulk method",() => {
        expect(typeof smsir.sendBulk).toBe('function');
    })
    
    test("sendBulk method should return a Promise",() => {
        global.fetch = vi.fn().mockResolvedValue({
            ok: true,
            json: async () => ({ status: 1, message: 'success' })
        });
        
        const result = smsir.sendBulk("Test message", ["09123456789"]);
        expect(result).toBeInstanceOf(Promise);
    });

    test("should send bulk SMS with correct parameters", async () => {
        const mockResponse = {
            status: 1,
            message: "عملیات با موفقیت انجام شد",
            data: {
                packId: 12345,
                messageIds: [1001, 1002, 1003],
                cost: 150
            }
        };

        global.fetch = vi.fn().mockResolvedValue({
            ok: true,
            json: async () => mockResponse
        });

        const messageText = "سلام، این یک پیام تستی است";
        const mobiles = ["09123456789", "09187654321", "09351234567"];

        const result = await smsir.sendBulk(messageText, mobiles);

        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith(
            expect.stringContaining('/v1/send/bulk'),
            expect.objectContaining({
                method: 'POST',
                headers: expect.objectContaining({
                    'X-API-KEY': 'test-api-key',
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                })
            })
        );

        expect(result).toEqual(mockResponse);
        expect(result.data.packId).toBe(12345);
        expect(result.data.messageIds).toHaveLength(3);
    });

    test("should use custom line number when provided", async () => {
        global.fetch = vi.fn().mockResolvedValue({
            ok: true,
            json: async () => ({ status: 1, data: { packId: 1, messageIds: [1], cost: 50 } })
        });

        const customLineNumber = 98765432;
        await smsir.sendBulk("Test", ["09123456789"], undefined, customLineNumber);

        const fetchCall = (fetch as any).mock.calls[0];
        const requestBody = JSON.parse(JSON.parse(fetchCall[1].body));
        expect(requestBody.lineNumber).toBe(customLineNumber);
    });

    test("should use default line number when custom not provided", async () => {
        global.fetch = vi.fn().mockResolvedValue({
            ok: true,
            json: async () => ({ status: 1, data: { packId: 1, messageIds: [1], cost: 50 } })
        });

        await smsir.sendBulk("Test", ["09123456789"]);

        const fetchCall = (fetch as any).mock.calls[0];
        const requestBody = JSON.parse(JSON.parse(fetchCall[1].body));
        expect(requestBody.lineNumber).toBe(30007732000000);
    });

    test("should include sendDateTime when provided", async () => {
        global.fetch = vi.fn().mockResolvedValue({
            ok: true,
            json: async () => ({ status: 1, data: { packId: 1, messageIds: [1], cost: 50 } })
        });

        const scheduledTime = Math.floor(Date.now() / 1000) + 3600;
        await smsir.sendBulk("Scheduled message", ["09123456789"], scheduledTime);

        const fetchCall = (fetch as any).mock.calls[0];
        const requestBody = JSON.parse(JSON.parse(fetchCall[1].body));
        expect(requestBody.sendDateTime).toBe(scheduledTime);
    });

    test("should not include sendDateTime when not provided", async () => {
        global.fetch = vi.fn().mockResolvedValue({
            ok: true,
            json: async () => ({ status: 1, data: { packId: 1, messageIds: [1], cost: 50 } })
        });

        await smsir.sendBulk("Immediate message", ["09123456789"]);

        const fetchCall = (fetch as any).mock.calls[0];
        const requestBody = JSON.parse(JSON.parse(fetchCall[1].body));
        expect(requestBody.sendDateTime).toBeUndefined();
    });

    test("should handle multiple mobile numbers", async () => {
        global.fetch = vi.fn().mockResolvedValue({
            ok: true,
            json: async () => ({ 
                status: 1, 
                data: { 
                    packId: 999, 
                    messageIds: [1, 2, 3, 4, 5], 
                    cost: 250 
                } 
            })
        });

        const mobiles = [
            "09123456789",
            "09187654321",
            "09351234567",
            "09121112222",
            "09133334444"
        ];

        const result = await smsir.sendBulk("Bulk message", mobiles);

        const fetchCall = (fetch as any).mock.calls[0];
        const requestBody = JSON.parse(JSON.parse(fetchCall[1].body));
        expect(requestBody.mobiles).toEqual(mobiles);
        expect(result.data.messageIds).toHaveLength(5);
    });

    test("should throw error when API returns non-ok status", async () => {
        global.fetch = vi.fn().mockResolvedValue({
            ok: false,
            status: 401
        });

        await expect(
            smsir.sendBulk("Test", ["09123456789"])
        ).rejects.toThrow('HTTP error! status: 401');
    });

    test("should throw error when network fails", async () => {
        global.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

        await expect(
            smsir.sendBulk("Test", ["09123456789"])
        ).rejects.toThrow('Network error');
    });

    test("should send correct request body structure", async () => {
        global.fetch = vi.fn().mockResolvedValue({
            ok: true,
            json: async () => ({ status: 1, data: {} })
        });

        const messageText = "Test message";
        const mobiles = ["09123456789"];
        
        await smsir.sendBulk(messageText, mobiles);

        const fetchCall = (fetch as any).mock.calls[0];
        const requestBody = JSON.parse(JSON.parse(fetchCall[1].body));

        expect(requestBody).toHaveProperty('lineNumber');
        expect(requestBody).toHaveProperty('messageText');
        expect(requestBody).toHaveProperty('mobiles');
        expect(requestBody.messageText).toBe(messageText);
        expect(requestBody.mobiles).toEqual(mobiles);
    });
})