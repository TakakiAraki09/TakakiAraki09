import { PartytownGtm } from './PatytownComponent';
import Script from 'next/script';
import React, { Fragment, useId } from 'react';

const TAG_ID = 'GTM-MS7Q6JFP';

const createUrl = (tagId?: string) =>
  `https://www.googletagmanager.com/gtm.js?id=${tagId ?? TAG_ID}`;

// TODO: Datalayerは命名変更できる。 l=で定義可能
const createTag = () => `
window['dataLayer'] = window['dataLayer'] || [];
window['dataLayer'].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
console.log('hello');
`;

// <script type={props.type} async src={createUrl(tagId)} defer dangerouslySetInnerHTML={{ __html: createTag() }} />
export const GoogleTagManager = {
  Script: (props: { type?: 'text/partytown' }) => {
    const id = useId();
    if (props.type === 'text/partytown') {
      return <PartytownGtm tagId={TAG_ID} />;
    }

    return (
      <Fragment key={id}>
        <Script src={createUrl(TAG_ID)} defer>
          {createTag()}
        </Script>
      </Fragment>
    );
  },
  NoScript: () => (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${TAG_ID}`}
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
      ></iframe>
    </noscript>
  ),
};
