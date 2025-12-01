
import { componentRegistry } from "@/lib/registry";
import { componentsList } from "@/lib/components";
import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import ComponentPreview from "@/components/docs/component-preview";

export function generateStaticParams() {
    return componentsList.map((component) => ({
        slug: component.slug,
    }));
}

export default async function ComponentPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const Component = componentRegistry[slug];

    if (!Component) {
        return notFound();
    }

    const filePath = path.join(process.cwd(), "components/lumenui", `${slug}.tsx`);
    let code = "";
    try {
        code = fs.readFileSync(filePath, "utf-8");
    } catch (error) {
        console.error(`Error reading file for ${slug}:`, error);
        code = "// Error reading file content";
    }

    const componentData = componentsList.find(c => c.slug === slug);
    const componentName = componentData?.name || slug;
    const componentCategory = componentData?.category || "Component";

    return (
        <div className="flex h-full flex-col">
            <div className="sticky top-0 z-10 bg-white dark:bg-black border-b px-6 py-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <span>{componentCategory}</span>
                    <span>/</span>
                    <span>{componentName}</span>
                </div>
                <h1 className="text-3xl font-bold tracking-tight">{componentName}</h1>
                
            </div>
            <div className="flex-1 overflow-auto px-6 py-6">
                <ComponentPreview code={code}>
                    <Component />
                </ComponentPreview>
            </div>
        </div>
    );
}
