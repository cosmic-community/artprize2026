# ArtPrize2026

![App Preview](https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=1200&h=300&fit=crop&auto=format)

A minimalist, counterculture art project that exists as a living digital performance piece. This website serves as both canvas and mechanism for a mysterious experiment - counting down to an unknown revelation while collecting contributions and ideas from the collective unconscious.

## Features

- **Real-time Countdown Timer** - Large, hypnotic countdown to the target revelation date
- **Live Fundraising Display** - Prominently shows total money raised with smooth animations
- **Full-screen Manifesto Modal** - Reveals the philosophical foundation of the experiment
- **Direct Action Integration** - Seamless Venmo donations and email suggestions
- **Headless CMS Control** - All content dynamically managed through Cosmic
- **Environment-Driven Config** - Instant updates via environment variables
- **Minimalist Aesthetic** - Stark black background with high-contrast white typography
- **Accessibility Focused** - Semantic markup and screen reader support
- **Mobile Optimized** - Responsive design that works on all devices

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=68d187cbd7c81076a7d6c3f0&clone_repository=68d189b1d7c81076a7d6c407)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Build a minimalist website called ArtPrize2026.com with a mostly black background and mysterious aesthetic. The site should feel like an art piece itself: stark, elegant, and counterculture.

The website should include these core sections:
	1.	Homepage Layout
	•	Large countdown timer to the start of ArtPrize 2026
	•	Prominent showcase of the total money raised so far (display as a big bold number)
	•	Links or buttons to:
	•	"Manifesto" (click to open manifesto page or modal)
	•	"Fuel the Experiment" (external link to Venmo donation)
	•	"Whisper Your Ideas" (link to a simple suggestion form or email)
	•	Small footer with disclaimer text:
This is an art project for entertainment purposes only. The final use of the money will be dictated solely by the ownership of this piece.
	2.	Manifesto Page/Modal
	•	A content field where we can write the manifesto text explaining the concept of the piece.
	•	This should be full-screen, minimal text layout (white text on black).
	3.	Data Fields / Content Model
	•	Manifesto (rich text field)
	•	Total Raised (number field, manually editable)
	•	Countdown Target Date (date/time field set to ArtPrize 2026 start date)
	•	Donation Link (URL field)
	•	Suggestion Link (URL or email field)
	•	Disclaimer (plain text field)
	4.	Design Requirements
	•	Background: solid black
	•	Typography: bold sans serif, high contrast white text
	•	Minimalist styling with focus on countdown and money raised
	•	Layout should feel mysterious and stripped down (like digital performance art)

Do not add unnecessary pages like blog, about, or contact. Keep it as minimal as possible with only the above elements."

### Code Generation Prompt

> Create a production-ready front-end for ArtPrize2026.com. The site is a minimalist, mostly black, high-contrast experience with very few elements. Framework should be Next.js 14+ with App Router, TypeScript, Tailwind CSS, and Cosmic JS SDK for content. Deploy target is Vercel.

Important note on the countdown date: the user wrote "ArtPrize 2026" but also said "starts September 18, 2025." Use a configurable environment variable for the countdown target. Default it to September 18, 2026 10:00:00 America/Detroit. This can be adjusted instantly via env without code changes.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Cosmic CMS** - Headless content management
- **Vercel** - Deployment platform

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- Cosmic account and bucket
- Vercel account (for deployment)

### Installation

1. Clone this repository
```bash
git clone <your-repo>
cd artprize2026
```

2. Install dependencies
```bash
bun install
```

3. Configure environment variables
```bash
cp .env.example .env.local
```

Edit `.env.local` with your values:
```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
SITE_NAME=ArtPrize2026
COUNTDOWN_TARGET_ISO=2026-09-18T10:00:00-04:00
DONATION_URL=https://venmo.com/u/YourHandle
SUGGESTION_URL=mailto:you@example.com
DISABLE_MANIFESTO_ANIMATIONS=false
```

4. Run the development server
```bash
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## Cosmic SDK Examples

```typescript
// Fetch site settings
const settings = await getSiteSettings()

// Access data with safe defaults
const totalRaised = settings.total_raised || 0
const manifesto = settings.manifesto || 'Default manifesto text'
const countdownDate = settings.countdown_date || process.env.COUNTDOWN_TARGET_ISO
```

## Cosmic CMS Integration

### Required Content Types

1. **Site Settings** (singleton)
   - `countdown_date` (Date)
   - `total_raised` (Number)
   - `manifesto` (Rich Text)
   - `donation_link` (Text)
   - `suggestion_link` (Text)
   - `disclaimer` (Textarea)

2. **Updates** (optional)
   - `title` (Text)
   - `content` (Rich Text)
   - `published_date` (Date)

### Configuration Priority

The app uses this precedence for settings:
1. Cosmic CMS values (highest priority)
2. Environment variables (fallback)
3. Hard-coded defaults (last resort)

This allows instant updates via Cosmic without code changes.

## Deployment Options

### Vercel Deployment

1. Connect your repository to Vercel
2. Configure environment variables in Vercel dashboard:
   - `COSMIC_BUCKET_SLUG`
   - `COSMIC_READ_KEY`
   - `COUNTDOWN_TARGET_ISO`
   - `DONATION_URL`
   - `SUGGESTION_URL`
3. Deploy automatically on push

### Environment Variables Setup

Set these in your deployment platform:

```env
COSMIC_BUCKET_SLUG=artprize2026-production
COSMIC_READ_KEY=your-read-key-here
SITE_NAME=ArtPrize2026
COUNTDOWN_TARGET_ISO=2026-09-18T10:00:00-04:00
DONATION_URL=https://venmo.com/u/artprize2026
SUGGESTION_URL=mailto:whisper@artprize2026.com
DISABLE_MANIFESTO_ANIMATIONS=false
```

The app will gracefully handle missing Cosmic content and fall back to environment variables.

<!-- README_END -->