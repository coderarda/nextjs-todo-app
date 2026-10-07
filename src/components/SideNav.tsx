import { NavLink } from "./NavLink";

export function SideNav() {
    return (
        <ul className="flex h-screen w-full flex-col p-3 bg-zinc-800 border-r border-r-zinc-600 overflow-y-auto">
            <div className="inline-flex flex-row p-2">
                <div className="bg-zinc-600 aspect-square w-10">Logo</div>
                <h3 className="font-semibold ml-2">Intelligent To-do</h3>
            </div>
            <NavLink href="/" title="To-do List" icon="home"/>
            <NavLink href="/dashboard" title="Dashboard" icon="dashboard" />
            <hr className="border-zinc-500"></hr>
            <span className="m-3 font-bold">Stats:</span>
            <span className="text-sm m-2">Done tasks: {0}</span>
            <span className="text-sm m-2">Day Streak: {0}</span>
        </ul>
    );
}
