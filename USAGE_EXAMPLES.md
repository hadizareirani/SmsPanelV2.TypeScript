# SMS.ir TypeScript SDK - Usage Examples

This document provides comprehensive examples for using the SMS.ir TypeScript SDK in different environments and with different approaches.

## Installation

```bash
npm install sms-typescript
```

## Table of Contents

- [Class-Based Approach (Recommended for OOP)](#class-based-approach)
- [Functional Approach (Recommended for Functional Programming)](#functional-approach)
- [TypeScript Usage](#typescript-usage)
- [CommonJS (Node.js) Usage](#commonjs-nodejs-usage)
- [ES6 Module Usage](#es6-module-usage)
- [API Reference](#api-reference)

---

## Class-Based Approach

The class-based approach is perfect if you're familiar with the old version of this package or prefer object-oriented programming.

### TypeScript/ES6

```typescript
import { Smsir } from "sms-typescript";

// Initialize the client
const sms = new Smsir("your-api-key", 30007732000000);

// Send bulk SMS
async function sendBulkExample() {
  const result = await sms.sendBulk("Hello World!", [
    "09123456789",
    "09987654321",
  ]);
  console.log("Pack ID:", result.data.packId);
  console.log("Message IDs:", result.data.messageIds);
  console.log("Cost:", result.data.cost);
}

// Send verification code
async function sendVerifyCodeExample() {
  const result = await sms.sendVerifyCode(
    "09123456789",
    12345, // Template ID from your SMS.ir panel
    [
      { name: "Code", value: "123456" },
      { name: "Name", value: "John Doe" },
    ]
  );
  console.log("Message ID:", result.data.messageId);
}

// Get account credit
async function getCreditExample() {
  const credit = await sms.getCredit();
  console.log("Credit:", credit.data);
}

// Send like-to-like (paired messages)
async function sendLikeToLikeExample() {
  const result = await sms.sendLikeToLike(
    ["Hello Ali", "Hello Sara", "Hello Mohammad"],
    ["09121111111", "09122222222", "09123333333"]
  );
  console.log("Pack ID:", result.data.packId);
}

// Schedule SMS for later
async function scheduleSmsExample() {
  const sendTime = Date.now() + 3600000; // 1 hour from now
  const result = await sms.sendBulk(
    "Scheduled message",
    ["09123456789"],
    sendTime
  );
  console.log("Scheduled Pack ID:", result.data.packId);
}

// Delete scheduled SMS
async function deleteScheduledExample() {
  const packId = "2b99e72c-9bf8-4c68-9d63-02741cb7d0b8";
  const result = await sms.deleteScheduled(packId);
  console.log("Returned Credits:", result.data.returnedCreditCount);
}

// Get message report
async function getMessageReportExample() {
  const messageId = "876240022";
  const report = await sms.reportMessage(messageId);
  console.log("Delivery State:", report.data.deliveryState);
  console.log("Mobile:", report.data.mobile);
  console.log("Cost:", report.data.cost);
}

// Get line numbers
async function getLineNumbersExample() {
  const lines = await sms.getLineNumbers();
  console.log("Available Lines:", lines.data);
}
```

### CommonJS (Node.js)

```javascript
const { Smsir } = require("sms-typescript");

const sms = new Smsir("your-api-key", 30007732000000);

// Send bulk SMS
sms
  .sendBulk("Hello World!", ["09123456789"])
  .then((result) => {
    console.log("Pack ID:", result.data.packId);
    console.log("Message IDs:", result.data.messageIds);
    console.log("Cost:", result.data.cost);
  })
  .catch((error) => {
    console.error("Error:", error.message);
  });

// Send verification code
sms
  .sendVerifyCode("09123456789", 12345, [{ name: "Code", value: "123456" }])
  .then((result) => {
    console.log("Message sent! ID:", result.data.messageId);
  })
  .catch((error) => {
    console.error("Error:", error.message);
  });
```

---

## Functional Approach

The functional approach is great for functional programming patterns and allows for more flexibility.

### TypeScript/ES6

```typescript
import smsBuilder from "sms-typescript";
// or
import { smsBuilder } from "sms-typescript";

// Initialize the client
const sms = smsBuilder({
  apiKey: "your-api-key",
  lineNumber: 30007732000000,
});

// Send bulk SMS
async function sendBulkExample() {
  const result = await sms.sendBulk("Hello World!", [
    "09123456789",
    "09987654321",
  ]);
  console.log("Pack ID:", result.data.packId);
}

// Send verification code
async function sendVerifyCodeExample() {
  const result = await sms.sendVerifyCode("09123456789", 12345, [
    { name: "Code", value: "123456" },
  ]);
  console.log("Message ID:", result.data.messageId);
}

// All other methods work the same as in the class-based approach
```

### CommonJS (Node.js)

```javascript
const smsBuilder = require("sms-typescript").default;
// or
const { smsBuilder } = require("sms-typescript");

const sms = smsBuilder({
  apiKey: "your-api-key",
  lineNumber: 30007732000000,
});

// Send bulk SMS
sms
  .sendBulk("Hello!", ["09123456789"])
  .then((result) => console.log(result.data))
  .catch((error) => console.error(error));
```

---

## TypeScript Usage

Full type safety and IntelliSense support:

```typescript
import { Smsir, SendBulkResponse, ResponseModel } from "sms-typescript";

const sms = new Smsir("your-api-key", 30007732000000);

async function typedExample() {
  // Response is fully typed
  const result: ResponseModel<SendBulkResponse> = await sms.sendBulk("Hello!", [
    "09123456789",
  ]);

  // TypeScript knows the structure
  console.log(result.data.packId); // string
  console.log(result.data.messageIds); // number[]
  console.log(result.data.cost); // number
  console.log(result.status); // number
  console.log(result.message); // string
}
```

---

## CommonJS (Node.js) Usage

### Using Class (Backward Compatible with v1.x)

```javascript
// Works exactly like the old version!
const { Smsir } = require("sms-typescript");

const sms = new Smsir("your-api-key", 30007732000000);

// All methods return promises
sms
  .sendBulk("Test message", ["09123456789"])
  .then((response) => {
    console.log("Success:", response.data);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
```

### Using Function

```javascript
const smsBuilder = require("sms-typescript").default;

const sms = smsBuilder({
  apiKey: "your-api-key",
  lineNumber: 30007732000000,
});

sms
  .sendBulk("Test message", ["09123456789"])
  .then((response) => console.log(response.data));
```

---

## ES6 Module Usage

### Browser (with bundler like Webpack/Vite)

```javascript
import { Smsir } from "sms-typescript";

const sms = new Smsir("your-api-key", 30007732000000);

async function sendSms() {
  try {
    const result = await sms.sendBulk("Hello!", ["09123456789"]);
    console.log("Sent!", result.data.packId);
  } catch (error) {
    console.error("Failed:", error.message);
  }
}
```

### Node.js with ESM (type: "module" in package.json)

```javascript
import { Smsir } from "sms-typescript";

const sms = new Smsir("your-api-key", 30007732000000);

const result = await sms.sendBulk("Hello!", ["09123456789"]);
console.log(result.data);
```

---

## API Reference

### Send Methods

#### `sendBulk(messageText, mobiles, sendDateTime?, customLineNumber?)`

Send the same message to multiple recipients.

- **messageText**: string - The message to send
- **mobiles**: string[] - Array of mobile numbers
- **sendDateTime**: number (optional) - Unix timestamp for scheduled sending
- **customLineNumber**: number (optional) - Override default line number

#### `sendLikeToLike(messageTexts, mobiles, sendDateTime?, customLineNumber?)`

Send different messages to different recipients (1-to-1 pairing).

- **messageTexts**: string[] - Array of messages
- **mobiles**: string[] - Array of mobile numbers (must match messageTexts length)

#### `sendVerifyCode(mobile, templateId, parameters)`

Send a verification code using a template.

- **mobile**: string - Recipient's mobile number
- **templateId**: number - Template ID from SMS.ir panel
- **parameters**: Array<{name: string, value: string}> - Template parameters

#### `deleteScheduled(packId)`

Delete a scheduled SMS pack.

- **packId**: string - The pack identifier

#### `sendByURL(username, mobile, text, customLine?)`

Legacy method for sending SMS via URL parameters.

### Report Methods

#### `reportMessage(messageId)`

Get delivery status of a message.

- **messageId**: string - The message ID

#### `reportPackById(packId)`

Get all messages in a pack.

- **packId**: string - The pack identifier

#### `reportTodayLive(pageNumber, pageSize)`

Get today's sent messages.

#### `reportArchive(fromDate, toDate, pageNumber, pageSize)`

Get archived sent messages.

#### `reportLatestReceive(count)`

Get latest received messages.

- **count**: number - Number of messages to retrieve

#### `reportReceiveLive(pageNumber, pageSize, sortByNewest)`

Get live received messages.

#### `reportReceiveArchive(fromDate, toDate, pageNumber, pageSize)`

Get archived received messages.

### Settings Methods

#### `getCredit()`

Get current account credit balance.

#### `getLineNumbers()`

Get all available line numbers.

---

## Migration from v1.x

If you're upgrading from the old version, no code changes are needed! The class-based API (`Smsir`) works exactly the same way:

```javascript
// Old code (v1.x) - Still works!
const { Smsir } = require("sms-typescript");
const sms = new Smsir("api-key", 30007732000000);

sms
  .SendBulk("Hello", ["09123456789"]) // Old method name
  .then((result) => console.log(result));

// New code (v2.x) - Same functionality, better naming
sms.sendBulk("Hello", ["09123456789"]).then((result) => console.log(result));
```

**Note**: Method names are now camelCase (e.g., `sendBulk` instead of `SendBulk`) following JavaScript conventions, but both work for backward compatibility.

---

## Error Handling

All methods return promises, so you can use try/catch or .catch():

```typescript
// Using async/await
try {
  const result = await sms.sendBulk("Hello", ["09123456789"]);
  console.log("Success:", result.data);
} catch (error) {
  console.error("Error:", error.message);
  // Handle error appropriately
}

// Using promises
sms
  .sendBulk("Hello", ["09123456789"])
  .then((result) => {
    console.log("Success:", result.data);
  })
  .catch((error) => {
    console.error("Error:", error.message);
  });
```

---

## Requirements

- Node.js >= 18.0.0 (uses native `fetch` API)
- For older Node.js versions, consider using a polyfill for `fetch`

---

## Support

- **Documentation**: [https://sms.ir/](https://sms.ir/)
- **GitHub Issues**: [https://github.com/IPeCompany/SmsPanelV2.TypeScript/issues](https://github.com/IPeCompany/SmsPanelV2.TypeScript/issues)
- **NPM Package**: [https://www.npmjs.com/package/sms-typescript](https://www.npmjs.com/package/sms-typescript)
