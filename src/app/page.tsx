import NavBar from "@/components/NavBar";
import React from "react";
import Image from "next/image"; // 导入 Image 组件
import {
  Bot,
  Facebook,
  Link as LinkIcon,
  Mail,
  Twitter,
  Youtube,
} from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <div className="w-full">
        {/* p-数字 和 p-[数字px]的区别 -> p-数字是响应式设计 p-[数字px]不是响应式设计 md sm lg */}
        {/* md: 的意思 是浏览器尺寸>= md的尺寸的时候 才会应用的布局 */}
        <div className="flex justify-center md:pt-[80px] md:pb-[50px] pt-[70px] pb-[50px] ">
          <Image
            src="/images/my-image.png"
            alt="My Image"
            width={300}
            height={180}
            loading="lazy" // 懒加载webApp 性能优化 -> 只有使用和显示的时候才加载
          />
        </div>
        <div className="" id="自我介绍">
          <div className="flex justify-center py-2">
            <h3 className="scroll-m-20 text-2xl font-semibold italic tracking-tight">
              Mingcheng Zheng
            </h3>
          </div>
          <div className="flex justify-center py-2">
            <small className="text-sm font-bold italic leading-none">
              Learning Javascript
            </small>
          </div>
          <div className="flex justify-center py-2">
            <small className="text-sm font-bold italic leading-none">
              Interior designer
            </small>
          </div>
          <div className="flex justify-center py-2">
            <small className="text-sm font-bold italic leading-none">
              (i am a fitness xxxxxx)
            </small>
          </div>
        </div>
        <div className="flex justify-center md:pt-[50px] pt-[30px]">
          <div className="flex justify-start space-x-6">
            <Link
              href="https://youtube.com/your-channel"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-red-500 transition-colors"
            >
              <Youtube size={24} />
            </Link>
            <Link
              href="https://facebook.com/your-profile"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              <Facebook size={24} />
            </Link>
            <Link
              href="https://twitter.com/your-profile"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-400 transition-colors"
            >
              <Twitter size={24} />
            </Link>
            <Link
              href="mailto:your-email@example.com"
              className="text-gray-600 hover:text-green-500 transition-colors"
            >
              <Mail size={24} />
            </Link>
            <Link
              href="/chatbot"
              className="text-gray-600 hover:text-purple-500 transition-colors"
            >
              <Bot size={24} />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
