import { AddIcon } from "@/components/AddIcon";
import { TodoInterface } from "@/components/TodoInterface";
import { TodoItem } from "@/components/TodoItem";
import { ReactElement, useRef, useState } from "react";

export default function Home() {
  return (
    <main className="bg-slate-800 flex flex-row justify-center flex-1">
        <TodoInterface /> 
    </main>
  );
}
