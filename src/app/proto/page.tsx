import React from "react";
import { CardWithForm } from "../../components/CardWithForm";

export default function Proto() {
  return (
    <div className="flex justify-center items-center min-h-screen w-full">
      <div className="flex flex-col items-center space-y-4">
        <div className="text-2xl font-bold">Proto</div>
        <CardWithForm />
      </div>
    </div>
  );
}
