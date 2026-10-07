import { Todo } from "./shared";

const MAX_VISIBLE = 3;

export function CalendarTodoItem({ todo }: { todo: Todo }) {
  return (
    <li
      className={`truncate rounded px-1 py-0.5 text-[11px] leading-tight ${
        todo.done ? "bg-lime-800 text-white/60 line-through" : "bg-lime-600 text-white"
      }`}
      title={todo.title}
    >
      {todo.title}
    </li>
  );
}

export function CalendarTodoPreview({ todos }: { todos: Todo[] }) {
  const visible = todos.slice(0, MAX_VISIBLE);
  const extra = todos.length - visible.length;
  return (
    <ul className="mt-1 flex flex-col gap-1 px-1">
      {visible.map((t) => (
        <CalendarTodoItem key={t.id} todo={t} />
      ))}
      {extra > 0 && <li className="text-[11px] text-white/60 px-1">+{extra} more</li>}
    </ul>
  );
}
