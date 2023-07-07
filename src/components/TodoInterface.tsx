"use client"

import React, { ChangeEvent, ReactElement, useCallback, useEffect, useRef, useState } from "react";
import { TodoItem } from "./TodoItem";
import { AddIcon } from "./AddIcon";

export function TodoInterface() {
  const [items, setItems] = useState<ReactElement[]>([]);
  const textRef = useRef<HTMLInputElement>(null);

  const pushTodo = (todoTitle: string) => {
    if (!/^\s/g.test(todoTitle) && todoTitle.length != 0)
      setItems([...items, TodoItem({ title: todoTitle })]);
  }

  return (
    <div className="bg-slate-600 w-[40vw] flex m-3 flex-1 flex-col justify-end rounded-2xl">
      <ul className="inline-flex flex-col">
        {items.map((el) => {
          return el
        })}
      </ul>
      <div className="rounded-full m-2 flex flex-row justify-start p-1 bg-slate-400">
        <input type="text" ref={textRef} className="ml-2 focus:outline-none text-black bg-slate-400 w-full" />
        <button
          className="rounded-full aspect-square h-6 flex flex-row justify-center bg-green-400"
          onClick={(e) => {
            e.preventDefault();
            pushTodo(textRef.current?.value as string);
          }}
        >
          <AddIcon className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}