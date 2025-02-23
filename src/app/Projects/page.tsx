import Link from "next/link";
import Image from "next/image";

const images = [
  { src: "/images/1.jpg", alt: "My project 1", description: "这是项目1的介绍" },
  { src: "/images/2.jpg", alt: "My project 2", description: "这是项目2的介绍" },
  { src: "/images/3.jpg", alt: "My project 3", description: "这是项目3的介绍" },
  { src: "/images/4.jpg", alt: "My project 4", description: "这是项目4的介绍" }
];

export default function Home() {
  return (
    <div className="flex justify-center items-center  min-h-screen">
      <Link href="/about">
        <div className="grid grid-cols-1 gap-10 gap-y-11 mx-auto md:pt-[80px] md:pb-[50px] pt-[70px] pb-[50px] translate-x-[300px]">
          {images.map((image, index) => (
            <div key={index} className="flex items-center w-full pb-4 border-b border-gray-300 my-8 relative">
              <Image
                src={image.src}
                alt={image.alt}
                width={200}
                height={80}
                className="cursor-pointer rounded-lg shadow-lg hover:opacity-80 transition"
                loading="lazy"
              />
              <div className="ml-6">
                <p className="text-lg font-semibold">{image.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Link>
    </div>

  );
}
