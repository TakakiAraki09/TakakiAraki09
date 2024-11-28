import { Gtm } from '../components/gtm';
import { GoogleAnalytics } from 'theme';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <GoogleAnalytics />
      <body>
        <Gtm />
        {children}
      </body>
    </html>
  );
}
