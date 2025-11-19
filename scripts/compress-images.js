const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// 配置
const MAX_SIZE_KB = 500; // 目标大小（KB）
const INPUT_DIR = path.join(__dirname, '../public/g design');
const OUTPUT_DIR = path.join(__dirname, '../public/g design/compressed');

// 确保输出目录存在
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// 压缩单张图片
async function compressImage(inputPath, outputPath) {
  try {
    const stats = fs.statSync(inputPath);
    const sizeKB = stats.size / 1024;
    
    console.log(`处理: ${path.basename(inputPath)} (${sizeKB.toFixed(2)} KB)`);
    
    // 如果已经小于目标大小，直接复制
    if (sizeKB <= MAX_SIZE_KB) {
      fs.copyFileSync(inputPath, outputPath);
      console.log(`  ✓ 已小于 ${MAX_SIZE_KB}KB，直接复制`);
      return;
    }
    
    // 读取图片信息
    const metadata = await sharp(inputPath).metadata();
    
    // 尝试不同的质量值
    let quality = 85;
    let currentSize = sizeKB;
    
    while (currentSize > MAX_SIZE_KB && quality > 20) {
      await sharp(inputPath)
        .jpeg({ quality, mozjpeg: true })
        .toFile(outputPath);
      
      const newStats = fs.statSync(outputPath);
      currentSize = newStats.size / 1024;
      
      if (currentSize > MAX_SIZE_KB) {
        quality -= 10;
      }
    }
    
    console.log(`  ✓ 压缩完成: ${currentSize.toFixed(2)} KB (质量: ${quality})`);
  } catch (error) {
    console.error(`  ✗ 错误: ${error.message}`);
  }
}

// 批量处理
async function compressAllImages() {
  const files = fs.readdirSync(INPUT_DIR);
  const imageFiles = files.filter(file => 
    /\.(jpg|jpeg|png)$/i.test(file)
  );
  
  console.log(`找到 ${imageFiles.length} 张图片\n`);
  
  for (const file of imageFiles) {
    const inputPath = path.join(INPUT_DIR, file);
    const outputPath = path.join(OUTPUT_DIR, file);
    await compressImage(inputPath, outputPath);
  }
  
  console.log('\n✓ 所有图片处理完成！');
}

// 运行
compressAllImages().catch(console.error);

