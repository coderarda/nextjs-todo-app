import { TodoInterface } from "@/components/TodoInterface";

export default function Home() {
  return (
    <main className="bg-zinc-900 flex flex-1 flex-row p-3 w-full justify-start">
      <div className="w-full flex flex-col p-3 items-center justify-center">
        <span className="text-gray-300 font-semibold">What's on your mind?</span>
        <TodoInterface />
      </div>
    </main>
  );
}
