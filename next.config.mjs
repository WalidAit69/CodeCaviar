/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
            {
                hostname:process.env.GOOGLE_IMAGE_SRC
            }
        ]
    }
};

export default nextConfig;
