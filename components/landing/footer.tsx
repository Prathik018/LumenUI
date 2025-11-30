import Link from "next/link";
import XIcon from "../icons/x-icon";

export function Footer() {
    return (
        <footer className="border-t border-zinc-200 dark:border-zinc-800">
            <div className="mx-auto px-4">
                <div className="flex flex-col sm:flex-row items-center justify-between py-6 sm:h-16">
                    <nav className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 sm:w-1/3">
                        <Link
                            href="/docs/components/liquid-glass-card"
                            className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
                        >
                            /Components
                        </Link>
                        <Link
                            href="/docs"
                            className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
                        >
                            /Docs
                        </Link>
                    </nav>
                    <div className="flex justify-end sm:w-1/3">
                        <Link
                            href="https://x.com/Prathik__Pai"
                            target="_blank"
                            className="text-sm text-zinc-600 dark:text-zinc-400 mt-4 sm:mt-0 hover:text-zinc-900 dark:hover:text-white transition-colors flex items-center gap-1"
                        >
                            <XIcon className="w-4 h-4" />
                            built for you by{" "}
                            <span className="text-zinc-600 dark:text-zinc-400 font-bold ">
                                Prathik
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
export default Footer;