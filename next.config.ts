/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // ✅ Allow your ngrok domain
   allowedDevOrigins: [process.env.NEXT_PUBLIC_WEBAPP_URL],

  },
};

export default nextConfig;
