/**
 * Example Test File - Demonstrates Both Class-Based and Functional APIs
 * 
 * This file shows how to use both approaches with the SMS.ir TypeScript SDK
 * DO NOT run this file directly - it's for demonstration purposes only
 */

// ==================== TypeScript/ES6 Examples ====================

// Import all necessary types and classes
import { 
  Smsir,
  smsBuilder,
  SendBulkResponse, 
  ResponseModel,
  SmsConfig,
  SendVerifyCodeResponse
} from './src/index';

// Example 1: Class-Based API (OOP approach - backward compatible)

async function classBasedExample() {
  // Initialize with API key and line number
  const sms = new Smsir('your-api-key-here', 30007732000000);

  try {
    // Send bulk SMS
    const bulkResult = await sms.sendBulk(
      'Hello from TypeScript SDK!',
      ['09123456789', '09987654321']
    );
    console.log('Bulk SMS sent:', bulkResult.data.packId);

    // Send verification code
    const verifyResult = await sms.sendVerifyCode(
      '09123456789',
      12345, // Your template ID
      [
        { name: 'Code', value: '123456' },
        { name: 'Name', value: 'User' }
      ]
    );
    console.log('Verification sent:', verifyResult.data.messageId);

    // Get account credit
    const credit = await sms.getCredit();
    console.log('Current credit:', credit.data);

    // Get line numbers
    const lines = await sms.getLineNumbers();
    console.log('Available lines:', lines.data);

    // Send like-to-like
    const likeToLikeResult = await sms.sendLikeToLike(
      ['Message for Ali', 'Message for Sara'],
      ['09121111111', '09122222222']
    );
    console.log('Like-to-like sent:', likeToLikeResult.data.packId);

    // Schedule SMS for later
    const scheduledResult = await sms.sendBulk(
      'Scheduled message',
      ['09123456789'],
      Date.now() + 3600000 // 1 hour from now
    );
    console.log('Scheduled SMS:', scheduledResult.data.packId);

    // Delete scheduled SMS
    const deleteResult = await sms.deleteScheduled(scheduledResult.data.packId);
    console.log('Deleted, credits returned:', deleteResult.data.returnedCreditCount);

    // Get message report
    const messageReport = await sms.reportMessage('876240022');
    console.log('Message status:', messageReport.data);

  } catch (error) {
    console.error('Error:', error);
  }
}

// Example 2: Functional API (Functional programming approach)

async function functionalExample() {
  // Initialize with config object
  const sms = smsBuilder({
    apiKey: 'your-api-key-here',
    lineNumber: 30007732000000
  });

  try {
    // All methods work the same as class-based API
    const result = await sms.sendBulk(
      'Hello from functional API!',
      ['09123456789']
    );
    console.log('Sent:', result.data.packId);

    // Get credit
    const credit = await sms.getCredit();
    console.log('Credit:', credit.data);

  } catch (error) {
    console.error('Error:', error);
  }
}

// Example 3: Using with TypeScript types

async function typedExample() {
  const config: SmsConfig = {
    apiKey: 'your-api-key',
    lineNumber: 30007732000000
  };

  const sms = new Smsir(config.apiKey, config.lineNumber);

  // Response is fully typed
  const bulkResponse: ResponseModel<SendBulkResponse> = await sms.sendBulk(
    'Typed message',
    ['09123456789']
  );

  // TypeScript knows the structure
  console.log('Pack ID:', bulkResponse.data.packId); // string
  console.log('Message IDs:', bulkResponse.data.messageIds); // number[]
  console.log('Cost:', bulkResponse.data.cost); // number
  console.log('Status:', bulkResponse.status); // number
  console.log('Message:', bulkResponse.message); // string

  const verifyResponse: ResponseModel<SendVerifyCodeResponse> = await sms.sendVerifyCode(
    '09123456789',
    12345,
    [{ name: 'Code', value: '123456' }]
  );

  console.log('Verify Message ID:', verifyResponse.data.messageId); // number
  console.log('Verify Cost:', verifyResponse.data.cost); // number
}

