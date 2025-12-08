# SMS.ir TypeScript SDK - Playground

This directory contains real-world examples for manually testing the SMS.ir SDK against the live API.

## 📋 Prerequisites

1. Active SMS.ir account
2. API key from SMS.ir panel
3. At least one line number
4. Some credit in your account

## ⚙️ Setup

### 1. Configure Environment Variables

Copy `.env.example` to `.env` and fill in your credentials:

```bash
cp .env.example .env
```

Edit `.env` with your actual values:

```env
SMSIR_API_KEY=your-actual-api-key-from-smsir-panel
SMSIR_LINE_NUMBER=30001234567890
SMSIR_TEST_MOBILE=09123456789
SMSIR_TEMPLATE_ID=12345
```

**How to get these values:**

- **API Key**: Login to [SMS.ir Panel](https://panel.sms.ir) → Settings → API Keys
- **Line Number**: Available in your SMS.ir panel dashboard
- **Template ID**: Create a template in panel → Templates section (for verify code examples)
- **Test Mobile**: Your own mobile number for testing

### 2. Install Dependencies

```bash
npm install
```

### 3. Build the SDK

```bash
npm run build
```

## 🚀 Running Examples

### Option 1: Class-based API (OOP approach)

```bash
npx ts-node playground/class-based.ts
```

**Best for:**

- Traditional object-oriented code
- When you need instance methods
- Projects already using classes

**Example usage:**

```typescript
const sms = new Smsir(apiKey, lineNumber);
await sms.sendBulk("message", ["09123456789"]);
```

### Option 2: Function-based API (Functional approach)

```bash
npx ts-node playground/function-based.ts
```

**Best for:**

- Functional programming style
- Composition patterns
- Modern JavaScript/TypeScript projects

**Example usage:**

```typescript
const sms = smsBuilder({ apiKey, lineNumber });
await sms.sendBulk("message", ["09123456789"]);
```

> **Note:** Make sure you have filled in your real credentials in `playground/.env` before running. The examples will fail with HTTP 400 errors if using placeholder values.

## 📚 Available Examples

Both files demonstrate all SDK methods:

### Send Methods (7 examples)

1. ✉️ **Send Bulk** - Send same message to multiple recipients
2. 📞 **Custom Line Number** - Override default line number
3. ⏰ **Scheduled SMS** - Send message at specific time
4. 🔀 **Like to Like** - Send different messages to different recipients
5. 🔐 **Verify Code** - Send OTP using templates
6. 🌐 **Send By URL** - Legacy URL-based sending
7. 🗑️ **Delete Scheduled** - Cancel scheduled messages

### Report Methods (8 examples)

8. 📊 **Message Status** - Check single message delivery status
9. 📦 **Pack Report** - Get pack information by ID
10. 📈 **Today Live** - Today's sent messages (paginated)
11. 📅 **Daily Pack** - Daily pack statistics
12. 📁 **Archive** - Historical messages by date range
13. 📥 **Latest Received** - Most recent received messages
14. 🔴 **Receive Live** - Live received messages
15. 🗄️ **Receive Archive** - Historical received messages

### Settings Methods (2 examples)

16. 💰 **Get Credit** - Check account balance
17. 📱 **Line Numbers** - Get all available line numbers

## 🔍 TODO Comments

Some examples contain `TODO` comments for values that depend on your account:

```typescript
// TODO: Replace with actual pack ID from sent SMS
const packId = "pack-id-from-sent-sms";
```

**How to fill TODOs:**

1. Run the send examples first to get real pack IDs and message IDs
2. Copy the returned IDs from console output
3. Paste them into the TODO sections
4. Re-run to test report methods with real data

## 🎯 Testing Workflow

1. **Start with Settings Methods** (examples 16-17)

   - Verify your API key works
   - Check available credit
   - Get your line numbers

2. **Test Send Methods** (examples 1-7)

   - Start with simple bulk send
   - Note the returned pack ID and message IDs
   - Try scheduled sends
   - Test verify code (requires template setup)

3. **Test Report Methods** (examples 8-15)
   - Use pack IDs from previous sends
   - Check message delivery status
   - Explore pagination options

## ⚠️ Important Notes

### Rate Limits

- SMS.ir may have rate limits on API calls
- Add delays between calls if testing extensively
- Check your panel for rate limit documentation

### Costs

- **Every SMS costs credits!**
- Test with minimal recipients first
- Use your own number for testing
- Check credit before running examples

### Scheduled Messages

- Scheduled messages consume credit immediately
- Use `deleteScheduled()` to cancel and refund credit
- Time must be Unix timestamp (seconds since epoch)

### Templates

- Verify code examples require template creation
- Create templates in SMS.ir panel first
- Template parameters must match your template design

## 🐛 Troubleshooting

### "API Key is invalid"

- Double-check your `.env` file
- Ensure no extra spaces in API key
- Verify key is active in SMS.ir panel

### "Insufficient credit"

- Top up your account
- Check credit with `getCredit()` method

### "Invalid line number"

- Verify line number in panel
- Check you have permission to use the line
- Try `getLineNumbers()` to see available lines

### TypeScript errors

- Run `npm run build` first
- Ensure all dependencies installed
- Check `tsconfig.json` is correct

## 📖 Additional Resources

- [SMS.ir Official Documentation](https://sms.ir/api)
- [SDK Repository](https://github.com/yourusername/smsir-typescript)
- [API Reference](https://docs.sms.ir)

## 🤝 Support

If you encounter issues:

1. Check this README
2. Review SMS.ir panel logs
3. Open an issue on GitHub
4. Contact SMS.ir support for account-specific issues

---

**Happy Testing! 🎉**
