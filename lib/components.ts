
export interface Component {
    name: string;
    slug: string;
    category: string;
}

export const componentsList: Component[] = [
    { name: "Action Search Bar", slug: "action-search-bar", category: "Input" },
    { name: "AI Input Search", slug: "ai-input-search", category: "Input" },
    { name: "File Upload", slug: "file-upload", category: "Input" },
    { name: "Avatar Picker", slug: "avatar-picker", category: "Input" },

    { name: "Attract Button", slug: "attract-button", category: "Buttons" },
    { name: "Command Button", slug: "command-button", category: "Buttons" },
    { name: "Gradient Button", slug: "gradient-button", category: "Buttons" },
    { name: "Hold Button", slug: "hold-button", category: "Buttons" },
    { name: "Particle Button", slug: "particle-button", category: "Buttons" },
    { name: "Slide Text Button", slug: "slide-text-button", category: "Buttons" },
    { name: "Social Button", slug: "social-button", category: "Buttons" },
    { name: "Switch Button", slug: "switch-button", category: "Buttons" },

    { name: "Apple Activity Card", slug: "apple-activity-card", category: "Cards" },
    { name: "Card Flip", slug: "card-flip", category: "Cards" },
    { name: "Card Stack", slug: "card-stack", category: "Cards" },
    { name: "Mouse Effect Card", slug: "mouse-effect-card", category: "Cards" },
    { name: "Tweet Card", slug: "tweet-card", category: "Cards" },

    { name: "Dynamic Text", slug: "dynamic-text", category: "Text Effects" },
    { name: "Glitch Text", slug: "glitch-text", category: "Text Effects" },
    { name: "Matrix Text", slug: "matrix-text", category: "Text Effects" },
    { name: "Scroll Text", slug: "scroll-text", category: "Text Effects" },
    { name: "Shimmer Text", slug: "shimmer-text", category: "Text Effects" },
    { name: "Sliced Text", slug: "sliced-text", category: "Text Effects" },
    { name: "Swoosh Text", slug: "swoosh-text", category: "Text Effects" },
    { name: "Type Writer", slug: "type-writer", category: "Text Effects" },

    { name: "AI Loading", slug: "ai-loading", category: "Loaders" },
    { name: "AI Text Loading", slug: "ai-text-loading", category: "Loaders" },
    { name: "Loader", slug: "loader", category: "Loaders" },

    { name: "Background Paths", slug: "background-paths", category: "Backgrounds" },
    { name: "Beams Background", slug: "beams-background", category: "Backgrounds" },

    { name: "AI Prompt", slug: "ai-prompt", category: "AI Components" },
    { name: "AI Voice", slug: "ai-voice", category: "AI Components" },

    { name: "Bento Grid", slug: "bento-grid", category: "Layout" },
    { name: "Shape Hero", slug: "shape-hero", category: "Layout" },

    { name: "Currency Transfer", slug: "currency-transfer", category: "Interactive" },
    { name: "Smooth Drawer", slug: "smooth-drawer", category: "Interactive" },
    { name: "Smooth Tab", slug: "smooth-tab", category: "Interactive" },
    { name: "Toolbar", slug: "toolbar", category: "Interactive" },
];

export const categories = [
    "Input",
    "Buttons",
    "Cards",
    "Text Effects",
    "Loaders",
    "Backgrounds",
    "AI Components",
    "Layout",
    "Interactive"
];
