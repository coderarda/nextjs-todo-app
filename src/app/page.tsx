import { AddIcon } from "@/components/AddIcon";
import { TodoInterface } from "@/components/TodoInterface";
import { TodoItem } from "@/components/TodoItem";
import { ReactElement, useRef, useState } from "react";

export default function Home() {
  return (
    <main className="bg-gray-800 flex flex-col items-center flex-1">
      <span className="text-gray-300 p-2 font-semibold">This is YOUR to-do list.</span>
      <TodoInterface /> 
    </main>
  );
}
