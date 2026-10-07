"use client";

import { useMemo } from "react";
import { useTodos } from "./TodosContext";
import { todayKey } from "./shared";

export function CompletionStats() {
  const { todos, undated } = useTodos();

  const stats = useMemo(() => {
    const today = todayKey();
    const total = todos.length;
    const done = todos.filter((t) => t.done).length;
    const pct = total === 0 ? 0 : Math.round((done / total) * 100);

    const todayTodos = todos.filter((t) => t.date === today);
    const todayDone = todayTodos.filter((t) => t.done).length;

    const overdue = todos.filter((t) => !t.done && t.date && t.date < today);

    return {
      total,
      done,
      open: total - done,
      pct,
      todayTotal: todayTodos.length,
      todayDone,
      todayPct: todayTodos.length === 0 ? 0 : Math.round((todayDone / todayTodos.length) * 100),
      overdue: overdue.length,
      unscheduled: undated.length,
    };
  }, [todos, undated]);

  const cards = [
    {
      label: "Today",
      value: `${stats.todayDone}/${stats.todayTotal}`,
      sub: stats.todayTotal === 0 ? "Nothing due today" : `${stats.todayPct}% done`,
      icon: "today",
    },
    {
      label: "Overdue",
      value: String(stats.overdue),
      sub: stats.overdue === 0 ? "All clear" : "Needs attention",
      icon: "warning",
      alert: stats.overdue > 0,
    },
    {
      label: "Unscheduled",
      value: String(stats.unscheduled),
      sub: stats.unscheduled === 0 ? "All scheduled" : "Without a date",
      icon: "event_busy",
    },
    {
      label: "Open",
      value: String(stats.open),
      sub: `${stats.total} total`,
      icon: "pending_actions",
    },
  ];

  return (
    <section aria-label="Completion stats" className="mb-4 flex flex-col gap-3">
      <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-zinc-800 px-4 py-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-lime-500/15">
          <span className="material-icons text-lime-400">task_alt</span>
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline justify-between gap-2">
            <p className="text-sm font-semibold text-gray-100">
              {stats.done}/{stats.total} completed
            </p>
            <p className="text-sm font-semibold text-lime-300">{stats.pct}%</p>
          </div>
          <div
            role="progressbar"
            aria-valuenow={stats.pct}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Overall completion"
            className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-white/10"
          >
            <div
              className="h-full rounded-full bg-lime-500 transition-all duration-500"
              style={{ width: `${stats.pct}%` }}
            />
          </div>
          <p className="mt-1 text-xs text-gray-400">
            {stats.total === 0 ? "Add your first todo to get started." : `${stats.open} open across all dates.`}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {cards.map((c) => (
          <div
            key={c.label}
            className={`rounded-2xl border px-3 py-2.5 ${
              c.alert ? "border-red-500/40 bg-zinc-800" : "border-white/10 bg-zinc-800"
            }`}
          >
            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              <span className={`material-icons text-sm leading-none ${c.alert ? "text-red-400" : "text-gray-500"}`}>
                {c.icon}
              </span>
              {c.label}
            </div>
            <p className={`mt-0.5 text-xl font-semibold ${c.alert ? "text-red-300" : "text-gray-100"}`}>{c.value}</p>
            <p className="text-[11px] text-gray-500">{c.sub}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
