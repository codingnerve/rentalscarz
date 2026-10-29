# RentalsCarz.co — Production Deployment & Operations Guide

## 1. Project Overview & Architecture
**RentalsCarz.co** is a modern, production-grade automotive car rental web platform engineered with:
- **Framework**: Next.js App Router (16.4.3) with Turbopack and React 19
- **Design System**: Tailwind CSS v4, custom brand tokens (#213052 Navy, #ED6029 Orange), accessible WCAG 2.2 AA compliant UI
- **Data Persistence**: Prisma ORM with SQLite (zero-config default) and full PostgreSQL compatibility
- **Validation**: Zod schema validation on client & server
- **Authentication**: HMAC SHA-256 signed HTTP-only sessions with PBKDF2 password hashing
- **Marketing & Tracking**: Google Consent Mode v2, Google Analytics 4 custom events, Google Ads conversion tracking, and telephone `tel:` lead attribution
- **Automated Testing**: Node.js native test runner executed via `tsx`

---

## 2. Local Development Quickstart

### Prerequisites
- Node.js 20+ (Node 22 LTS recommended)
- npm 10+

### Steps
1. **Clone and Install Dependencies**:
   ```bash
   npm install
   ```

2. **Configure Environment**:
   ```bash
   cp .env.example .env
   ```

3. **Synchronize & Seed Database**:
   ```bash
   npx prisma db push
   npx prisma db seed
   ```
   *Seeds 12 realistic fleet models, 8 international airport hubs across the USA, UK, and Canada, sample bookings, and the administrator account.*

4. **Run Development Server**:
   ```bash
   npm run dev
   ```
   Visit `http://localhost:3000` in your browser.

5. **Run Automated Test Suite**:
   ```bash
   npm run test
   ```

6. **Compile Production Build**:
   ```bash
   npm run build
   ```

---

## 3. Administrator Access
- **Portal URL**: `/admin` (Redirects to `/admin/login` if unauthenticated)
- **Default Seed Email**: `admin@rentalscarz.co`
- **Default Seed Password**: `AdminPassword2026!`
- **Capabilities**:
  - Live dashboard statistics (Total enquiries, pending requests, confirmed vouchers)
  - Booking status management (`Pending` -> `Under Review` -> `Confirmed` -> `Completed`)
  - Operational internal notes
  - Vehicle daily rate adjustments and listing toggles
  - Location directory overview
  - Business settings (phone hotlines, email, GA4/Ads parameters)

---

## 4. Environment Variables Checklist

| Variable | Description | Example / Required |
|---|---|---|
| `DATABASE_URL` | Prisma database connection string | `file:./dev.db` or PostgreSQL URI |
| `ADMIN_SESSION_SECRET` | 64-char HMAC SHA-256 session secret | `openssl rand -hex 32` |
| `ADMIN_DEFAULT_PASSWORD` | Seed password for initial admin user | `AdminPassword2026!` |
| `NEXT_PUBLIC_APP_URL` | Primary canonical URL | `https://rentalscarz.co` |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics 4 Measurement ID | `G-XXXXXXXXXX` |
| `NEXT_PUBLIC_GOOGLE_ADS_ID` | Google Ads Account ID | `AW-XXXXXXXXX` |
| `NEXT_PUBLIC_GOOGLE_ADS_BOOKING_LABEL` | Google Ads Conversion Action Label | `BOOKING_ENQUIRY` |
| `RESEND_API_KEY` | Optional Resend API key for transactional email | `re_12345...` |
| `BREVO_API_KEY` | Optional Brevo (Sendinblue) API key | `xkeysib-...` |
| `EMAIL_FROM` | Sender address for customer notices | `reservations@rentalscarz.co` |
| `SUPPORT_EMAIL` | Internal notification receipt address | `reservations@rentalscarz.co` |

---

## 5. Google Ads & Analytics Configuration

### Google Consent Mode v2
The platform defaults all consent signals (`ad_storage`, `analytics_storage`, `ad_user_data`, `ad_personalization`) to `denied` before user interaction. When a visitor accepts via the cookie banner (`components/CookieConsent.tsx`), consent is dynamically updated via `gtag('consent', 'update', { ... })`.

### Standard Events Fired:
1. `view_vehicle`: Dispatched when an individual car detail page is loaded.
2. `search_vehicles`: Dispatched when a search is executed via the hero or filter widget.
3. `begin_booking`: Dispatched when a user focuses the booking form on `/cars/[slug]`.
4. `submit_booking_request`: Dispatched upon successful submission of a reservation request (includes transaction ID and estimated value; personal identifiable information is stripped).
5. `click_to_call`: Dispatched on clicks to telephone `tel:` links with targeted market parameters.
6. `booking_confirmed`: Dispatched by staff confirmation in the administration dashboard.

### Telephone Conversion Setup:
All phone numbers on the website are wrapped with accessible `tel:` hyperlinks:
- **Toll-Free (US, UK & Canada)**: `+1 (844) 471-8023` (`tel:+18444718023`)

To activate Google Ads Website Call Conversion Tracking:
1. In Google Ads, create a Conversion Action for "Calls to a phone number on your website".
2. Enter the corresponding target phone number above.
3. Replace the plain link text or attach Google's `gtag('config', 'AW-XXX', { 'phone_conversion_number': '+1-844-471-8023' });`.

---

## 6. Production Deployment Options

### Option A: Vercel / Railway / Render
1. Connect your repository to the hosting provider.
2. Set Environment Variables (`DATABASE_URL`, `ADMIN_SESSION_SECRET`, `NEXT_PUBLIC_APP_URL`, etc.).
3. If using PostgreSQL (Neon, Supabase, AWS RDS):
   - In `prisma/schema.prisma`, update provider to `postgresql`:
     ```prisma
     datasource db {
       provider = "postgresql"
       url      = env("DATABASE_URL")
     }
     ```
   - In build settings, set build command:
     ```bash
     npx prisma generate && npx prisma db push && npm run build
     ```

### Option B: Self-Hosted Docker / VPS
1. Run standard multi-stage Node 22 Docker container.
2. Ensure write permissions on the SQLite directory or use a managed database.
3. Expose port `3000` behind Nginx or Caddy with HTTPS certificates configured.

---

## 7. Data Backup & Disaster Recovery
- **SQLite**: Back up `prisma/dev.db` using standard atomic file snapshots or cron backup.
- **PostgreSQL**: Configure automated daily snapshots (e.g. pg_dump or provider automated backups with 30-day retention).
- **Audit Logs**: All booking submissions and staff status updates are logged to the console/audit stream with unique transaction identifiers.
