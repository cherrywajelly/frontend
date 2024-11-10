import withPWA from 'next-pwa';

const imgHostName = process.env.NEXT_PUBLIC_IMAGE_HOSTNAME;

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
};

const config = withPWA({
  dest: 'public',
})(nextConfig);

export default config;
