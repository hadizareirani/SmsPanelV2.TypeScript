import {describe, test, expect, beforeEach} from 'vitest'
import { Smsir, smsBuilder } from '../../../src/index';

describe("Smsir Class - sendBulk Method",()=> {
    let smsir: Smsir;
    beforeEach(()=> {
        smsir = new Smsir('your-api-key', 30007732000000);
    })

    test("should have sendBulk method",() => {
        expect(typeof smsir.sendBulk).toBe('function');
    })
    
    test("sendBulk method should return a Promise",() => {
        const result = smsir.sendBulk("Test message", ["09123456789"]);
        expect(result).toBeInstanceOf(Promise);
    });
})