import createNextIntlPlugin from 'next-intl/plugin';
 
const withNextIntl = createNextIntlPlugin();
 
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'no92j5icnhwow1sp.public.blob.vercel-storage.com',
      },
    ],
  },
};
 
export default withNextIntl(nextConfig);