import { lusitana, montserrat } from './ui/fonts';
import './ui/global.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.className} ${lusitana.className} antialiased`}
      >
        {children}
        <footer className="flex h-20 items-center justify-center bg-gray-100">
          NextJS 14 Vercel
        </footer>
      </body>
    </html>
  );
}
