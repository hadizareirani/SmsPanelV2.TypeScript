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
})