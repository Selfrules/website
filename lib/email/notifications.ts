/**
 * Email Notification System
 * Supports multiple email providers (Resend, SendGrid, etc.)
 * Falls back gracefully if email service is not configured
 */

import type { CalendarBooking } from '@/lib/firebase';

interface EmailConfig {
  apiKey?: string;
  from: string;
  provider: 'resend' | 'sendgrid' | 'console';
}

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

/**
 * Get email configuration from environment
 */
function getEmailConfig(): EmailConfig {
  const apiKey = process.env.EMAIL_API_KEY;
  const from = process.env.EMAIL_FROM || 'notifications@selfrules.org';

  // Determine provider based on API key or default to console logging
  let provider: 'resend' | 'sendgrid' | 'console' = 'console';
  if (apiKey) {
    // Resend keys start with 're_'
    if (apiKey.startsWith('re_')) {
      provider = 'resend';
    }
    // SendGrid keys are longer and start with 'SG.'
    else if (apiKey.startsWith('SG.')) {
      provider = 'sendgrid';
    }
  }

  return { apiKey, from, provider };
}

/**
 * Send email using configured provider
 */
async function sendEmail(options: EmailOptions): Promise<boolean> {
  const config = getEmailConfig();

  try {
    switch (config.provider) {
      case 'resend':
        return await sendWithResend(options, config);

      case 'sendgrid':
        return await sendWithSendGrid(options, config);

      case 'console':
      default:
        // Log to console for development
        console.log('📧 [EMAIL] Would send email:', {
          to: options.to,
          subject: options.subject,
          from: config.from,
          htmlLength: options.html.length,
        });
        return true;
    }
  } catch (error) {
    console.error('❌ [EMAIL] Failed to send email:', error);
    return false;
  }
}

/**
 * Send email via Resend API
 */
async function sendWithResend(
  options: EmailOptions,
  config: EmailConfig
): Promise<boolean> {
  if (!config.apiKey) return false;

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${config.apiKey}`,
    },
    body: JSON.stringify({
      from: config.from,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
    }),
  });

  if (!response.ok) {
    throw new Error(`Resend API error: ${response.statusText}`);
  }

  return true;
}

/**
 * Send email via SendGrid API
 */
async function sendWithSendGrid(
  options: EmailOptions,
  config: EmailConfig
): Promise<boolean> {
  if (!config.apiKey) return false;

  const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${config.apiKey}`,
    },
    body: JSON.stringify({
      personalizations: [
        {
          to: [{ email: options.to }],
        },
      ],
      from: { email: config.from },
      subject: options.subject,
      content: [
        {
          type: 'text/html',
          value: options.html,
        },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error(`SendGrid API error: ${response.statusText}`);
  }

  return true;
}

/**
 * Format date for email display
 */
function formatEmailDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short',
  }).format(date);
}

/**
 * Send booking confirmation email to user
 */
export async function sendBookingConfirmation(
  booking: CalendarBooking
): Promise<boolean> {
  const bookingDate = new Date(booking.dateTime);
  const formattedDate = formatEmailDate(bookingDate);

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Booking Confirmed</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #0D7EFF; color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
    .content { background: #f9f9f9; padding: 30px; border: 4px solid #000; border-top: none; border-radius: 0 0 8px 8px; }
    .booking-card { background: white; padding: 20px; margin: 20px 0; border: 3px solid #000; border-radius: 6px; box-shadow: 6px 6px 0 #000; }
    .booking-detail { margin: 10px 0; padding: 10px; background: #f0f0f0; border-left: 4px solid #0D7EFF; }
    .footer { text-align: center; margin-top: 30px; padding: 20px; color: #666; font-size: 14px; }
    .button { display: inline-block; background: #0D7EFF; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 10px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎉 Booking Confirmed!</h1>
    </div>
    <div class="content">
      <p>Hi <strong>${booking.name}</strong>,</p>

      <p>Your ${booking.type} session has been confirmed. I'm looking forward to our conversation!</p>

      <div class="booking-card">
        <h2 style="margin-top: 0;">Booking Details</h2>

        <div class="booking-detail">
          <strong>📅 Date & Time:</strong><br>
          ${formattedDate}
        </div>

        <div class="booking-detail">
          <strong>⏱️ Duration:</strong><br>
          ${booking.duration} minutes
        </div>

        <div class="booking-detail">
          <strong>📋 Type:</strong><br>
          ${booking.type.charAt(0).toUpperCase() + booking.type.slice(1)}
        </div>

        ${booking.notes ? `
        <div class="booking-detail">
          <strong>📝 Your Notes:</strong><br>
          ${booking.notes}
        </div>
        ` : ''}
      </div>

      <p><strong>What's Next?</strong></p>
      <ul>
        <li>You'll receive a calendar invite shortly</li>
        <li>A reminder will be sent 24 hours before our session</li>
        <li>Feel free to reach out if you need to reschedule</li>
      </ul>

      <p style="margin-top: 30px;">
        <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://selfrules.org'}" class="button">
          Visit Website
        </a>
      </p>

      <p>If you need to cancel or reschedule, please let me know as soon as possible.</p>

      <p>Best regards,<br><strong>Mattia</strong></p>
    </div>

    <div class="footer">
      <p>This email was sent to ${booking.email}</p>
      <p>Booking ID: ${booking.id}</p>
    </div>
  </div>
</body>
</html>
  `;

  const text = `
Booking Confirmed!

Hi ${booking.name},

Your ${booking.type} session has been confirmed.

Booking Details:
- Date & Time: ${formattedDate}
- Duration: ${booking.duration} minutes
- Type: ${booking.type}
${booking.notes ? `- Your Notes: ${booking.notes}` : ''}

You'll receive a calendar invite shortly, and a reminder 24 hours before our session.

Best regards,
Mattia

Booking ID: ${booking.id}
  `;

  return sendEmail({
    to: booking.email,
    subject: `Booking Confirmed - ${formattedDate}`,
    html,
    text,
  });
}

/**
 * Send booking notification to admin
 */
export async function sendAdminBookingNotification(
  booking: CalendarBooking
): Promise<boolean> {
  const adminEmail = process.env.ADMIN_EMAIL;
  if (!adminEmail) return false;

  const bookingDate = new Date(booking.dateTime);
  const formattedDate = formatEmailDate(bookingDate);

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: monospace; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #f5f5f5; border: 2px solid #333; }
    h1 { color: #0D7EFF; }
    .detail { margin: 10px 0; padding: 10px; background: white; border-left: 3px solid #0D7EFF; }
  </style>
</head>
<body>
  <div class="container">
    <h1>📅 New Booking Received</h1>

    <div class="detail">
      <strong>Name:</strong> ${booking.name}
    </div>

    <div class="detail">
      <strong>Email:</strong> ${booking.email}
    </div>

    <div class="detail">
      <strong>Phone:</strong> ${booking.phone || 'Not provided'}
    </div>

    <div class="detail">
      <strong>Date & Time:</strong> ${formattedDate}
    </div>

    <div class="detail">
      <strong>Duration:</strong> ${booking.duration} minutes
    </div>

    <div class="detail">
      <strong>Type:</strong> ${booking.type}
    </div>

    ${booking.notes ? `
    <div class="detail">
      <strong>Notes:</strong><br>
      ${booking.notes}
    </div>
    ` : ''}

    <p><a href="${process.env.NEXT_PUBLIC_APP_URL}/admin">View in Admin Dashboard</a></p>
  </div>
</body>
</html>
  `;

  return sendEmail({
    to: adminEmail,
    subject: `New Booking: ${booking.name} - ${formattedDate}`,
    html,
  });
}
