import "./globals.css";
import { Inter } from 'next/font/google';
import { AuthProvider } from '@/app/context/AuthContext';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata = {
  title: 'CheckMe - Verifica la veracidad',
  description: 'Portal para auditar y verificar la veracidad de respuestas generadas por Inteligencia Artificial. Valida información con la comunidad.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
