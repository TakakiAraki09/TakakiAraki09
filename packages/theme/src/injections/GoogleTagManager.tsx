import React from 'react';
import Script from "next/script";

const TAG_ID = 'GTM-MS7Q6JFP'

export const GoogleTagManager = (tagId: string = TAG_ID) => ({
  Script: () => (
      <Script>
        {`
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${tagId ?? TAG_ID}');
        `}
      </Script>
  ),
  NoScript: () => (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${tagId}`}
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
      ></iframe>
    </noscript>
  )
});

