import React from 'react';

// not ideal, but keeps safari ios toolbar from hidding bottom of card
// https://stackoverflow.com/questions/3007480/determine-if-user-navigated-from-mobile-safari/29696509#29696509
export function isSafariIOS() {
  const ua = window.navigator.userAgent;
  const iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i);
  const webkit = !!ua.match(/WebKit/i);
  return iOS && webkit && !ua.match(/CriOS/i);
}

export function resizeText(text) {
  const { length } = text;
  let size;
  if (length < 400) size = 19;
  if (length > 400 && length < 600) size = 16;
  if (length > 600 && length < 800) size = 14;
  if (length > 800) size = 12;
  return <p style={{ fontSize: `${size}px` }}>{text}</p>;
}
