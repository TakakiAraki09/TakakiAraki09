import React from 'react';

const TAG_ID = 'G-QLEQQ4K0K1';

export const GoogleAnalytics = (props: { tagId?: string }) => {
  return (
    <>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${props.tagId || TAG_ID}`}
      />
      <script>
        {`
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${props.tagId ?? TAG_ID}');
`}
      </script>
    </>
  );
};
