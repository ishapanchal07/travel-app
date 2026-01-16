const twilio = require('twilio');

let twilioClient = null;

// Initialize Twilio client
if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
  twilioClient = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  );
}

/**
 * Send SMS
 */
const sendSMS = async (to, message) => {
  try {
    if (!twilioClient) {
      console.warn('SMS service not configured');
      return { success: false, message: 'SMS service not configured' };
    }

    const result = await twilioClient.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to
    });

    console.log('SMS sent:', result.sid);
    return { success: true, messageSid: result.sid };
  } catch (error) {
    console.error('SMS sending error:', error);
    throw error;
  }
};

/**
 * Send WhatsApp message
 */
const sendWhatsApp = async (to, message) => {
  try {
    if (!twilioClient) {
      console.warn('WhatsApp service not configured');
      return { success: false, message: 'WhatsApp service not configured' };
    }

    // Twilio WhatsApp format: whatsapp:+1234567890
    const whatsappTo = to.startsWith('whatsapp:') ? to : `whatsapp:${to}`;
    const whatsappFrom = `whatsapp:${process.env.TWILIO_PHONE_NUMBER}`;

    const result = await twilioClient.messages.create({
      body: message,
      from: whatsappFrom,
      to: whatsappTo
    });

    console.log('WhatsApp sent:', result.sid);
    return { success: true, messageSid: result.sid };
  } catch (error) {
    console.error('WhatsApp sending error:', error);
    throw error;
  }
};

module.exports = {
  sendSMS,
  sendWhatsApp
};

