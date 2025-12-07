import {describe, test, expect, beforeEach, vi, afterEach} from 'vitest'
import { Smsir } from '../../src/index';

describe("Smsir Class - deleteScheduled Method",()=> {
    let smsir: Smsir;
    
    beforeEach(()=> {
        smsir = new Smsir('test-api-key', 30007732000000);
        vi.clearAllMocks();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    test("should have deleteScheduled method",() => {
        expect(typeof smsir.deleteScheduled).toBe('function');
    });

    test("deleteScheduled method should return a Promise",() => {
        global.fetch = vi.fn().mockResolvedValue({
            ok: true,
            json: async ()=>({ returnedCreditCount: 10, smsCount: 5 })
        })

        const result = smsir.deleteScheduled("12345");
        expect(result).toBeInstanceOf(Promise)
    });

    test("deleteScheduled method should return the correct response", async () => {
          const mockResponse = {
            status: 1,
            message: "عملیات با موفقیت انجام شد",
            data: { returnedCreditCount: 10, smsCount: 5 }
        };
        global.fetch = vi.fn().mockResolvedValue({
            ok: true,
            json: async () => mockResponse
        })

        const result = await smsir.deleteScheduled("12345");


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