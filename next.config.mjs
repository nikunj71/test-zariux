const nextConfig = {
  reactStrictMode: false,
  eslint: {
    // Warning: This allows production builds to complete even if
    // there are ESLint errors. Use this setting with caution.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
