"use client"

import React, { useRef, useState } from "react";
import { TodoItem } from "./TodoItem";
import { AddIcon } from "./AddIcon";
import { useTodos } from "./TodosContext";
import { todayKey } from "./shared";

export function TodoInterface() {
  const { todos, addTodo, toggleTodo, removeTodo } = useTodos();
  const textRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const [date, setDate] = useState<string>(todayKey());
  const [includeDate, setIncludeDate] = useState(true);

  const prettyDate = (() => {
    if (!date) return "Pick a date";
    const d = new Date(`${date}T00:00:00`);
    if (Number.isNaN(d.getTime())) return date;
    return d.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });
  })();

  const pushTodo = (todoTitle: string) => {
    if (!/^\s/g.test(todoTitle) && todoTitle.length != 0) {
      addTodo(todoTitle, includeDate && date ? date : null);
    }
  };

  const submit = () => {
    const val = textRef.current?.value ?? "";
    pushTodo(val);
    if (textRef.current) textRef.current.value = "";
  };

  return (
    <div className="bg-zinc-800 w-[40vw] flex m-2 justify-center flex-col h-full rounded-2xl p-2">
      <ul className="flex-1 overflow-y-auto flex flex-col gap-1.5 px-3 py-2">
        {todos.map((todo) => (
          <li key={todo.id}>
            <TodoItem
              todo={todo}
              showDate
              onToggle={() => toggleTodo(todo.id)}
              onRemove={() => removeTodo(todo.id)}
            />
          </li>
        ))}
      </ul>
      <div className="rounded-2xl mx-auto my-2 flex flex-row items-center gap-2 p-1 bg-zinc-600 w-[98%]">
        <input title="Add todo..." type="text" ref={textRef} onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); submit(); } }} className="ml-2 text-white focus:outline-none bg-zinc-600 w-full" />
        <button
          type="button"
          role="switch"
          aria-checked={includeDate}
          title={includeDate ? "Date included — click for no date" : "No date — click to add a date"}
          onClick={() => setIncludeDate((v) => !v)}
          className={`flex shrink-0 items-center gap-1.5 rounded-full border px-2 py-1 text-xs transition-colors ${
            includeDate
              ? "border-lime-500/60 bg-lime-500/15 text-lime-300 hover:bg-lime-500/25"
              : "border-white/10 text-white/50 hover:text-white/80 hover:border-white/25"
          }`}
        >
          <span
            className={`relative h-4 w-7 rounded-full transition-colors ${
              includeDate ? "bg-lime-500" : "bg-white/20"
            }`}
          >
            <span
              className={`absolute top-0.5 h-3 w-3 rounded-full bg-white transition-all ${
                includeDate ? "left-3.5" : "left-0.5"
              }`}
            />
          </span>
          <span className="material-icons text-sm leading-none">calendar_month</span>
          <span className="font-medium">{includeDate ? "Dated" : "No date"}</span>
        </button>
        <div
          role="button"
          tabIndex={includeDate ? 0 : -1}
          aria-disabled={!includeDate}
          onClick={() => {
            if (includeDate) {
              try {
                dateRef.current?.showPicker();
              } catch {
                dateRef.current?.focus();
                dateRef.current?.click();
              }
            }
          }}
          onKeyDown={(e) => {
            if (includeDate && (e.key === "Enter" || e.key === " ")) {
              e.preventDefault();
              try {
                dateRef.current?.showPicker();
              } catch {
                dateRef.current?.click();
              }
            }
          }}
          title={includeDate ? `Due date: ${prettyDate} — click to change` : "Enable Dated for a due date"}
          className={`relative flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs transition-colors ${
            includeDate
              ? "border-lime-500/60 bg-zinc-700 text-gray-100 hover:border-lime-400 hover:bg-zinc-700/80 cursor-pointer"
              : "border-white/10 text-white/30 cursor-not-allowed"
          }`}
        >
          <span className={`material-icons text-sm leading-none ${includeDate ? "text-lime-400" : ""}`}>
            calendar_month
          </span>
          <span className="font-medium whitespace-nowrap">{includeDate ? prettyDate : "No date"}</span>
          {includeDate && (
            <span className="material-icons text-sm leading-none opacity-60">expand_more</span>
          )}
          <input
            ref={dateRef}
            type="date"
            value={date}
            disabled={!includeDate}
            onChange={(e) => setDate(e.target.value)}
            aria-label="Due date"
            tabIndex={-1}
            className="absolute inset-0 h-full w-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
          />
        </div>
        <button
          type="button"
          className="rounded-full aspect-square h-6 flex flex-row justify-center bg-lime-500 shrink-0"
          onClick={(e) => {
            e.preventDefault();
            submit();
          }}
        >
          <AddIcon className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}
