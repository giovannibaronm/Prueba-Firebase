import "./globals.css";

export const metadata = {
  title: "Hola Firebase",
  description: "Demo full-stack con Next.js, Firebase App Hosting y Firestore",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
