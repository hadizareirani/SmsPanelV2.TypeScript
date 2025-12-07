import {describe, test, expect, beforeEach, vi, afterEach} from 'vitest'
import { Smsir } from '../../src/index';

describe("Smsir Class - sendByURL Method",()=> {

    let smsir: Smsir;
    beforeEach(()=> {
        smsir = new Smsir('test-api-key', 30007732000000);
        vi.clearAllMocks();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    test("should have sendByURL method",() => {
        expect(typeof smsir.sendByURL).toBe('function');
    });

    test("sendByURL method should return a Promise",() => {
        global.fetch = vi.fn().mockResolvedValue({
            ok: true,
            json: async () => ({ status: 1, message: 'success' })
        });
        const result = smsir.sendByURL("testUsername",'09121234567', "Hello World");
        expect(result).toBeInstanceOf(Promise);
    });  
    
    test("should send SMS by URL with correct parameters", async () => {
        const mockResponse = {
            status: 1,
            message: "عملیات با موفقیت انجام شد",
            data: {
                messageId: 67890,
                cost: 50
            }
        };
        global.fetch = vi.fn().mockResolvedValue({
            ok: true,
            json: async () => mockResponse
        });

        const result = await smsir.sendByURL("testUsername",'09121234567', "Hello World");
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
        const mockResponse = {
            status: 1,
            message: "عملیات با موفقیت انجام شد",
            data: {
                messageId: 54321,
                cost: 70
            }
        }

        global.fetch = vi.fn().mockResolvedValue({
            ok: true,
            json: async()=> mockResponse
        })

        const result = await smsir.sendByURL("testUsername",'09121234567', "Hello World", 30001234567890);
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