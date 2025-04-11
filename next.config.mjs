/** @type {import('next').NextConfig} */
const nextConfig = {
    // added to allow external images to be displayed
    images: {
        remotePatterns: [
            {
                protocol: 'https', // Pexels uses HTTPS
                hostname: 'images.pexels.com', // The domain you were allowing
                port: '', // Leave empty for default port (443 for HTTPS)
                pathname: '/**', // Allow all paths under this domain
            },
        ],
    },
};

export default nextConfig;