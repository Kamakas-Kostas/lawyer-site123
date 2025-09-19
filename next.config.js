/** @type {import('next').NextConfig} */
module.exports = {
  i18n: {
    locales: ['el', 'en', 'de'],
    defaultLocale: 'el',
    localeDetection: true, // μπορείς και false αν θες να μην κάνει detect αυτόματα
  },
};
