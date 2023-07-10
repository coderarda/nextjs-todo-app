import { NavLink } from "./NavLink";

export function SideNav() {
    return (
        <ul className={`inline-flex h-full w-[12vw] list-none flex-col absolute p-2 justify-start items-center bg-zinc-800 ease-linear duration-100 drop-shadow-lg`}>
            <NavLink href="/" title="To-do List" />
        </ul>
    );
}