/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: "/api/:path*",
                destination: "http://baghchal-api.onrender.com/:path*",
            },
        ];
    },
};

export default nextConfig;