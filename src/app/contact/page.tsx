// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea"; // 如果你希望有多行文本的输入框
import Link from "next/link";
import Image from "next/image";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";

export default function InputWithButton() {
  return (
    <div className="flex w-full justify-center items-center min-h-screen">
      <div className="flex flex-col justify-center items-center space-y-6">
        <h1 className="scroll-m-20 text-3xl font-normal italic tracking-tight">
          Contact
        </h1>
        <Input
          type="text"
          placeholder="Email"
          className="w-96 h-12"
        />

        <Input
          type="text"
          placeholder="Name"
          className="w-96 h-12"
        />

        <Input
          type="text"
          placeholder="Subject"
          className="w-96 h-12"
        />

        <Textarea
          placeholder="Message"
          className="w-96 h-32"
        />
        <Button type="submit">Send</Button>
      </div>
    </div>
  );
}
