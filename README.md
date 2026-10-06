# Diwanshu Kumar — professional portfolio

Next.js App Router, TypeScript and Tailwind CSS. A static export keeps hosting simple and minimizes runtime JavaScript. No CMS, database or animation dependencies.

## Development

Node.js 24 recommended.

```sh
npm ci
npm run dev
npm run lint
npm run typecheck
npm run build
```

`npm run build` exports the production site to `out/`. `npm start` is not compatible with static export; preview the production output with `npx serve out`.

## Structure

- `app/page.tsx`: homepage, editable project/service/FAQ data
- `app/globals.css`: responsive design and Tailwind import
- `app/layout.tsx`: SEO and social metadata
- `components/navigation.tsx`: accessible mobile navigation
- `components/contact-form.tsx`: Netlify enquiry form
- `public/__forms.html`: static Netlify form detection skeleton
- `public/favicon.svg`, `public/og.svg`: brand assets
- `netlify.toml`: build, output and security headers

## Netlify form setup

Enable form detection in the Netlify Forms dashboard before deploying. The static skeleton registers `business-enquiry` and all submitted fields. The visible form posts URL-encoded data to `/__forms.html`, with a honeypot and HTTP error handling. Localhost submission displays a clear unavailable message. No local submissions are sent. Configure email notifications to `diwanshuk.web@gmail.com` in Netlify, then send a test enquiry after deployment and confirm receipt in Forms and email. A successful HTTP response alone cannot verify dashboard registration, so this deployment check is required.

## Before deployment

- Genuine live-site screenshots are included as optimized WebP files in `public/projects/`. Refresh these when the concept websites change; retain concept disclosures.
- A 1200×630 `public/og.png` is included for social sharing; `public/og.svg` is the editable source.
- Set `NEXT_PUBLIC_SITE_URL` to the final HTTPS domain in Netlify. This enables canonical metadata and the social image URL. The robots file and sitemap are generated automatically; the sitemap stays empty until this URL is configured.
- Confirm both external portfolio websites are available.
- Enable Forms detection, configure notifications, and test a real submission after deployment.
- Confirm included domain/hosting terms, renewal pricing and package scope before accepting a project.

Copyright year is generated at build time; rebuild annually for the current year. Published at https://diwanshuk-web.netlify.app. Netlify detected `business-enquiry`; email notifications to diwanshuk.web@gmail.com are configured, and a labelled live test was captured successfully. Inbox delivery requires owner confirmation.

## Verification notes

Both project URLs returned HTTP 200. Production dependencies have zero npm audit vulnerabilities. Five high-severity audit entries remain in the development-only Next.js ESLint chain, originating from the unpatched `braces` 3.0.3 advisory. Do not use `npm audit fix --force`: its suggested fix downgrades the lint config across major versions. Recheck for an upstream patch before deployment.

## Confirmed packages

Starter: ₹19,999 professional business website. Growth: ₹24,999 founding-client offer for the first 5 businesses, ₹29,999 standard. Both include domain/hosting for one year and two revision rounds (one before and one after launch). Both include the 20-day development-bug guarantee; only Growth includes 20-day zero-cost maintenance. Ongoing maintenance is optional at ₹1,500/month. Package CTAs use distinct WhatsApp messages. Confirm offer availability manually and update/remove the offer after the fifth eligible business; there is no fabricated remaining-slot counter. Growth enquiry and conversion features are customized around each business and customer journey.

Screenshots were captured from the supplied live URLs at 1280×800 (Shreejee) and 1280×720 (Rao Butter Momos) on 6 October 2026; they are genuine viewport captures, compressed without interface changes.

## Prepared OTP verification

Email and SMS OTP integration is implemented behind disabled feature flags. It has not been deployed or tested with live providers. See [OTP-SETUP.md](OTP-SETUP.md) for account setup, secrets, limits and the required removal of the legacy Forms bypass at activation. Run `npm run test:verification` for validation tests. Owner confirmed receipt of the existing Netlify form notification.
