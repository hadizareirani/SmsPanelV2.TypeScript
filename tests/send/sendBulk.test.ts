import {describe, test, expect} from 'vitest'
import { setupSmsirTest, createMockResponse, mockFetchSuccess } from '../setup/testUtils';

describe("Smsir Class - sendBulk Method",()=> {
    const { getSmsir } = setupSmsirTest();

    test("should have sendBulk method",() => {
        expect(typeof getSmsir().sendBulk).toBe('function');
    })
    
    test("sendBulk method should return a Promise",() => {
        mockFetchSuccess({ status: 1, message: 'success' });
        
        const result = getSmsir().sendBulk("Test message", ["09123456789"]);
        expect(result).toBeInstanceOf(Promise);
    });

    test("should send bulk SMS with correct parameters", async () => {
        const mockResponse = createMockResponse({
            packId: 12345,
            messageIds: [1001, 1002, 1003],
            cost: 150
        });
        mockFetchSuccess(mockResponse);

        const messageText = "سلام، این یک پیام تستی است";
        const mobiles = ["09123456789", "09187654321", "09351234567"];

        const result = await getSmsir().sendBulk(messageText, mobiles);

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
        mockFetchSuccess(createMockResponse({ packId: 1, messageIds: [1], cost: 50 }));

        const customLineNumber = 98765432;
        await getSmsir().sendBulk("Test", ["09123456789"], undefined, customLineNumber);

        const fetchCall = (fetch as any).mock.calls[0];
        const requestBody = JSON.parse(JSON.parse(fetchCall[1].body));
        expect(requestBody.lineNumber).toBe(customLineNumber);
    });

    test("should use default line number when custom not provided", async () => {
        mockFetchSuccess(createMockResponse({ packId: 1, messageIds: [1], cost: 50 }));

        await getSmsir().sendBulk("Test", ["09123456789"]);

        const fetchCall = (fetch as any).mock.calls[0];
        const requestBody = JSON.parse(JSON.parse(fetchCall[1].body));
        expect(requestBody.lineNumber).toBe(30007732000000);
    });

    test("should include sendDateTime when provided", async () => {
        mockFetchSuccess(createMockResponse({ packId: 1, messageIds: [1], cost: 50 }));

        const scheduledTime = Math.floor(Date.now() / 1000) + 3600;
        await getSmsir().sendBulk("Scheduled message", ["09123456789"], scheduledTime);

        const fetchCall = (fetch as any).mock.calls[0];
        const requestBody = JSON.parse(JSON.parse(fetchCall[1].body));
        expect(requestBody.sendDateTime).toBe(scheduledTime);
    });

    test("should not include sendDateTime when not provided", async () => {
        mockFetchSuccess(createMockResponse({ packId: 1, messageIds: [1], cost: 50 }));

        await getSmsir().sendBulk("Immediate message", ["09123456789"]);

        const fetchCall = (fetch as any).mock.calls[0];
        const requestBody = JSON.parse(JSON.parse(fetchCall[1].body));
        expect(requestBody.sendDateTime).toBeUndefined();
    });

    test("should handle multiple mobile numbers", async () => {
        mockFetchSuccess(createMockResponse({ 
            packId: 999, 
            messageIds: [1, 2, 3, 4, 5], 
            cost: 250 
        }));

        const mobiles = [
            "09123456789",
            "09187654321",
            "09351234567",
            "09121112222",
            "09133334444"
        ];

        const result = await getSmsir().sendBulk("Bulk message", mobiles);

        const fetchCall = (fetch as any).mock.calls[0];
        const requestBody = JSON.parse(JSON.parse(fetchCall[1].body));
        expect(requestBody.mobiles).toEqual(mobiles);
        expect(result.data.messageIds).toHaveLength(5);
    });
})