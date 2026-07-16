/** @type {import('next').NextConfig} */
const nextConfig = {
   allowedDevOrigins: [
    "192.168.100.149",
  ],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
       {
      protocol: "https",
      hostname: "img.icons8.com",
    },
    ],
  },
};

export default nextConfig;