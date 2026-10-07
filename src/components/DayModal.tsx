"use client";

import { useEffect, useRef } from "react";
import { useTodos } from "./TodosContext";
import { formatDayTitle } from "./shared";
import { TodoItem } from "./TodoItem";

export function DayModal({ dateKey, onClose }: { dateKey: string; onClose: () => void }) {
  const { todosByDate, addTodo, toggleTodo, removeTodo, setTodoDate } = useTodos();
  const todos = todosByDate.get(dateKey) ?? [];
  const textRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const submit = () => {
    const val = textRef.current?.value ?? "";
    if (val.trim()) {
      addTodo(val, dateKey);
      if (textRef.current) textRef.current.value = "";
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      onClick={onClose}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={formatDayTitle(dateKey)}
        className="w-[480px] max-h-[80vh] overflow-y-auto rounded-2xl bg-zinc-800 p-4 animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-gray-100">{formatDayTitle(dateKey)}</h2>
          <button onClick={onClose} className="rounded bg-zinc-700 px-2 py-1 text-sm hover:bg-zinc-600" aria-label="Close">
            ✕
          </button>
        </div>
        {todos.length === 0 ? (
          <p className="text-sm text-gray-400 mb-3">No todos for this day yet.</p>
        ) : (
          <ul className="mb-3 flex flex-col gap-1.5">
            {todos.map((t) => (
              <li key={t.id} className="flex items-start gap-1">
                <div className="flex-1">
                  <TodoItem todo={t} onToggle={() => toggleTodo(t.id)} onRemove={() => removeTodo(t.id)} />
                </div>
                <button
                  onClick={() => setTodoDate(t.id, null)}
                  title="Move to unscheduled"
                  className="text-[11px] text-gray-400 hover:text-white underline shrink-0 mr-2"
                >
                  unschedule
                </button>
              </li>
            ))}
          </ul>
        )}
        <div className="flex gap-2">
          <input
            ref={textRef}
            type="text"
            placeholder="Add todo for this day..."
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                submit();
              }
            }}
            className="flex-1 rounded bg-zinc-700 px-2 py-1 text-sm text-white focus:outline-none"
          />
          <button onClick={submit} className="rounded bg-lime-500 px-3 py-1 text-sm text-black hover:bg-lime-400">
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
