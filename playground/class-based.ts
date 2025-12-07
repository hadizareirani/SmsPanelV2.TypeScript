import { Smsir } from '../src/index';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: __dirname + '/.env' });

const API_KEY = process.env.SMSIR_API_KEY || '';
const LINE_NUMBER = Number(process.env.SMSIR_LINE_NUMBER) || 0;
const TEST_MOBILE = process.env.SMSIR_TEST_MOBILE || '';
const TEMPLATE_ID = Number(process.env.SMSIR_TEMPLATE_ID) || 0;
const PACK_ID = Number(process.env.SMSIR_PACK_ID) || 0;
const USERNAME = process.env.SMSIR_USERNAME || '';
const MESSAGE_ID = Number(process.env.SMSIR_MESSAGEID) || 0;

const sms = new Smsir(API_KEY, LINE_NUMBER);

async function runExamples() {
  console.log('🚀 SMS.ir Class-based API Examples\n');

  try {
    console.log('📤 SEND METHODS');
    console.log('─────────────────────────────────\n');

    // Send Bulk SMS
    console.log('1️⃣  Send Bulk SMS');
    try {
      const bulkResult = await sms.sendBulk(
        'سلام، این یک پیام تست از SDK است',
        [TEST_MOBILE]
      );
      console.log('✅ Success:', bulkResult);
      console.log(`   Pack ID: ${bulkResult.data.packId}`);
      console.log(`   Message IDs: ${bulkResult.data.messageIds.join(', ')}`);
      console.log(`   Cost: ${bulkResult.data.cost}\n`);
    } catch (error) {
      console.error('❌ Error:', error);
    }

    // Send Bulk SMS with Custom Line Number
    // console.log('2️⃣  Send Bulk SMS with Custom Line Number');
    // try {
    //   // TODO: Replace with your custom line number if different
    //   const customLineResult = await sms.sendBulk(
    //     'پیام با خط سفارشی',
    //     [TEST_MOBILE],
    //     undefined,
    //     LINE_NUMBER
    //   );
    //   console.log('✅ Success:', customLineResult.data);
    // } catch (error) {
    //   console.error('❌ Error:', error);
    // }

    // Send Scheduled SMS
    // console.log('\n3️⃣  Send Scheduled SMS (1 hour from now)');
    // try {
    //   const scheduledTime = Math.floor(Date.now() / 1000) + 3600; // 1 hour from now
    //   const scheduledResult = await sms.sendBulk(
    //     'این پیام یک ساعت دیگر ارسال خواهد شد',
    //     [TEST_MOBILE],
    //     scheduledTime
    //   );
    //   console.log('✅ Success:', scheduledResult.data);
    //   console.log(`   Scheduled Pack ID: ${scheduledResult.data.packId}\n`);
    // } catch (error) {
    //   console.error('❌ Error:', error);
    // }

    // Send Like to Like (Multiple messages to multiple recipients)
    // console.log('4️⃣  Send Like to Like');
    // try {
    //   const likeToLikeResult = await sms.sendLikeToLike(
    //     ['سلام کاربر اول', 'سلام کاربر دوم'],
    //     [TEST_MOBILE, TEST_MOBILE] 
    //   );
    //   console.log('✅ Success:', likeToLikeResult.data);
    // } catch (error) {
    //   console.error('❌ Error:', error);
    // }

    // Send Verify Code
    // console.log('\n5️⃣  Send Verify Code');
    // try {
    //   const verifyResult = await sms.sendVerifyCode(
    //     TEST_MOBILE,
    //     TEMPLATE_ID, 
    //     [
    //       { name: 'CODE', value: '123456' },
    //     ]
    //   );
    //   console.log('✅ Success:', verifyResult.data);
    // } catch (error) {
    //   console.error('❌ Error:', error);
    // }

    // Send By URL (Legacy method)
    // console.log('\n6️⃣  Send By URL');
    // try {
    //   // TODO: Replace 'username' with your actual SMS.ir panel username
    //   const urlResult = await sms.sendByURL(
    //     USERNAME,
    //     TEST_MOBILE,
    //     'پیام تست از طریق URL'
    //   );
    //   console.log('✅ Success:', urlResult.data);
    // } catch (error) {
    //   console.error('❌ Error:', error);
    // }

    // Delete Scheduled SMS
    // console.log('\n7️⃣  Delete Scheduled SMS');
    // try {
    //   // TODO: Replace with actual pack ID from scheduled SMS
    //   const deleteResult = await sms.deleteScheduled(PACK_ID);
    //   console.log('✅ Success:', deleteResult.data);
    //   console.log(`   Returned Credit: ${deleteResult.data.returnedCreditCount}`);
    //   console.log(`   SMS Count: ${deleteResult.data.smsCount}\n`);
    // } catch (error) {
    //   console.error('❌ Error:', error);
    // }

    // ============================================
    // REPORT METHODS
    // ============================================
    
    // console.log('\n📊 REPORT METHODS');
    // console.log('─────────────────────────────────\n');

    // Report Message Status
    // console.log('8️⃣  Report Message Status');
    // try {
    //   // TODO: Replace with actual message ID from sent SMS
    //   const messageReport = await sms.reportMessage(MESSAGE_ID);
    //   console.log('✅ Success:', messageReport.data);
    // } catch (error) {
    //   console.error('❌ Error:', error);
    // }

    // Report Pack by ID
    // console.log('\n9️⃣  Report Pack by ID');
    // try {
    //   // TODO: Replace with actual pack ID
    //   const packId = 'pack-id-from-sent-sms';
    //   const packReport = await sms.reportPackById(packId);
    //   console.log('✅ Success:', packReport.data);
    // } catch (error) {
    //   console.error('❌ Error:', error);
    // }

    // Report Today Live Messages
    // console.log('\n🔟 Report Today Live Messages');
    // try {
    //   const todayLive = await sms.reportTodayLive(1, 10); // page 1, 10 items
    //   console.log('✅ Success:', todayLive.data);
    // } catch (error) {
    //   console.error('❌ Error:', error);
    // }

    // Report Daily Pack
    // console.log('\n1️⃣1️⃣  Report Daily Pack');
    // try {
    //   const dailyPack = await sms.reportDailyPack(1, 10);
    //   console.log('✅ Success:', dailyPack.data);
    // } catch (error) {
    //   console.error('❌ Error:', error);
    // }

    // 12. Report Archive Messages
    // console.log('\n1️⃣2️⃣  Report Archive Messages');
    // try {
    //   const fromDate = Math.floor(Date.now() / 1000) - (7 * 24 * 60 * 60); // 7 days ago
    //   const toDate = Math.floor(Date.now() / 1000);
    //   const archive = await sms.reportArchive(fromDate, toDate, 1, 10);
    //   console.log('✅ Success:', archive.data);
    // } catch (error) {
    //   console.error('❌ Error:', error);
    // }

    // Report Latest Received Messages
    // console.log('\n1️⃣3️⃣  Report Latest Received Messages');
    // try {
    //   const latestReceived = await sms.reportLatestReceive(10); // Get 10 latest
    //   console.log('✅ Success:', latestReceived.data);
    // } catch (error) {
    //   console.error('❌ Error:', error);
    // }

    // Report Receive Live
    // console.log('\n1️⃣4️⃣  Report Receive Live');
    // try {
    //   const receiveLive = await sms.reportReceiveLive(1, 10, true); // Sorted by newest
    //   console.log('✅ Success:', receiveLive.data);
    // } catch (error) {
    //   console.error('❌ Error:', error);
    // }

    // Report Receive Archive
    // console.log('\n1️⃣5️⃣  Report Receive Archive');
    // try {
    //   const fromDate = Math.floor(Date.now() / 1000) - (7 * 24 * 60 * 60);
    //   const toDate = Math.floor(Date.now() / 1000);
    //   const receiveArchive = await sms.reportReceiveArchive(fromDate, toDate, 1, 10);
    //   console.log('✅ Success:', receiveArchive.data);
    // } catch (error) {
    //   console.error('❌ Error:', error);
    // }

    // ============================================
    // SETTINGS METHODS
    // ============================================
    
    // console.log('\n⚙️  SETTINGS METHODS');
    // console.log('─────────────────────────────────\n');

    // Get Credit
    // console.log('1️⃣6️⃣  Get Account Credit');
    // try {
    //   const credit = await sms.getCredit();
    //   console.log('✅ Success:', credit.data);
    //   console.log(`   Your Credit: ${credit.data}\n`);
    // } catch (error) {
    //   console.error('❌ Error:', error);
    // }

    // Get Line Numbers
    // console.log('1️⃣7️⃣  Get Line Numbers');
    // try {
    //   const lineNumbers = await sms.getLineNumbers();
    //   console.log('✅ Success:', lineNumbers.data);
    //   console.log(`   Available Lines: ${lineNumbers.data.length}\n`);
    // } catch (error) {
    //   console.error('❌ Error:', error);
    // }

    // ============================================
    // BACKWARD COMPATIBILITY (Deprecated Methods)
    // ============================================
    
//     console.log('\n⚠️  DEPRECATED METHODS (v1.x compatibility)');
//     console.log('─────────────────────────────────\n');

//     console.log('1️⃣8️⃣  SendBulk (Deprecated - use sendBulk instead)');
//     try {
//       const deprecatedResult = await sms.SendBulk(
//         'تست متد قدیمی',
//         [TEST_MOBILE]
//       );
//       console.log('✅ Still works for backward compatibility:', deprecatedResult.data);
//     } catch (error) {
//       console.error('❌ Error:', error);
//     }

  } catch (error) {
    console.error('\n❌ Fatal Error:', error);
  }
}

// Run examples
console.log('═══════════════════════════════════════════════════════════');
console.log('  SMS.ir TypeScript SDK - Class-based Examples');
console.log('═══════════════════════════════════════════════════════════\n');

if (!API_KEY || API_KEY === 'your-api-key-here') {
  console.error('❌ Please set your API_KEY in playground/.env file');
  process.exit(1);
}

runExamples()
  .then(() => {
    console.log('\n✅ All examples completed!');
  })
  .catch((error) => {
    console.error('\n❌ Error running examples:', error);
    process.exit(1);
  });
