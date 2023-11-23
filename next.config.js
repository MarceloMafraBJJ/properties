/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{
            hostname: "lh3.googleusercontent.com"
        }, {
            hostname: "reusable-mmm.s3.amazonaws.com"
        }]
    }
}

module.exports = nextConfig
