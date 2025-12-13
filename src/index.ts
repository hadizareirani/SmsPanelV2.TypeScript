/**
 * SMS.ir TypeScript SDK
 * 
 * A comprehensive TypeScript SDK for SMS.ir API v2.
 * Provides both class-based and functional interfaces for sending SMS, managing reports, and account settings.
 * 
 * @packageDocumentation
 * @module sms-ir-typescript
 * 
 * @example
 * ```typescript
 * // Using the Smsir class
 * import { Smsir } from 'sms-ir-typescript';
 * const sms = new Smsir("your-api-key", 30007732000000);
 * await sms.sendBulk("Hello!", ["09123456789"]);
 * ```
 * 
 * @example
 * ```typescript
 * // Using the smsBuilder function
 * import { smsBuilder } from 'sms-ir-typescript';
 * const sms = smsBuilder({ apiKey: "your-api-key", lineNumber: 30007732000000 });
 * await sms.sendBulk("Hello!", ["09123456789"]);
 * ```
 */

export { Smsir } from "./Smsir";
export { smsBuilder } from "./smsBuilder";

export * from "./send";
export * from "./report";
export * from "./settings";
export * from "./utils/models";

// Default export for easier imports
import { Smsir } from "./Smsir";
import { smsBuilder } from "./smsBuilder";
export default { Smsir, smsBuilder };


