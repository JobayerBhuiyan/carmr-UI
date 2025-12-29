type EmailData = {
  to: string
  subject: string
  html: string
}

export async function sendEmail(data: EmailData): Promise<void> {
  console.log("=== EMAIL NOTIFICATION ===")
  console.log(`To: ${data.to}`)
  console.log(`Subject: ${data.subject}`)
  console.log(`Body: ${data.html}`)
  console.log("=========================")
}

export async function sendPurchaseConfirmation(
  email: string,
  planName: string,
  amount: number,
  credits?: number
): Promise<void> {
  const subject = "Purchase Confirmation - CarMR"
  const html = `
    <html>
      <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #f8f9fa; padding: 20px; text-align: center;">
          <h1 style="color: #333;">Thank You for Your Purchase!</h1>
        </div>
        <div style="padding: 30px 20px;">
          <p>Hi there,</p>
          <p>Thank you for purchasing from CarMR! Your payment has been processed successfully.</p>

          <div style="background-color: #e9ecef; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Purchase Details</h3>
            <p><strong>Plan:</strong> ${planName.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase())}</p>
            <p><strong>Amount:</strong> $${(amount / 100).toFixed(2)}</p>
            ${credits ? `<p><strong>Credits:</strong> ${credits} report${credits > 1 ? 's' : ''}</p>` : ''}
          </div>

          <p>You can now check vehicle history reports by visiting your dashboard.</p>

          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://carmr.com'}/dashboard"
               style="background-color: #007bff; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
              View Dashboard
            </a>
          </div>

          <p>If you have any questions, feel free to contact our support team.</p>

          <p>Best regards,<br>The CarMR Team</p>
        </div>
        <div style="background-color: #f8f9fa; padding: 20px; text-align: center; font-size: 12px; color: #666;">
          <p>CarMR - Vehicle History Reports</p>
          <p>This is an automated email. Please do not reply.</p>
        </div>
      </body>
    </html>
  `

  await sendEmail({ to: email, subject, html })
}

export async function sendSubscriptionConfirmation(
  email: string,
  subscriptionId: string
): Promise<void> {
  const subject = "Subscription Activated - CarMR"
  const html = `
    <html>
      <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #f8f9fa; padding: 20px; text-align: center;">
          <h1 style="color: #333;">Welcome to CarMR Monthly!</h1>
        </div>
        <div style="padding: 30px 20px;">
          <p>Hi there,</p>
          <p>Your monthly subscription has been activated successfully!</p>

          <div style="background-color: #e9ecef; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Subscription Details</h3>
            <p><strong>Plan:</strong> Monthly Subscription</p>
            <p><strong>Benefits:</strong> Unlimited vehicle history reports</p>
            <p><strong>Billing:</strong> $39.99/month</p>
          </div>

          <p>You now have unlimited access to vehicle history reports. Start checking VINs right away!</p>

          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://carmr.com'}/"
               style="background-color: #007bff; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
              Check a VIN Now
            </a>
          </div>

          <p><strong>Note:</strong> Your subscription will automatically renew each month unless you cancel.</p>

          <p>Best regards,<br>The CarMR Team</p>
        </div>
        <div style="background-color: #f8f9fa; padding: 20px; text-align: center; font-size: 12px; color: #666;">
          <p>CarMR - Vehicle History Reports</p>
          <p>Subscription ID: ${subscriptionId}</p>
        </div>
      </body>
    </html>
  `

  await sendEmail({ to: email, subject, html })
}

export async function sendSubscriptionCanceled(
  email: string,
  endDate: string
): Promise<void> {
  const subject = "Subscription Canceled - CarMR"
  const html = `
    <html>
      <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #f8f9fa; padding: 20px; text-align: center;">
          <h1 style="color: #333;">Subscription Canceled</h1>
        </div>
        <div style="padding: 30px 20px;">
          <p>Hi there,</p>
          <p>Your CarMR monthly subscription has been canceled.</p>

          <div style="background-color: #fff3cd; padding: 20px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #ffc107;">
            <p><strong>Access Until:</strong> ${new Date(endDate).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric'
            })}</p>
            <p>You will continue to have access to your subscription benefits until the end of your current billing period.</p>
          </div>

          <p>We're sorry to see you go! If you change your mind, you can resubscribe anytime.</p>

          <p>Best regards,<br>The CarMR Team</p>
        </div>
        <div style="background-color: #f8f9fa; padding: 20px; text-align: center; font-size: 12px; color: #666;">
          <p>CarMR - Vehicle History Reports</p>
        </div>
      </body>
    </html>
  `

  await sendEmail({ to: email, subject, html })
}

export async function sendPaymentFailed(
  email: string,
  errorMessage?: string
): Promise<void> {
  const subject = "Payment Failed - CarMR"
  const html = `
    <html>
      <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #f8f9fa; padding: 20px; text-align: center;">
          <h1 style="color: #dc3545;">Payment Failed</h1>
        </div>
        <div style="padding: 30px 20px;">
          <p>Hi there,</p>
          <p>We were unable to process your payment.</p>

          ${errorMessage ? `
          <div style="background-color: #f8d7da; padding: 20px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #dc3545;">
            <p><strong>Error:</strong> ${errorMessage}</p>
          </div>
          ` : ''}

          <p>Please check your payment method and try again. If the problem persists, contact your bank or try a different payment method.</p>

          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://carmr.com'}/pricing"
               style="background-color: #007bff; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
              Try Again
            </a>
          </div>

          <p>If you need assistance, please contact our support team at support@carmr.com.</p>

          <p>Best regards,<br>The CarMR Team</p>
        </div>
        <div style="background-color: #f8f9fa; padding: 20px; text-align: center; font-size: 12px; color: #666;">
          <p>CarMR - Vehicle History Reports</p>
        </div>
      </body>
    </html>
  `

  await sendEmail({ to: email, subject, html })
}
