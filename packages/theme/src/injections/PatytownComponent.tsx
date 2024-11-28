import { Partytown } from '@builder.io/partytown/react';
import React, { Fragment } from 'react';

const TAG_ID = 'GTM-MS7Q6JFP';

const createUrl = (tagId?: string) =>
  `https://www.googletagmanager.com/gtm.js?id=${tagId ?? TAG_ID}`;

// TODO: Datalayerは命名変更できる。 l=で定義可能
const createTag = () => `
window['dataLayer'] = window['dataLayer'] || [];
window['dataLayer'].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
console.log('hello');
`;

export const PartytownGtm = (props: { tagId?: string }) => {
  return (
    <Fragment>
      <script
        type="text/partytown"
        async
        src={createUrl(props.tagId)}
        dangerouslySetInnerHTML={{ __html: createTag() }}
        defer
      />
      <Partytown
        forward={['dataLayer.push']}
        lib="/TakakiAraki09/~partytown/"
      />
    </Fragment>
  );
};
