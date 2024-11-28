import Script from 'next/script';
import React from 'react';

const TAG_ID = 'G-QLEQQ4K0K1';

export const GoogleAnalytics = (props: { tagId?: string }) => {
  return (
    <>
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${props.tagId || TAG_ID}`}
      />
      <Script>
        {`
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${props.tagId ?? TAG_ID}');
`}
      </Script>
    </>
  );
};
