import React from "react";
import { Todo } from "./shared";

export function TodoItem({
  todo,
  onToggle,
  onRemove,
  showDate = false,
}: {
  todo: Todo;
  onToggle?: () => void;
  onRemove?: () => void;
  showDate?: boolean;
}) {
  const prettyDate = (() => {
    if (!todo.date) return null;
    const d = new Date(`${todo.date}T00:00:00`);
    if (Number.isNaN(d.getTime())) return todo.date;
    return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
  })();
  const overdue =
    !todo.done && !!todo.date && todo.date < new Date().toISOString().slice(0, 10);

  return (
    <div
      className={`group flex w-full items-center gap-2.5 rounded-xl border px-2.5 py-2 shadow-sm transition-all duration-200 animate-fade-in ${
        todo.done
          ? "border-white/5 bg-zinc-700/40 opacity-60"
          : overdue
            ? "border-red-500/40 bg-zinc-700/70 hover:border-red-400/60 hover:shadow-md"
            : "border-white/10 bg-zinc-700/70 hover:border-lime-500/50 hover:shadow-md hover:shadow-lime-500/10"
      }`}
    >
      <label
        className={`relative flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center rounded-full border-2 transition-all ${
          todo.done
            ? "border-lime-500 bg-lime-500"
            : "border-white/30 bg-transparent hover:border-lime-400 hover:bg-lime-500/10"
        }`}
      >
        <input
          type="checkbox"
          checked={todo.done}
          onChange={onToggle}
          aria-label={todo.done ? "Mark as not done" : "Mark as done"}
          className="peer absolute h-4 w-4 cursor-pointer opacity-0"
        />
        <svg className={`h-3 w-3 text-black transition-opacity ${todo.done ? "opacity-100" : "opacity-0"}`} fill="none" stroke="currentColor" strokeWidth="3.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
      </label>
      <span className={`min-w-0 flex-1 break-words text-sm leading-snug ${todo.done ? "text-gray-400 line-through" : "text-gray-100"}`}>{todo.title}</span>
      {showDate && (
        <span
          title={todo.date ?? "No date"}
          className={`flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium ${
            !todo.date
              ? "bg-white/5 text-gray-500"
              : overdue
                ? "bg-red-500/15 text-red-300"
                : "bg-black/30 text-gray-300"
          }`}
        >
          <span className="material-icons text-[12px] leading-none">calendar_month</span>
          {prettyDate ?? "No date"}
        </span>
      )}
      <button
        onClick={onRemove}
        aria-label={`Delete "${todo.title}"`}
        className="shrink-0 rounded-full p-1 text-gray-500 opacity-0 transition-all hover:bg-red-500/20 hover:text-red-300 focus:opacity-100 group-hover:opacity-100"
      >
        <span className="material-icons block text-[16px] leading-none">close</span>
      </button>
    </div>
  );
}
