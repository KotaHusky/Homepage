import { HomepageButton } from "./components/homepage-button";
import { SocialIcon } from "./components/social-icon";
import Image from 'next/image';
import {MapPinIcon} from '@heroicons/react/20/solid'

export default async function Index() {
  /*
   * Note: The corresponding styles are in the ./index.css file.
   */
  return (
    <div className="flex flex-col min-h-screen bg-vertical md:bg-horizontal">
      <div className="flex flex-col flex-1 items-center mx-24 text-center">
        <div className="my-8">
          <Image src="/images/kota.png" alt="Profile Picture" width={256} height={256} className="w-32 h-32 md:w-64 md:h-64 rounded-full" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Kota Husky</h1>
        <div className="mb-4 flex items-center text-sm text-gray-500">
          <MapPinIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
          <a href="https://maps.app.goo.gl/bnaBxUkmbfWcP6UX8" target="_blank" className="mr-4" >New England, USA</a>
        </div>
        <div className="mb-2">
          <p className="text-lg mb-2">Digital & cloud enablement for LGBT+ events</p>
          <p className="text-lg mb-2">Event and portrait photographer</p>
          <p className="text-lg mb-2">Founder of Barks & Rec</p>
        </div>
        <div className="mb-8 bg-black bg-opacity-50 rounded-lg p-2 space-x-2">
          <span>⛷️</span>
          <span>🎮</span>
          <span>🎧</span>
          <span>🍿</span>
          <span>🍜</span>
        </div>
        <div className="mb-8 max-w-sm columns-1 sm:columns-2">
          <HomepageButton buttonText={"Photo Commission"} href={"https://ko-fi.com/kotahusky/commissions"} />
          <HomepageButton buttonText={"Technique (Soon)"} />
          <HomepageButton buttonText={"Tip"} href={"https://ko-fi.com/kotahusky"} />
          <HomepageButton buttonText={"Photo Gallery"} href={"https://photos.kota.dog"} />
          <HomepageButton buttonText={"Furtrack"} href={"https://www.furtrack.com/user/KotaHusky/"} />
          <HomepageButton buttonText={"Barks & Rec"} href={"https://bandr.org"} />
        </div>
        <div className="mt-auto mb-8">
          <p className="text-md mb-2">Find me at</p>
          <div className="flex space-x-4 text-2xl">
            <SocialIcon icon={"fa-brands fa-github"} href={"https://github.com/KotaHusky"} />
            <SocialIcon icon={"fa-brands fa-python"} href={"https://pypi.org/user/KotaHusky/"} />
            <SocialIcon icon={"fa-brands fa-bluesky"} href={"https://bsky.app/profile/kota.dog"} />
            <SocialIcon icon={"fa-brands fa-telegram"} href={"https://t.me/KotaHusky"} />
            {/* <SocialIcon icon={"fa-envelope"} /> TODO: REIMPLEMENT AS FORM */}
          </div>
        </div>
      </div>
    </div>
  );
}
