import {describe, test, expect, beforeEach} from 'vitest'
import { Smsir, smsBuilder } from '../../src/index';

describe("Smsir Class",()=> {
    let smsir: Smsir;

   beforeEach(()=> {
    smsir = new Smsir('your-api-key', 30007732000000);
   })

   test("should create an instance of Smsir",() => {
    expect(smsir).toBeInstanceOf(Smsir);
   })

   test("should have sendSms methods",() => {
    expect(typeof smsir.sendBulk).toBe('function');
    expect(typeof smsir.sendByURL).toBe('function');
    expect(typeof smsir.sendVerifyCode).toBe('function');
    expect(typeof smsir.sendLikeToLike).toBe('function');
    expect(typeof smsir.deleteScheduled).toBe('function');
    expect(typeof smsir.getCredit).toBe('function');
    expect(typeof smsir.getLineNumbers).toBe('function');
    expect(typeof smsir.reportArchive).toBe('function');
    expect(typeof smsir.reportDailyPack).toBe('function');
    expect(typeof smsir.reportLatestReceive).toBe('function');
    expect(typeof smsir.reportMessage).toBe('function');
    expect(typeof smsir.reportPackById).toBe('function');
    expect(typeof smsir.reportReceiveArchive).toBe('function');
    expect(typeof smsir.reportReceiveLive).toBe('function');
    expect(typeof smsir.reportTodayLive).toBe('function');
   })
})

describe("smsBuilder Function",()=> {
    let smsDraftBuilder: any;
    beforeEach(() => {
        smsDraftBuilder = smsBuilder({
           apiKey:'your-api-key',
           lineNumber:30007732000000
        });
    })

   test("should have sendSms methods",() => {
    expect(typeof smsDraftBuilder.sendBulk).toBe('function');
    expect(typeof smsDraftBuilder.sendByURL).toBe('function');
    expect(typeof smsDraftBuilder.sendVerifyCode).toBe('function');
    expect(typeof smsDraftBuilder.sendLikeToLike).toBe('function');
    expect(typeof smsDraftBuilder.deleteScheduled).toBe('function');
    expect(typeof smsDraftBuilder.getCredit).toBe('function');
    expect(typeof smsDraftBuilder.getLineNumbers).toBe('function');
    expect(typeof smsDraftBuilder.reportArchive).toBe('function');
    expect(typeof smsDraftBuilder.reportDailyPack).toBe('function');
    expect(typeof smsDraftBuilder.reportLatestReceive).toBe('function');
    expect(typeof smsDraftBuilder.reportMessage).toBe('function');
    expect(typeof smsDraftBuilder.reportPackById).toBe('function');
    expect(typeof smsDraftBuilder.reportReceiveArchive).toBe('function');
    expect(typeof smsDraftBuilder.reportReceiveLive).toBe('function');
    expect(typeof smsDraftBuilder.reportTodayLive).toBe('function');
   })
})