import { GoogleAnalytics, GoogleTagManager } from "theme";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const Tag = GoogleTagManager();
  return (
    <html lang="ja">
      <GoogleAnalytics />
      <Tag.Script />
      <body>
        <Tag.NoScript />
        {children}
      </body>
    </html>
  );
}
