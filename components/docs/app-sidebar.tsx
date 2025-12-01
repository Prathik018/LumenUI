
"use client"
import * as React from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { componentsList, categories } from "@/lib/components"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown } from "lucide-react"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const pathname = usePathname()

    const componentsByCategory = React.useMemo(() => {
        const grouped: Record<string, typeof componentsList> = {}
        categories.forEach(category => {
            grouped[category] = componentsList.filter(c => c.category === category)
        })
        return grouped
    }, [])

    return (
        <Sidebar {...props}>
            <SidebarHeader>
                <div className="flex items-center gap-6 px-3 py-2">
                    <Link className="flex items-center " href="/">
                        <span className="hidden font-semibold text-lg sm:block">
                            LumenUI
                        </span>
                    </Link>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <ScrollArea className="h-[calc(100vh-120px)]">
                    {categories.map((category) => (
                        <Collapsible key={category} defaultOpen className="group/collapsible">
                            <SidebarGroup>
                                <SidebarGroupLabel asChild>
                                    <CollapsibleTrigger className="flex w-full items-center justify-between hover:bg-accent hover:text-accent-foreground rounded-md px-2 py-1.5">
                                        <span>{category}</span>
                                        <ChevronDown className="h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
                                    </CollapsibleTrigger>
                                </SidebarGroupLabel>
                                <CollapsibleContent>
                                    <SidebarGroupContent>
                                        <SidebarMenu>
                                            {componentsByCategory[category]?.map((component) => (
                                                <SidebarMenuItem key={component.slug}>
                                                    <SidebarMenuButton
                                                        asChild
                                                        isActive={pathname === `/docs/components/${component.slug}`}
                                                    >
                                                        <Link href={`/docs/components/${component.slug}`}>
                                                            {component.name}
                                                        </Link>
                                                    </SidebarMenuButton>
                                                </SidebarMenuItem>
                                            ))}
                                        </SidebarMenu>
                                    </SidebarGroupContent>
                                </CollapsibleContent>
                            </SidebarGroup>
                        </Collapsible>
                    ))}
                </ScrollArea>
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    )
}
