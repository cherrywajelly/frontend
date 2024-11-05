import withPWA from 'next-pwa';

const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: `axmpikvsv3z9.objectstorage.ap-chuncheon-1.oci.customer-oci.com`,
      },
    ],
  },
  output: 'standalone',
};

const config = withPWA({
  dest: 'public',
})(nextConfig);

export default config;
