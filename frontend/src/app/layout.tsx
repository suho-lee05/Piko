import "./globals.css";

export const metadata = {
  title: "Piko Mall",
  description: "Shopping mall frontend",
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ko">
      <body>
        <header>
          <h1>Piko Mall</h1>
        </header>
        <main>{children}</main>
        <footer>
          <small>© Piko Mall</small>
        </footer>
      </body>
    </html>
  );
}
