import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Roblox Medical MDT',
  description: 'Medical helper dashboard for Roblox hospital roleplay.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
