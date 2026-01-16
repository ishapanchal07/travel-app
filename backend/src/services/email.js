const nodemailer = require('nodemailer');

// Create transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: process.env.EMAIL_PORT || 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

/**
 * Send email
 */
const sendEmail = async (to, subject, html, text = '') => {
  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.warn('Email service not configured');
      return { success: false, message: 'Email service not configured' };
    }

    const mailOptions = {
      from: `ROAMSTER <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Email sending error:', error);
    throw error;
  }
};

/**
 * Send booking confirmation email
 */
const sendBookingConfirmation = async (userEmail, booking) => {
  const html = `
    <h2>Booking Confirmation</h2>
    <p>Your booking has been confirmed!</p>
    <p><strong>Booking ID:</strong> ${booking._id}</p>
    <p><strong>Total Amount:</strong> ₹${booking.totalAmount}</p>
    <p>Thank you for using ROAMSTER!</p>
  `;

  return sendEmail(userEmail, 'Booking Confirmation - ROAMSTER', html);
};

module.exports = {
  sendEmail,
  sendBookingConfirmation
};

