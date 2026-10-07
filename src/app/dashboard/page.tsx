import { Calendar } from "@/components/Calendar";
import { CompletionStats } from "@/components/CompletionStats";
import { UnscheduledList } from "@/components/UnscheduledList";

export default function Page() {
    return (
        <div className="flex-1 w-full p-4 bg-zinc-900">
            <h1 className="text-xl font-semibold text-gray-100">Calendar</h1>
            <p className="text-sm text-gray-400 mb-3">Click a day to view, add, or manage todos.</p>
            <CompletionStats />
            <div className="flex flex-row gap-4 items-start">
                <Calendar />
                <div className="mt-5">
                    <UnscheduledList />
                </div>
            </div>
        </div>
    );
}
