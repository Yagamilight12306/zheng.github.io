import Link from "next/link";
import Image from "next/image";

const images = [
  {
    src: "/g design/1.jpg",
    alt: "My project 1",
    description: "地域活性化による旧劇場再生プロジェクト",
    extraDedcription: "The renovation project of the old theater site",
    href: "/portfolio"
  },
  {
    src: "/images/2.jpg",
    alt: "My project 2",
    description: "这是项目2的介绍",
    extraDedcription: "这是额外的描述文本",
    href: "作品2"
  },
  {
    src: "/images/3.jpg",
    alt: "My project 3",
    description: "这是项目3的介绍",
    extraDedcription: "这是额外的描述文本",
    href: "作品3"
  },
  {
    src: "/images/4.jpg",
    alt: "My project 4",
    description: "这是项目4的介绍",
    extraDedcription: "这是额外的描述文本",
    href: "作品4"
  }
];

export default function Home() {
  return (
    <div className="flex justify-center w-full">
      <div className="w-full flex flex-col px-4 md:px-12">
        {images.map((image, index) => (
          <div
            key={index}
            className="flex items-center pb-4 border-b border-gray-300 my-8 relative"
          >
            <Link href={image.href}>
              <Image
                src={image.src}
                alt={image.alt}
                width={200}
                height={80}
                className="cursor-pointer rounded-lg shadow-lg hover:opacity-80 transition"
                loading={index === 0 ? "eager" : "lazy"}
                priority={index === 0}
                quality={80}
                sizes="200px"
              />
            </Link>
            <div className="flex-1 ml-6">
              <p className="text-lg font-semibold text-gray-900 dark:text-white">{image.description}</p>
              <p className="text-sm mt-2 text-gray-600 dark:text-gray-400">{image.extraDedcription}</p>
            </div>
          </div>
        ))}
      </div>
    </div >

  );
}
