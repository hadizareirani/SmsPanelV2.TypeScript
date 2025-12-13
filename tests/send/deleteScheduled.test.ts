import {describe, test, expect} from 'vitest'
import { setupSmsirTest, createMockResponse, mockFetchSuccess } from '../setup/testUtils';

describe("Smsir Class - deleteScheduled Method",()=> {
    const { getSmsir } = setupSmsirTest();

    test("should have deleteScheduled method",() => {
        expect(typeof getSmsir().deleteScheduled).toBe('function');
    });

    test("deleteScheduled method should return a Promise",() => {
        mockFetchSuccess({ returnedCreditCount: 10, smsCount: 5 });

        const result = getSmsir().deleteScheduled("12345");
        expect(result).toBeInstanceOf(Promise)
    });

    test("deleteScheduled method should return the correct response", async () => {
        const mockResponse = createMockResponse({ returnedCreditCount: 10, smsCount: 5 });
        mockFetchSuccess(mockResponse);

        const result = await getSmsir().deleteScheduled("12345");


        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith(
            expect.stringContaining('/v1/send/scheduled/12345'),
            expect.objectContaining({
                method: 'DELETE',
                headers: expect.objectContaining({
                    'X-API-KEY': 'test-api-key',
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                })
            })
        );

        expect(result).toEqual(mockResponse);
        expect(result.data.returnedCreditCount).toBe(10);
        expect(result.data.smsCount).toBe(5);
    })

    
});