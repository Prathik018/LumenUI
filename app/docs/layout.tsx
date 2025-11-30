
import { AppSidebar } from "@/components/docs/app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/lib/theme-toggle";
import { ComponentSearch } from "@/components/docs/component-search";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <div className="flex h-screen flex-col bg-white dark:bg-black">
                    <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center justify-between gap-4 border-b px-4 bg-white dark:bg-black">
                        <div className="flex items-center gap-2">
                            <SidebarTrigger className="-ml-1" />
                            <Separator orientation="vertical" className="mr-2 h-4" />
                            <span className="font-semibold hidden sm:block">Components</span>
                        </div>
                        <div className="flex-1 max-w-md mx-4">
                            <ComponentSearch />
                        </div>
                        <ThemeToggle />
                    </header>
                    <div className="flex-1 overflow-auto">
                        {children}
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
