# Email and SMS OTP setup

Prepared locally; not deployed or active. The existing live enquiry form continues to work.

## Accounts and cost

Use Twilio Verify for SMS and email verification. Its email channel uses a SendGrid account and a verified sending address/template. No accounts, payments or credentials were created. Confirm current Twilio Verify SMS fees for Indian recipients and SendGrid plan costs before purchasing; avoid a public launch on trial credentials, which restrict recipients. A custom email domain is preferable for sender authentication.

Official setup: https://www.twilio.com/docs/verify/email and https://www.twilio.com/docs/verify/quickstarts

## Configure privately in Netlify

Set Functions-scoped secrets: `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_VERIFY_SERVICE_SID`, `SENDGRID_API_KEY`, `OTP_FROM_EMAIL`, and `OTP_STORAGE_SECRET` (at least 32 cryptographically random characters). Never paste keys into chat or prefix them with NEXT_PUBLIC_. Configure six-digit OTPs, a SendGrid email template containing `{{twilio_code}}`, the email integration, SMS geo permissions for intended countries, Fraud Guard, spending alerts and provider rate limits. Configure the same authenticated sender as OTP_FROM_EMAIL for final enquiry notifications.

Set `NEXT_PUBLIC_SITE_URL` in both build and Functions scope to the actual production origin. Only after configuration, set `OTP_ENABLED=true` in Functions scope and `NEXT_PUBLIC_OTP_ENABLED=true` in build scope. Rebuild and deploy with functions included; do not use the previous static-only upload workflow without checking function bundling. Use `netlify dev` for local serverless testing; ordinary `next dev` does not serve these endpoints.

## Prevent the old bypass at activation

The current Netlify Forms endpoint is publicly writable. Before claiming OTP protection is active, disable its email submission notification and form collection, remove `public/__forms.html` and the legacy client submission branch/Netlify form attributes. Verify direct POSTs to the old form no longer produce mail. The verified endpoint sends the notification via SendGrid after server-side verification, rather than trusting any client verified flag. Do these changes together with activation, not now: they would break the working live form while credentials are missing.

## Behavior and limits

Visitors complete all existing fields, start verification, request and confirm each code, then submit. Changing email or phone resets verification. Sessions expire after ten minutes. Five code checks per channel per session, sixty seconds between resends, five session starts/IP/hour, ten code sends/IP/hour, five sends/contact/hour, and 100 total sends/day. Counters and submission claims use Netlify Blobs conditional writes with strong reads, so concurrent requests cannot silently overwrite limits or send duplicate enquiry notifications. Failed delivery still consumes the session to avoid duplicate mail after an ambiguous provider response; the visitor is given a real error and can restart or contact directly.

Netlify Blobs holds contact details and verification state, never OTP codes or enquiry messages. A daily cleanup removes expired sessions and rate counters; deletion may occur within a day after expiry. Provider retention policies apply separately. Consent copy appears before requesting SMS/email codes. Final email contains both verified contacts and reply-to visitor email. Success means SendGrid accepted the notification, not proof of inbox delivery.

## Required activation verification

Test real email and SMS delivery, wrong/expired codes, resend cooldown, attempt exhaustion, modified contacts, direct forged submissions, duplicate/concurrent submission, provider failures, and a captured email in the owner's inbox. Check 375/390/430px OTP controls and keyboard accessibility. Test function packaging in a private preview before activating production. Provider configuration and live delivery remain unverified until credentials exist.
