import { getSiteSettings } from '@/lib/cosmic'
import { parseTargetDate } from '@/lib/time'
import Countdown from '@/components/Countdown'
import TotalRaised from '@/components/TotalRaised'
import PrimaryLink from '@/components/PrimaryLink'
import ManifestoModal from '@/components/ManifestoModal'
import IdeaModal from '@/components/IdeaModal'
import Disclaimer from '@/components/Disclaimer'

export const revalidate = 60 // Revalidate every minute

export default async function MainPage() {
  const settings = await getSiteSettings()
  const targetDate = parseTargetDate(settings.countdown_date)

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-4xl mx-auto text-center space-y-12">
          {/* Site Title */}
          <div>
            <h1 className="text-xs uppercase tracking-[0.3em] text-gray-300 font-light">
              {process.env.SITE_NAME || 'ArtPrize2026'}
            </h1>
          </div>

          {/* Countdown Timer */}
          <div className="space-y-4">
            <Countdown targetDate={targetDate} />
          </div>

          {/* Total Raised */}
          <div className="space-y-2">
            <p className="text-sm uppercase tracking-wide text-gray-300 font-light">
              Raised so far
            </p>
            <TotalRaised amount={settings.total_raised} />
          </div>

          {/* Primary Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-12 pt-8">
            <ManifestoModal manifesto={settings.manifesto} />
            
            <PrimaryLink 
              href={settings.donation_link}
              external
              className="hover:scale-105 transition-transform duration-200"
            >
              Fuel the Experiment
            </PrimaryLink>
            
            <IdeaModal>
              <div className="text-lg font-light underline decoration-1 underline-offset-4 hover:no-underline transition-all duration-200 focus-ring cursor-help">
                Whisper Your Ideas
              </div>
            </IdeaModal>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="pb-8 px-4">
        <Disclaimer text={settings.disclaimer} />
      </footer>
    </div>
  )
}