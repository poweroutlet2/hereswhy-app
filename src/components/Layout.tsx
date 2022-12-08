import type { ReactNode } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

type LayoutProps = {
    children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
    return (
        <>
            <main className=" bg-slate-900 text-gray-200 min-h-screen w-screen max-w-full min-w-full ease-in-out selection:bg-orange-400 selection:text-gray-20">
                <Navbar />
                {children}
            </main>
        </>
    )
}