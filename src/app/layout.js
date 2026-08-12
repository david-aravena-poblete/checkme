import "./globals.css";

export const metadata = {
  title: "David Aravena programador",
  description: "Programador con IA como asistente",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
