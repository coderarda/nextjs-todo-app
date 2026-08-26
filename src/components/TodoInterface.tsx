"use client"

import React, { ChangeEvent, ReactElement, useCallback, useEffect, useRef, useState } from "react";
import { TodoItem } from "./TodoItem";
import { AddIcon } from "./AddIcon";

export function TodoInterface() {
  const [items, setItems] = useState<string[]>([]);
  const textRef = useRef<HTMLInputElement>(null);
  const pushTodo = (todoTitle: string) => {
    if (!/^\s/g.test(todoTitle) && todoTitle.length != 0) {
      setItems([...items, todoTitle]);
    }
  }

  return (
    <div className="bg-zinc-800 w-[40vw] flex m-2 justify-center flex-col h-full rounded-2xl p-2">
      <ul className="flex-1 overflow-y-auto flex flex-col-reverse">
        {items.map((title, i) => (
          <TodoItem key={i} title={title} onRemove={() => setItems(items.filter((_, idx) => idx !== i))} />
        ))}
      </ul>
      <div className="rounded-full mx-auto my-2 flex flex-row p-1 bg-zinc-600 w-[90%]">
        <input title="Add todo..." type="text" ref={textRef} onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); pushTodo(textRef.current?.value as string); textRef.current!.value = ''; } }} className="ml-2 text-white focus:outline-none bg-zinc-600 w-full" />
        <button
          type="button"
          className="rounded-full aspect-square h-6 flex flex-row justify-center bg-lime-500"
          onClick={(e) => {
            e.preventDefault();
            pushTodo(textRef.current?.value as string);
            textRef.current!.value = '';
          }}
        >
          <AddIcon className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}