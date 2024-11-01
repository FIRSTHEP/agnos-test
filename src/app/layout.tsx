import './globals.css';

export const metadata = {
  title: 'Agnos Home Work',
  description: 'Patient and Staff Management',
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
