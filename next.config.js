/** @type {import('next').NextConfig} */
const nextConfig = {
  // 图片优化配置
  images: {
    // 图片格式优化
    formats: ['image/avif', 'image/webp'],
    // 设备尺寸断点
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // 图片尺寸
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // 最小化图片质量（平衡质量和文件大小）
    minimumCacheTTL: 60,
  },
}

module.exports = nextConfig
