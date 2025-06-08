import nextPwa from 'next-pwa';

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    turbo: false
};

export default nextPwa({
     dest: 'public',
     register: true,
     skipWaiting: true,
    })(nextConfig);
