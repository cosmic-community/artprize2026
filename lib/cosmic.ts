import { createBucketClient } from '@cosmicjs/sdk'
import { SiteSettings, SiteConfig } from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
})

// Server-side client for write operations
export const cosmicWrite = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

export async function getSiteSettings(): Promise<SiteConfig> {
  const defaults: SiteConfig = {
    countdown_date: process.env.COUNTDOWN_TARGET_ISO || '2026-09-18T10:00:00-04:00',
    total_raised: 0,
    manifesto: '<h1>THE EXPERIMENT</h1><p>A digital performance piece exploring the space between intention and chaos.</p>',
    donation_link: process.env.DONATION_URL || 'https://venmo.com/artprize2026',
    suggestion_link: process.env.SUGGESTION_URL || 'mailto:whisper@artprize2026.com',
    disclaimer: 'This is an art project for entertainment purposes only. The final use of the money will be dictated solely by the ownership of this piece.'
  }

  try {
    const response = await cosmic.objects
      .find({ type: 'site-settings' })
      .props(['id', 'title', 'metadata'])
      .depth(1)

    if (response.objects.length === 0) {
      console.log('No Site Settings found in Cosmic - using environment defaults')
      return defaults
    }

    const settings = response.objects[0] as SiteSettings
    
    return {
      countdown_date: settings.metadata?.countdown_date || defaults.countdown_date,
      total_raised: settings.metadata?.total_raised || defaults.total_raised,
      manifesto: settings.metadata?.manifesto || defaults.manifesto,
      donation_link: settings.metadata?.donation_link || defaults.donation_link,
      suggestion_link: settings.metadata?.suggestion_link || defaults.suggestion_link,
      disclaimer: settings.metadata?.disclaimer || defaults.disclaimer
    }
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      console.log('Site Settings not found in Cosmic - using environment defaults')
      return defaults
    }
    console.error('Error fetching site settings:', error)
    return defaults
  }
}

export async function submitIdea(idea: string): Promise<boolean> {
  try {
    await cosmicWrite.objects.insertOne({
      title: `Idea submitted on ${new Date().toLocaleDateString()}`,
      type: 'ideas',
      metadata: {
        idea: idea,
        submitted_date: new Date().toISOString().split('T')[0]
      }
    })
    return true
  } catch (error) {
    console.error('Error submitting idea:', error)
    return false
  }
}