"use client"

import React, { ChangeEvent, ReactElement, useCallback, useEffect, useRef, useState } from "react";
import { TodoItem } from "./TodoItem";
import { AddIcon } from "./AddIcon";

export function TodoInterface() {
  const [items, setItems] = useState<ReactElement[]>([]);
  const textRef = useRef<HTMLInputElement>(null);
  const pushTodo = (todoTitle: string) => {
    if (!/^\s/g.test(todoTitle) && todoTitle.length != 0) {
      setItems([...items, TodoItem({ title: todoTitle })]);
    }
  }

  return (
    <div className="bg-zinc-800 w-[40vw] flex m-2 justify-end flex-col h-full rounded-2xl">
      <ul className="inline-flex h-full justify-start mt-2 flex-col">
        {items.map((el) => {
          return el
        })}
      </ul>
      <div className="rounded-full m-2 flex flex-row p-1 bg-zinc-600">
        <input title="Add todo..." type="text" ref={textRef} className="ml-2 text-white focus:outline-none bg-zinc-600 w-full" />
        <button
          type="button"
          className="rounded-full aspect-square h-6 flex flex-row justify-center bg-lime-500"
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