import './globals.css';

export const metadata = {
  title: 'Login System',
  description: 'A basic login system with Next.js, Node.js, and PostgreSQL',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main className="min-h-screen bg-gray-100">
          {children}
        </main>
      </body>
    </html>
  );
}
