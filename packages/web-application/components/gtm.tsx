"use client"
import React from 'react';
import { GoogleTagManager } from "theme";

export const Gtm = () => {
  const Tag = GoogleTagManager();
  return (
    <>
      <Tag.Script type="text/partytown" />
      <Tag.NoScript />
    </>
  );
}
