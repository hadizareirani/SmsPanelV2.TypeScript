# SMS.ir TypeScript SDK

Official TypeScript/JavaScript SDK for SMS.ir API - Send SMS, verification codes, and bulk messages with full TypeScript support.

[![npm version](https://img.shields.io/npm/v/sms-typescript.svg)](https://www.npmjs.com/package/sms-typescript)
[![License](https://img.shields.io/npm/l/sms-typescript.svg)](LICENSE.md)

## Features

✅ **Full TypeScript Support** - Complete type definitions for all APIs  
✅ **Multiple Module Formats** - Works with CommonJS, ES Modules, and TypeScript  
✅ **Modern & Legacy Support** - Class-based (v1.x compatible) and functional APIs  
✅ **Tree Shakeable** - Import only what you need  
✅ **Zero Dependencies** - Uses native fetch API (Node.js 18+)  
✅ **Comprehensive Documentation** - JSDoc comments for IntelliSense

## Installation

```bash
npm install sms-typescript
```

## Quick Start

### Class-Based API (Recommended for OOP)

```typescript
import { Smsir } from "sms-typescript";

const sms = new Smsir("your-api-key", 30007732000000);

// Send bulk SMS
const result = await sms.sendBulk("Hello!", ["09123456789"]);
console.log("Pack ID:", result.data.packId);

// Send verification code
await sms.sendVerifyCode("09123456789", 12345, [
  { name: "Code", value: "123456" },
]);

// Get account credit
const credit = await sms.getCredit();
console.log("Credit:", credit.data);
```

### Functional API (Recommended for Functional Programming)

```typescript
import { smsBuilder } from "sms-typescript";

const sms = smsBuilder({
  apiKey: "your-api-key",
  lineNumber: 30007732000000,
});

const result = await sms.sendBulk("Hello!", ["09123456789"]);
```

### CommonJS (Node.js)

```javascript
// Class-based (backward compatible with v1.x)
const { Smsir } = require("sms-typescript");
const sms = new Smsir("your-api-key", 30007732000000);

// Functional
const smsBuilder = require("sms-typescript").default;
const sms = smsBuilder({ apiKey: "your-api-key", lineNumber: 30007732000000 });
```

## API Reference

### Send Methods

#### `sendBulk(messageText, mobiles, sendDateTime?, customLineNumber?)`

Send the same message to multiple recipients.

```typescript
const result = await sms.sendBulk(
  "Hello World!",
  ["09123456789", "09987654321"],
  Date.now() + 3600000, // Optional: schedule for 1 hour later
  30007732000000 // Optional: custom line number
);
```

#### `sendLikeToLike(messageTexts, mobiles, sendDateTime?, customLineNumber?)`

Send different messages to different recipients (1-to-1 pairing).

```typescript
await sms.sendLikeToLike(
  ["Hello Ali", "Hello Sara"],
  ["09121111111", "09122222222"]
);
```

#### `sendVerifyCode(mobile, templateId, parameters)`

Send verification code using a predefined template.

```typescript
await sms.sendVerifyCode("09123456789", 12345, [
  { name: "Code", value: "123456" },
  { name: "Name", value: "John" },
]);
```

#### `deleteScheduled(packId)`

Delete a scheduled SMS pack.

```typescript
await sms.deleteScheduled("pack-id-here");
```

### Report Methods

#### `reportMessage(messageId)`

Get delivery status of a specific message.

```typescript
const report = await sms.reportMessage("876240022");
console.log("Delivery State:", report.data.deliveryState);
```

#### `reportPackById(packId)`

Get all messages in a specific pack.

```typescript
const pack = await sms.reportPackById("pack-id");
```

#### `reportTodayLive(pageNumber, pageSize)`

Get today's sent messages with pagination.

```typescript
const today = await sms.reportTodayLive(1, 10);
```

#### `reportArchive(fromDate, toDate, pageNumber, pageSize)`

Get archived sent messages within a date range.

```typescript
const archived = await sms.reportArchive(
  Date.now() - 86400000, // Yesterday
  Date.now(),
  1,
  10
);
```

#### `reportLatestReceive(count)`

Get latest received messages.

```typescript
const received = await sms.reportLatestReceive(100);
```

#### `reportReceiveLive(pageNumber, pageSize, sortByNewest)`

Get live received messages with pagination.

```typescript
const live = await sms.reportReceiveLive(1, 10, true);
```

#### `reportReceiveArchive(fromDate, toDate, pageNumber, pageSize)`

Get archived received messages.

```typescript
const archived = await sms.reportReceiveArchive(
  Date.now() - 86400000,
  Date.now(),
  1,
  10
);
```

### Settings Methods

#### `getCredit()`

Get current account credit balance.

```typescript
const credit = await sms.getCredit();
console.log("Credit:", credit.data);
```

#### `getLineNumbers()`

Get all available line numbers for your account.

```typescript
const lines = await sms.getLineNumbers();
console.log("Lines:", lines.data);
```

## Usage Examples

For detailed examples including Angular, React, Vue.js, and various use cases, see [USAGE_EXAMPLES.md](USAGE_EXAMPLES.md).

## TypeScript Support

Full TypeScript support with comprehensive type definitions:

```typescript
import {
  Smsir,
  SendBulkResponse,
  ResponseModel,
  SmsConfig,
} from "sms-typescript";

const config: SmsConfig = {
  apiKey: "your-api-key",
  lineNumber: 30007732000000,
};

const sms = new Smsir(config.apiKey, config.lineNumber);

const result: ResponseModel<SendBulkResponse> = await sms.sendBulk("Hello!", [
  "09123456789",
]);

// TypeScript knows the structure:
console.log(result.data.packId); // string
console.log(result.data.messageIds); // number[]
console.log(result.data.cost); // number
```

## Migration from v1.x

No code changes needed! The class-based API is fully backward compatible:

```javascript
// Old code (v1.x) - Still works!
const { Smsir } = require("sms-typescript");
const sms = new Smsir("api-key", lineNumber);

// All methods work the same way
sms.sendBulk("Hello", ["09123456789"]).then((result) => console.log(result));
```

## Requirements

- Node.js >= 18.0.0 (uses native `fetch` API)
- TypeScript >= 4.5 (if using TypeScript)

## Framework Integration

### Angular

```typescript
import { Smsir } from "sms-typescript";

export class AppComponent implements OnInit {
  private smsService: Smsir;

  constructor() {
    this.smsService = new Smsir("your-api-key", 30007732000000);
  }

  async sendMessage() {
    const result = await this.smsService.sendBulk("Hello!", ["09123456789"]);
    console.log("Sent!", result.data.packId);
  }
}
```

### React

```typescript
import { Smsir } from "sms-typescript";

const sms = new Smsir("your-api-key", 30007732000000);

function MyComponent() {
  const handleSend = async () => {
    const result = await sms.sendBulk("Hello!", ["09123456789"]);
    console.log("Sent!", result.data);
  };

  return <button onClick={handleSend}>Send SMS</button>;
}
```

### Vue.js

```typescript
import { Smsir } from "sms-typescript";

export default {
  data() {
    return {
      sms: new Smsir("your-api-key", 30007732000000),
    };
  },
  methods: {
    async sendMessage() {
      const result = await this.sms.sendBulk("Hello!", ["09123456789"]);
      console.log("Sent!", result.data);
    },
  },
};
```

## Error Handling

All methods return promises. Handle errors appropriately:

```typescript
try {
  const result = await sms.sendBulk("Hello", ["09123456789"]);
  console.log("Success:", result.data);
} catch (error) {
  console.error("Error:", error.message);
  // Handle error (retry, show message to user, etc.)
}
```

## Changelog

Please see [CHANGELOG](CHANGELOG.md) for more information about what has changed recently.

## Credits

- [IPE Company](https://github.com/IPeCompany)
- [Hadi Zare Irani](https://gitlab.com/hadizare)

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
