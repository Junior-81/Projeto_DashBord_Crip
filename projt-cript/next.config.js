/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone', // Otimiza para deploy na Vercel
  images: {
    domains: [], // Adicione domínios externos de imagens se necessário
    unoptimized: true // Ajuda com problemas de imagens estáticas
  }
};

module.exports = nextConfig;
