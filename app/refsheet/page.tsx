import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ref Sheet | Kota Husky',
  description: 'Character reference sheet for Kota Husky',
};

export default function RefSheet() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 p-4">
      <Image
        src="/images/refsheet.png"
        alt="Kota Husky Reference Sheet"
        width={1920}
        height={1080}
        className="max-h-screen w-auto object-contain"
        priority
      />
    </div>
  );
}
