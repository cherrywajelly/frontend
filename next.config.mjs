import withBundleAnalyzer from '@next/bundle-analyzer';

import withPWA from 'next-pwa';

const imgHostName = process.env.NEXT_PUBLIC_IMAGE_HOSTNAME;

const isAnalyze = process.env.ANALYZE === 'true';

const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: imgHostName,
      },
    ],
  },
  output: 'standalone',
  async headers() {
    return [
      {
        source: '/_next/image(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, max-age=0, must-revalidate',
          },
        ],
      },
    ];
  },
};

const withPlugins = (plugins, config) => {
  return plugins.reduce((acc, plugin) => plugin(acc), config);
};

export default withPlugins(
  [
    withPWA({ dest: 'public' }),
    isAnalyze ? withBundleAnalyzer({ enabled: true }) : (config) => config,
  ],
  nextConfig,
);
