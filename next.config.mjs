/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: process.env.GOOGLE_IMAGE_SRC,
            },
            {
                hostname: "codecaviar.s3.amazonaws.com"
            }
        ]
    }
};

export default nextConfig;
