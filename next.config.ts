import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        config.resolve.alias['@'] = path.join(process.cwd(), 'src');
        return config;
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
            },
        ],
        qualities: [65],
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    experimental: {
        optimizePackageImports: [
            'lucide-react',
            'date-fns',
            'framer-motion',
            'gsap',
            '@headlessui/react',
            '@heroicons/react',
        ],
        serverActions: {
            bodySizeLimit: '2mb',
        },
    },
};

export default nextConfig;
