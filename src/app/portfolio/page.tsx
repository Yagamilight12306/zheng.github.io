'use client';
import { useState } from "react";
import Image from "next/image";

// 生成 g design 文件夹下的所有图片（1.jpg 到 76.jpg）
type PortfolioImage = { src: string; alt: string };
const generatePortfolioImages = (): PortfolioImage[] => {
  const images: PortfolioImage[] = [];
  for (let i = 1; i <= 76; i++) {
    images[i - 1] = {
      src: `/g design/${i}.jpg`,
      alt: `Image ${i}`,
    };
  }
  return images;
};

const portfolioImages = generatePortfolioImages();

export default function Portfolio() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const openModal = (index: number) => {
    setSelectedImage(index);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % portfolioImages.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + portfolioImages.length) % portfolioImages.length);
    }
  };

  return (
    <div className="flex justify-center w-full min-h-screen bg-gray-50 dark:bg-black">
      <div className="w-full px-4 md:px-12 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">地域活性化による旧劇場再生プロジェクト</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {portfolioImages.map((item, index) => (
            <div
              key={index}
              onClick={() => openModal(index)}
              className="group relative overflow-hidden rounded-lg shadow-lg dark:shadow-black hover:shadow-xl dark:hover:shadow-black transition-all duration-300 cursor-pointer bg-white dark:bg-black"
            >
              <div className="w-full h-64 overflow-hidden bg-gray-200 dark:bg-gray-900">
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={400}
                  height={300}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  loading={index < 4 ? "eager" : "lazy"}
                  priority={index < 4}
                  quality={80}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                />
              </div>
            </div>
          ))}
        </div>

        {/* 图片查看模态框 */}
        {selectedImage !== null && (
          <div
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <div className="relative max-w-7xl max-h-full">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  closeModal();
                }}
                className="absolute top-4 right-4 text-white text-4xl font-bold hover:text-gray-300 z-10"
              >
                ×
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-4xl font-bold hover:text-gray-300 z-10"
              >
                ‹
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-4xl font-bold hover:text-gray-300 z-10"
              >
                ›
              </button>
              <div onClick={(e) => e.stopPropagation()}>
                <Image
                  src={portfolioImages[selectedImage].src}
                  alt={portfolioImages[selectedImage].alt}
                  width={1200}
                  height={800}
                  className="max-w-full max-h-[90vh] object-contain"
                  priority
                  quality={90}
                  sizes="100vw"
                />
              </div>
              <p className="text-white text-center mt-4 text-xl">
                {selectedImage + 1} / {portfolioImages.length}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

