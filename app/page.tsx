import { HomepageButton } from "@homepage/ui";

export default async function Index() {
  /*
   * Note: The corresponding styles are in the ./index.css file.
   */
  return (
    <div className="flex flex-col items-center">
      <HomepageButton className="w-full mb-4" buttonText={"Photo Commission"} />
      <HomepageButton className="w-full mb-4" buttonText={"Pricing"} />
      <HomepageButton className="w-full mb-4" buttonText={"Tip"} />
      <HomepageButton className="w-full mb-4" buttonText={"Photo Gallery"} />
      <HomepageButton className="w-full mb-4" buttonText={"Furtrack"} />
      <HomepageButton className="w-full mb-4" buttonText={"Barks & Rec"} />
    </div>
  );
}
