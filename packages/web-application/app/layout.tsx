import { GoogleAnalytics } from "theme";
import { Gtm } from "../components/gtm";


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
