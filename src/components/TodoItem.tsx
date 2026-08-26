import React from "react";

export function TodoItem({ title, onRemove }: { title: string; onRemove?: () => void }) {
    return (
        <li className="inline-flex flex-row p-2 mx-3 my-1 justify-start rounded items-center bg-lime-600 hover:bg-lime-500 ease-linear duration-200">
            <label className="relative h-6 w-6 rounded-md border-2 border-white/40 bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center cursor-pointer">
                <input type="checkbox" className="peer absolute opacity-0 h-6 w-6 cursor-pointer" />
                <svg className="w-4 h-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
            </label>
            <span className="ml-2 text-sm flex-1">{title}</span>
            <button onClick={onRemove} className="ml-2 text-xs bg-red-500 hover:bg-red-600 text-white px-2 py-0.5 rounded">Remove</button>
        </li>
    );
}