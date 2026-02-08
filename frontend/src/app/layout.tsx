import "./globals.css";
import { Footer, Header } from "@/components/layout";

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
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