// ==================== CommonJS Examples ====================

/*
// Example 4: CommonJS with Class-Based API
const { Smsir } = require('./lib/cjs/index');

const sms = new Smsir('your-api-key', 30007732000000);

sms.sendBulk('Hello from CommonJS!', ['09123456789'])
  .then(result => {
    console.log('Pack ID:', result.data.packId);
    console.log('Message IDs:', result.data.messageIds);
    console.log('Cost:', result.data.cost);
  })
  .catch(error => {
    console.error('Error:', error.message);
  });

// Example 5: CommonJS with Functional API
const smsBuilder = require('./lib/cjs/index').default;

const sms2 = smsBuilder({
  apiKey: 'your-api-key',
  lineNumber: 30007732000000
});

sms2.sendBulk('Hello!', ['09123456789'])
  .then(result => console.log(result.data))
  .catch(error => console.error(error));

// Example 6: CommonJS with async/await
const { Smsir } = require('./lib/cjs/index');

async function commonJsExample() {
  const sms = new Smsir('your-api-key', 30007732000000);
  
  try {
    const result = await sms.sendBulk('Test', ['09123456789']);
    console.log('Sent!', result.data);
    
    const credit = await sms.getCredit();
    console.log('Credit:', credit.data);
  } catch (error) {
    console.error('Error:', error);
  }
}

commonJsExample();
*/

// ==================== Framework Integration Examples ====================

// Example 7: Angular Service
/*
import { Injectable } from '@angular/core';
import { Smsir, ResponseModel, SendBulkResponse } from 'sms-typescript';

@Injectable({
  providedIn: 'root'
})
export class SmsService {
  private sms: Smsir;

  constructor() {
    this.sms = new Smsir('your-api-key', 30007732000000);
  }

  async sendBulkSms(message: string, mobiles: string[]): Promise<ResponseModel<SendBulkResponse>> {
    return await this.sms.sendBulk(message, mobiles);
  }

  async sendVerification(mobile: string, code: string): Promise<any> {
    return await this.sms.sendVerifyCode(mobile, 12345, [
      { name: 'Code', value: code }
    ]);
  }

  async getCredit(): Promise<number> {
    const result = await this.sms.getCredit();
    return result.data;
  }
}
*/

// Example 8: React Hook
/*
import { useState, useEffect } from 'react';
import { Smsir } from 'sms-typescript';

function useSmsService(apiKey: string, lineNumber: number) {
  const [sms] = useState(() => new Smsir(apiKey, lineNumber));
  const [credit, setCredit] = useState<number | null>(null);

  useEffect(() => {
    sms.getCredit()
      .then(result => setCredit(result.data))
      .catch(console.error);
  }, [sms]);

  const sendMessage = async (text: string, mobiles: string[]) => {
    return await sms.sendBulk(text, mobiles);
  };

  return { sms, credit, sendMessage };
}

// Usage in component
function MyComponent() {
  const { credit, sendMessage } = useSmsService('your-api-key', 30007732000000);

  const handleSend = async () => {
    try {
      const result = await sendMessage('Hello!', ['09123456789']);
      console.log('Sent!', result.data.packId);
    } catch (error) {
      console.error('Failed:', error);
    }
  };

  return (
    <div>
      <p>Credit: {credit}</p>
      <button onClick={handleSend}>Send SMS</button>
    </div>
  );
}
*/

// Example 9: Vue 3 Composition API
/*
import { ref, onMounted } from 'vue';
import { Smsir } from 'sms-typescript';

export default {
  setup() {
    const sms = new Smsir('your-api-key', 30007732000000);
    const credit = ref(0);

    onMounted(async () => {
      const result = await sms.getCredit();
      credit.value = result.data;
    });

    const sendMessage = async () => {
      const result = await sms.sendBulk('Hello!', ['09123456789']);
      console.log('Sent!', result.data.packId);
    };

    return {
      credit,
      sendMessage
    };
  }
};
*/

// Run examples (uncomment to test)
// classBasedExample();
// functionalExample();
// typedExample();

export { classBasedExample, functionalExample, typedExample };
