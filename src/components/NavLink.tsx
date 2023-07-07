import Link from "next/link";
import { useRouter } from "next/router";

interface NavLinkProps {
    href: string;
    title: string;
}

export function NavLink(props: NavLinkProps) {
    return(
        <li className="hover:drop-shadow-lg p-3 flex flex-col rounded-md transition justify-center text-center bg-slate-600 hover:bg-slate-500">
            <Link href={props.href}>
                <span className="text-center">{props.title}</span>
            </Link>
        </li>
    );
}