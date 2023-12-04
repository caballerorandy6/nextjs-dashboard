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
          Hecho con amor por la gente de Vercel
        </footer>
      </body>
    </html>
  );
}
