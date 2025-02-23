//作业
//homepage的可以加ts类型的部分加ts
//完成个人网页homepage制作部分 -> 不用完全做完 但有进程的更新
//画家居网页项目的图 -> 草图 -> 作品目前也更多是展示 -> 深刻的分析和功能研究留给修士
//研究计划书

//figma -> 画原型图
//markdown -> 编程的方式写格式笔记
//react的icon库 svg图
//原型图片剪裁
//shadCN -> UI库
//github -> 代码仓库 版本管理 -> ci/cd自动版本更新 -> 挂网页

//Typescript -> 愈发
//转译 -> tsc -> 不用管他 -> 做项目的时候next/react的bundle -> 自动转移
//bundle -> 自带转译器的 项目执行的时候 tsx自动转译成js 不用自己特别设置
//interface和type的问题

//string number boolean arr obj interface type

//any unknown -> any不要用！！！ unknown -> any永远都不会爆错 就算以后类型出错 any也不会报错
//unknown 是在不知道 还没确定类型的时候使用

//null和undefined？

//never和void -> 函数不需要的return的时候 用void
const noReturn = (a: number): void => {
  console.log(a);
};

//闭包函数不需要返回值 -> void
let num: number = 1;
function add(): void {
  num += 2;
}

//never不可能的值 也是不需要返回值 -> 测试可能会用？？标注一些错误的部分 用never
// function impossibleCase(value: number): never {
//   if (value > 0) {
//     throw new Error("Positive number");
//   }
//   //return value;
// }

const obj2: unknown = {
  name: "jack",
  age: 17,
  job: "teacher",
  married: true,
  gender: "man",
};

interface Iobj {
  name: string;
  age: number;
  job: string;
  married: boolean;
}

interface Iobj2 extends Iobj {
  gender: string;
}

const obj: Iobj2 = {
  name: "jack",
  age: 17,
  job: "teacher",
  married: true,
  gender: "man",
};

//type和interface的区别
//interface是可以从其他的interface继承的 type不可以
//type一般是定义非obj的时候用的

type TArr = ["1", "2", "3"];
const arr: TArr = ["1", "2", "3"];

type TDate = "monday" | "sunday" | "friday";
const date: TDate = "friday";

type Ta = number | boolean;
type Tb = string | "job";
type Tc = Ta | Tb;

const d: Tc = "job";

//函数和行参的ts类型定义
const a = (a: number, b: string): number => {
  return Number(a + b);
};

//泛型 -> T是自由的
function b<T>(a: T): T {
  console.log(a);
  return a;
}

//b<number>("2"); //string报错
b<number>(2);
b<boolean>(true);

// 使用类型断言
const typedObj = obj2 as Iobj2;
console.log(typedObj.name); // 现在可以安全访问

// 或者使用类型守卫
if (typeof obj2 === "object" && obj2 !== null) {
  // 做更详细的类型检查...
}
