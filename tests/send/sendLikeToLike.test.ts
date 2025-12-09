import {describe, test, expect} from 'vitest'
import { setupSmsirTest, createMockResponse, mockFetchSuccess } from '../setup/testUtils';

describe('Smsir Class - sendBulk Method',() => {
    const {getSmsir} = setupSmsirTest();

    test("should have sendLikeToLike method",() => {
        expect(typeof getSmsir().sendLikeToLike).toBe("function")
    })

    test("send likeToLike method should return Promise", () => {
        mockFetchSuccess({status:1, message:"success"});
        const result = getSmsir().sendLikeToLike(["test 1", "test 2"],['09121234567','09121234567'])
        expect(result).toBeInstanceOf(Promise);
    })

    test("should send bulk SMS with correct parameters", async()=> {
        const mockResponse = createMockResponse({
            packId: 12345,
            messageIds: [1001, 1002, 1003],
            cost: 150
        });
        mockFetchSuccess(mockResponse);
        const messageText = ["سلام، این یک پیام تستی است","سلام، این یک پیام تستی است"];
        const mobiles = ["09123456789", "09187654321"];

        const result = await getSmsir().sendLikeToLike(messageText,mobiles)
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith(
            expect.stringContaining('/v1/send/liketolike'),
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
    })
})