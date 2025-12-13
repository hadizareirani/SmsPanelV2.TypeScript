import {describe, test, expect} from 'vitest'
import { setupSmsirTest, createMockResponse, mockFetchSuccess } from '../setup/testUtils';

describe("Smsir Class - sendByURL Method",()=> {
    const { getSmsir } = setupSmsirTest();

    test("should have sendByURL method",() => {
        expect(typeof getSmsir().sendByURL).toBe('function');
    });

    test("sendByURL method should return a Promise",() => {
        mockFetchSuccess({ status: 1, message: 'success' });
        const result = getSmsir().sendByURL("testUsername",'09121234567', "Hello World");
        expect(result).toBeInstanceOf(Promise);
    });  
    
    test("should send SMS by URL with correct parameters", async () => {
        const mockResponse = createMockResponse({
            messageId: 67890,
            cost: 50
        });
        mockFetchSuccess(mockResponse);

        const result = await getSmsir().sendByURL("testUsername",'09121234567', "Hello World");
        expect(result).toEqual(mockResponse);
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith(
            expect.stringContaining('/v1/send'),
            expect.objectContaining({
                method: 'GET',
                headers: expect.objectContaining({}),
            })
        );
        expect(result.data.messageId).toBe(67890);
        expect(result.data.cost).toBe(50);
    })

    test("should send SMS by URL with custom line", async()=> {
        const mockResponse = createMockResponse({
            messageId: 54321,
            cost: 70
        });
        mockFetchSuccess(mockResponse);

        const result = await getSmsir().sendByURL("testUsername",'09121234567', "Hello World", 30001234567890);
        expect(fetch).toHaveBeenCalledWith(
            expect.stringContaining('30001234567890'),
            expect.objectContaining({
                method: 'GET',
                headers: expect.objectContaining({}),
            })
        )
        expect(result).toEqual(mockResponse);
    })
});