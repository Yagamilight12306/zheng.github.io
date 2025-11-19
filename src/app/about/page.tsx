import React from "react";
import Image from "next/image";

//Router 网站的路有

export default function About() {
  return (

    <div className="w-full">
      <div className="flex justify-center space-x-16 p-6">
        <div className="">
          <div className="">
            {/* 头像图片 */}
            <Image
              src="/images/My image2.png"
              alt="My Image"
              width={160}
              height={70}
              className="rounded-full"
              priority // 首屏头像优先加载
            />
          </div>


          {/* 个人信息 */}
          <div className="text-justify items-center mt-4">
            <h1 className="text-[15px] font-light">ZHENG MINGCHENG</h1>
            <small className="text-center font-light italic">郑铭诚</small>
          </div>
        </div>
        {/* 自我介绍文本 */}
        <div className=" max-w-xl text-left ">
          <p className="text-[13px]">
            曾从事于室内设计行业，因为WebApp技术因其只需通过网络浏览器访问，而无需依赖本地操作系统或安装软件的便利性从而踏入WebApp领域的开发者，
            专注于为打破客户与设计师之间的交流困难问题进行 Web 开发和用户体验设计，希望为当前行业提供一份内容分析报告和解决方案。
          </p>
          <p className="text-[13px] mt-8">
            I have previously worked in the interior design industry and transitioned into the field of WebApp development
            due to the convenience of WebApp technology, which only requires access through a web browser and doesn&apos;t depend
            on the local operating system or the installation of software. I specialize in web development and user experience
            design, aiming to break the communication barriers between clients and designers. My goal is to provide an industry
            analysis report and solutions for the current challenges.
          </p>
          <h1 className="text-[10px] md:pt-[10px] md:pb-[20px] pt-[20px] pb-[10px]">
            主要奖项
          </h1>
          <div className="max-w-xs text-[10px] mt-1">
            <p>1.xxxxxxxx</p>
            <p>2.xxxxxxxx</p>
            <p>3.xxxxxxxx</p>
            <p>4.xxxxxxxx</p>
          </div>
        </div>
      </div>
    </div>

  );
}