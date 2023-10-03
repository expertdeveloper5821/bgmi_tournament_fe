import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    theme_color: '#003554',
    background_color: '#003554',
    display: 'standalone',
    scope: '/',
    start_url: '/',
    name: 'Pattseheadshot',
    short_name: 'Pattseheadshot',
    icons: [
      {
        src: '/assests/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/assets/icon-256x256.png',
        sizes: '256x256',
        type: 'image/png',
      },
      {
        src: '/assets/icon-384x384.png',
        sizes: '384x384',
        type: 'image/png',
      },
      {
        src: '/assets/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
