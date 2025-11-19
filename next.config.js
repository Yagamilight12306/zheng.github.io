/** @type {import('next').NextConfig} */
const nextConfig = {
  // 图片优化配置
  images: {
    // 图片格式优化（优先使用 AVIF，然后是 WebP）
    formats: ['image/avif', 'image/webp'],
    // 设备尺寸断点（响应式图片）
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    // 图片尺寸（小尺寸优化）
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // 缓存时间（秒）
    minimumCacheTTL: 31536000, // 1年
    // 图片域名（如果需要外部图片）
    remotePatterns: [],
    // 禁用未优化的图片警告（开发环境）
    unoptimized: false,
  },
}

module.exports = nextConfig
