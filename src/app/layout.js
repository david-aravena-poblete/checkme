import "./globals.css";
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata = {
  title: 'CheckMe - Verifica la veracidad',
  description: 'Portal para verificar la veracidad de respuestas e información. Publica tus dudas y recibe respuestas de la comunidad.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
