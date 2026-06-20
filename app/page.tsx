import { AmbientOverlay } from "./components/ambient-overlay";
import { HomepageButton } from "./components/homepage-button";
import { SocialIcon } from "./components/social-icon";
import { ProfileCarousel } from "./components/profile-carousel";
import { IconTooltip } from "./components/icon-tooltip";
import { TelegramModal } from "./components/telegram-modal";
import {MapPinIcon} from '@heroicons/react/20/solid'
import { SiApplemusic, SiLetterboxd } from 'react-icons/si'
import packageJson from '../package.json'

export default async function Index() {
  /*
   * Note: The corresponding styles are in the ./index.css file.
   */
  return (
    <div className="relative flex flex-col min-h-screen pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]">
      <div className="fixed inset-0 -z-10 bg-vertical md:bg-horizontal" aria-hidden="true" />
      <AmbientOverlay />
      <div className="relative z-[2] flex flex-col flex-1 items-center mx-6 sm:mx-12 md:mx-24 text-center [text-shadow:_0_1px_4px_rgb(0_0_0_/_0.55)]">
        <ProfileCarousel />
        {/* Identity group: name hugs location */}
        <h1 className="text-3xl font-bold mb-1">Kota Husky</h1>
        <div className="mb-10 flex items-center text-sm text-white/90">
          <MapPinIcon className="mr-1.5 h-4 w-4 flex-shrink-0 text-white/80" aria-hidden="true" />
          <a href="https://maps.app.goo.gl/bnaBxUkmbfWcP6UX8" target="_blank" rel="noreferrer" className="mr-4 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent" aria-label="Southern New Hampshire, USA — view on map">Southern New Hampshire, USA</a>
        </div>
        {/* What I do group: tight cluster of role lines, clear gap before actions */}
        <div className="mb-10 max-w-md space-y-1.5">
          <p className="text-lg text-balance">Tech, CX and Ops enablement for LGBTQ+ events and orgs</p>
          <p className="text-lg text-balance">Fursuit, event, and portrait photographer</p>
          <p className="text-lg text-balance">Founder & CEO of Barks & Rec</p>
        </div>
        <div className="mb-8 max-w-sm grid grid-cols-1 sm:grid-cols-2 gap-x-2 [&>:last-child:nth-child(odd)]:sm:col-span-2 [&>:last-child:nth-child(odd)]:sm:justify-self-center [&>:last-child:nth-child(odd)]:sm:w-[calc(50%-0.25rem)]">
          {/* Temporarily hidden — restore when ready
          <HomepageButton buttonText={"Photo Commission"} href={"https://ko-fi.com/kotahusky/commissions"} />
          <HomepageButton buttonText={"Technique (Soon)"} />
          <HomepageButton buttonText={"Tip"} href={"https://ko-fi.com/kotahusky"} />
          */}
          <HomepageButton buttonText={"Photo Gallery"} href={"https://photos.kota.dog"} />
          <HomepageButton buttonText={"Furtrack"} href={"https://www.furtrack.com/user/KotaHusky/"} />
          <HomepageButton buttonText={"Barks & Rec"} href={"https://bandr.org"} />
        </div>
        <div className="mt-auto mb-8">
          <p className="text-md mb-2">Get to know me at</p>
          <div className="flex items-center space-x-4 text-2xl">
            <IconTooltip label="Bluesky">
              <SocialIcon icon={"fa-brands fa-bluesky"} href={"https://bsky.app/profile/kota.dog"} label="Bluesky" />
            </IconTooltip>
            <IconTooltip label="Telegram">
              <TelegramModal />
            </IconTooltip>
            <IconTooltip label="GitHub">
              <SocialIcon icon={"fa-brands fa-github"} href={"https://github.com/KotaHusky"} label="GitHub" />
            </IconTooltip>
            <IconTooltip label="Python (PyPI)">
              <SocialIcon icon={"fa-brands fa-python"} href={"https://pypi.org/user/KotaHusky/"} label="Python on PyPI" />
            </IconTooltip>
            <IconTooltip label="Letterboxd">
              <a href="https://letterboxd.com/KotaHusky/" target="_blank" rel="noreferrer" className="rounded-sm transition-colors duration-200 ease-in-out hover:text-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent" aria-label="Letterboxd">
                <SiLetterboxd className="inline-block align-middle -translate-y-[4px]" />
              </a>
            </IconTooltip>
            <IconTooltip label="Apple Music">
              <a href="https://music.apple.com/profile/KotaHusky" target="_blank" rel="noreferrer" className="rounded-sm transition-colors duration-200 ease-in-out hover:text-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent" aria-label="Apple Music">
                <SiApplemusic className="inline-block align-middle -translate-y-[4px]" />
              </a>
            </IconTooltip>
            <IconTooltip label="Steam">
              <SocialIcon icon={"fa-brands fa-steam"} href={"https://steamcommunity.com/id/kotahusky"} label="Steam" />
            </IconTooltip>
            <IconTooltip label="LinkedIn">
              <SocialIcon icon={"fa-brands fa-linkedin"} href={"https://www.linkedin.com/in/jtlevesque/"} label="LinkedIn" />
            </IconTooltip>
            {/* <SocialIcon icon={"fa-envelope"} /> TODO: REIMPLEMENT AS FORM */}
          </div>
        </div>
      </div>
      <footer className="relative z-[2] pb-3 pt-4 text-center text-sm text-gray-400 space-y-1">
        <p>
          <a href="https://github.com/KotaHusky/Homepage" target="_blank" rel="noreferrer" className="hover:text-gray-300 transition-colors">
            Made with <span className="text-xs">♥</span> by Kota Husky in NH
          </a>
        </p>
        <p><a href="https://github.com/KotaHusky/Homepage/blob/main/LICENSE" target="_blank" rel="noreferrer" className="hover:text-gray-300 underline decoration-gray-500/50">MIT License</a></p>
        <p>
          {process.env.NODE_ENV === 'production' ? (
            <a href={`https://github.com/KotaHusky/Homepage/releases/tag/v${packageJson.version}`} target="_blank" rel="noreferrer" className="hover:text-gray-300 transition-colors">
              v{packageJson.version}
            </a>
          ) : (
            'local'
          )}
        </p>
      </footer>
    </div>
  );
}
