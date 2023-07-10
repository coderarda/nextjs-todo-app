import { AddIcon } from "@/components/AddIcon";
import { TodoInterface } from "@/components/TodoInterface";
import { TodoItem } from "@/components/TodoItem";
import { ReactElement, useRef, useState } from "react";

export default function Home() {
  return (
    <main className="bg-zinc-900 flex flex-row p-3 h-full justify-start">
      <div className="w-full flex flex-col p-3 items-center justify-center">
        <span className="text-gray-300 font-semibold">This is YOUR to-do list.</span>
        <TodoInterface /> 
      </div>
    </main>
  );
}
