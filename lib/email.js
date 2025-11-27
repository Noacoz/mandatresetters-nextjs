import nodemailer from 'nodemailer';

// Configure your email service here
// Using Gmail or any SMTP provider
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'your-email@gmail.com',
    pass: process.env.EMAIL_PASSWORD || 'your-app-password',
  },
});

export async function sendVerificationEmail(email, code) {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER || 'noreply@mandatresetters.com',
      to: email,
      subject: 'Mandatresetters Admin Login - Verification Code',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #0a1931; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0;">Mandatresetters Holdings</h1>
            <p style="margin: 5px 0 0 0; font-size: 14px;">Admin Dashboard</p>
          </div>
          
          <div style="padding: 30px; background-color: #f9f9f9; border-radius: 0 0 8px 8px;">
            <h2 style="color: #0a1931; margin-top: 0;">Verify Your Admin Login</h2>
            
            <p style="color: #333; font-size: 16px; line-height: 1.6;">
              Hello,
            </p>
            
            <p style="color: #333; font-size: 16px; line-height: 1.6;">
              You requested to log in to your Mandatresetters Admin Dashboard. 
              Please use the verification code below to complete your login.
            </p>
            
            <div style="background-color: white; border: 2px solid #0a1931; border-radius: 8px; padding: 20px; text-align: center; margin: 20px 0;">
              <p style="margin: 0; font-size: 12px; color: #666;">Your Verification Code</p>
              <p style="margin: 10px 0 0 0; font-size: 32px; font-weight: bold; color: #0a1931; letter-spacing: 4px;">${code}</p>
            </div>
            
            <p style="color: #666; font-size: 14px;">
              <strong>This code will expire in 10 minutes.</strong>
            </p>
            
            <p style="color: #666; font-size: 14px; line-height: 1.6;">
              If you did not request this code, please ignore this email. Your account is secure.
            </p>
            
            <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
            
            <p style="color: #999; font-size: 12px; text-align: center;">
              © 2025 Mandatresetters Holdings. All rights reserved.
            </p>
          </div>
        </div>
      `,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent:', result.messageId);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}
