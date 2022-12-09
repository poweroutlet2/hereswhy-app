import type { ReactNode } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

type LayoutProps = {
    children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
    return (
        <>
            <Navbar />
            <main className="min-h-screen min-w-min flex flex-col items-center bg-slate-900 text-gray-200 ease-in-out selection:bg-orange-400 selection:text-gray-20">
                {children}
            </main>
        </>
    )
}