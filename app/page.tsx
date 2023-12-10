import { HomepageButton, SocialIcon } from "@homepage/ui";
import Image from "next/image";

export default async function Index() {
  /*
   * Note: The corresponding styles are in the ./index.css file.
   */
  return (
    <div className="bg-vertical md:bg-horizontal">
      <div className="flex flex-col items-center mx-24 text-center">
        <div className="my-8">
          <Image src="/images/kota.png" alt="Profile Picture" className="w-64 h-64 rounded-full" width={256} height={256} />
        </div>
        <h1 className="text-3xl font-bold mb-4">Kota Husky</h1>
        <div className="mb-2">
          <p className="text-lg mb-2">Digital & cloud enablement for events</p>
          <p className="text-lg mb-2">Event and portrait photographer</p>
          <p className="text-lg mb-2">Founder of Barks & Rec</p>
        </div>
        <div className="mb-8">
          <p>⛷️ 🎮 🎧 🍿 🍜</p>
        </div>
        <div className="mb-8">
          <HomepageButton className="w-full mb-4" buttonText={"Photo Commission"} />
          <HomepageButton className="w-full mb-4" buttonText={"Pricing"} />
          <HomepageButton className="w-full mb-4" buttonText={"Tip"} />
          <HomepageButton className="w-full mb-4" buttonText={"Photo Gallery"} />
          <HomepageButton className="w-full mb-4" buttonText={"Furtrack"} />
          <HomepageButton className="w-full mb-4" buttonText={"Barks & Rec"} />
        </div>
        <div className="mb-8">
          <SocialIcon icon={"fa-github"} text={"test"} />
          <SocialIcon icon={"fa-cloud"} />
          <SocialIcon icon={"fa-envelope"} />
          <SocialIcon icon={"fa-paperplane"} />
          <SocialIcon icon={"fa-python"} />
        </div>
      </div>
    </div>
  );
}
