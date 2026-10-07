"use client";

import { useState } from "react";
import { useTodos } from "./TodosContext";
import { TodoItem } from "./TodoItem";

export function UnscheduledList() {
  const { undated, setTodoDate, toggleTodo, removeTodo } = useTodos();
  const [dates, setDates] = useState<Record<string, string>>({});

  return (
    <aside className="w-80 shrink-0 rounded-2xl bg-zinc-800 p-3 h-fit">
      <h2 className="font-semibold text-gray-200 mb-2">Unscheduled ({undated.length})</h2>
      {undated.length === 0 ? (
        <p className="text-sm text-gray-400">No unscheduled todos. Uncheck “date” when adding, or unschedule from a day.</p>
      ) : (
        <ul>
          {undated.map((t) => (
            <li key={t.id} className="flex flex-col gap-1.5 rounded-xl border border-white/10 bg-zinc-700/40 p-2 mb-2">
              <TodoItem todo={t} onToggle={() => toggleTodo(t.id)} onRemove={() => removeTodo(t.id)} />
              <div className="flex gap-1 items-center">
                <input
                  type="date"
                  value={dates[t.id] ?? ""}
                  onChange={(e) => setDates((p) => ({ ...p, [t.id]: e.target.value }))}
                  className="text-xs bg-zinc-700 text-white rounded px-1 py-1 flex-1"
                />
                <button
                  disabled={!dates[t.id]}
                  onClick={() => dates[t.id] && setTodoDate(t.id, dates[t.id])}
                  className="text-xs rounded bg-lime-500 text-black px-2 py-1 disabled:opacity-40"
                >
                  Assign
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}
