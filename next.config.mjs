import * as dotenv from 'dotenv'
dotenv.config()

/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        ignoreBuildErrors: true
    },
    //output: 'export',
    images: {
        unoptimized: true
    },
    env:{
        NEXT_PUBLIC_GEMINI_API_KEY: process.env.NEXT_PUBLIC_GEMINI_API_KEY
    }
};

export default nextConfig;
