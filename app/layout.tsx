import './global.css';

export const metadata = {
  title: 'Kota Husky',
  description: 'Event and portrait photographer | Convention and community event organizer | Founder of Barks & Rec',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
