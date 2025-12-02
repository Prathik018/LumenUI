
export interface Component {
    name: string;
    slug: string;
    category: string;
    install?: string;
    usage?: string;
}

export const componentsList: Component[] = [
    // Input Components (alphabetically sorted)
    {
        name: "Action Search Bar",
        slug: "action-search-bar",
        category: "Input",
        install: "npm install framer-motion lucide-react",
        usage: `import ActionSearchBar from './action-search-bar';

<ActionSearchBar 
  placeholder="Search actions..." 
  onChange={(e) => console.log(e.target.value)}
/>`
    },
    {
        name: "AI Input Search",
        slug: "ai-input-search",
        category: "Input",
        install: "npm install framer-motion lucide-react",
        usage: `import AIInputSearch from './ai-input-search';

<AIInputSearch 
  placeholder="Ask AI anything..." 
  minHeight={60}
  maxHeight={200}
  onSubmit={(value) => console.log(value)}
/>`
    },
    {
        name: "Avatar Picker",
        slug: "avatar-picker",
        category: "Input",
        install: "npm install framer-motion",
        usage: `import AvatarPicker from './avatar-picker';

<AvatarPicker 
  defaultAvatar="/avatars/default.png"
  onSelect={(file) => console.log(file)}
/>`
    },
    {
        name: "File Upload",
        slug: "file-upload",
        category: "Input",
        install: "npm install framer-motion lucide-react",
        usage: `import FileUpload from './file-upload';

<FileUpload 
  accept=".jpg,.png,.pdf"
  maxSize={5} // MB
  onUpload={(files) => console.log(files)}
/>`
    },

    // Buttons (alphabetically sorted)
    {
        name: "Attract Button",
        slug: "attract-button",
        category: "Buttons",
        install: "npm install lucide-react",
        usage: `import AttractButton from './attract-button';

<AttractButton
  particleCount={12}
  attractRadius={50}
  className="bg-violet-100 dark:bg-violet-900"
>
  Hover Me
</AttractButton>`
    },
    {
        name: "Command Button",
        slug: "command-button",
        category: "Buttons",
        install: "npm install lucide-react",
        usage: `import CommandButton from './command-button';

<CommandButton 
  command="⌘K"
  description="Open command palette"
  onClick={() => console.log('Clicked')}
/>`
    },
    {
        name: "Gradient Button",
        slug: "gradient-button",
        category: "Buttons",
        install: "npm install framer-motion",
        usage: `import GradientButton from './gradient-button';

<GradientButton
  label="Get Started"
  variant="purple" // "emerald" | "purple" | "orange"
  onClick={() => console.log('Clicked')}
/>`
    },
    {
        name: "Hold Button",
        slug: "hold-button",
        category: "Buttons",
        install: "npm install framer-motion",
        usage: `import HoldButton from './hold-button';

<HoldButton 
  duration={1500}
  onComplete={() => console.log('Completed!')}
>
  Hold to Confirm
</HoldButton>`
    },
    {
        name: "Particle Button",
        slug: "particle-button",
        category: "Buttons",
        install: "npm install framer-motion",
        usage: `import ParticleButton from './particle-button';

<ParticleButton
  successDuration={1000}
  onSuccess={() => console.log('Success!')}
>
  Click for Particles
</ParticleButton>`
    },
    {
        name: "Slide Text Button",
        slug: "slide-text-button",
        category: "Buttons",
        install: "npm install framer-motion",
        usage: `import SlideTextButton from './slide-text-button';

<SlideTextButton
  text="Hover Me"
  slideText="Let's Go!"
  direction="up" // "up" | "down"
/>`
    },
    {
        name: "Social Button",
        slug: "social-button",
        category: "Buttons",
        install: "npm install lucide-react",
        usage: `import SocialButton from './social-button';

<SocialButton 
  platform="twitter"
  username="@lumenui"
/>`
    },
    {
        name: "Switch Button",
        slug: "switch-button",
        category: "Buttons",
        install: "npm install framer-motion",
        usage: `import SwitchButton from './switch-button';

<SwitchButton 
  initialChecked={false}
  onChange={(checked) => console.log(checked)}
/>`
    },

    // Cards (alphabetically sorted)
    {
        name: "Activity Card",
        slug: "activity-card",
        category: "Cards",
        install: "npm install framer-motion lucide-react",
        usage: `import ActivityCard from './activity-card';

<ActivityCard 
  title="Recent Activity"
  items={[
    { label: "New user signed up", time: "2m ago" },
    { label: "Project deployed", time: "1h ago" }
  ]}
/>`
    },
    {
        name: "Card Flip",
        slug: "card-flip",
        category: "Cards",
        install: "npm install framer-motion lucide-react",
        usage: `import CardFlip from './card-flip';

<CardFlip 
  title="Pro Plan" 
  subtitle="$29/month"
  description="Perfect for growing teams."
  features={["Unlimited projects", "Priority support"]}
/>`
    },
    {
        name: "Card Nav",
        slug: "card-nav",
        category: "Cards",
        install: "npm install framer-motion lucide-react",
        usage: `import CardNav from './card-nav';

<CardNav 
  items={[
    { title: "Home", icon: <HomeIcon /> },
    { title: "Settings", icon: <SettingsIcon /> }
  ]}
/>`
    },
    {
        name: "Carousel Card",
        slug: "carousel-card",
        category: "Cards",
        install: "npm install framer-motion lucide-react",
        usage: `import CarouselCard from './carousel-card';

<CarouselCard 
  items={[
    { title: "Card 1", description: "Description 1" },
    { title: "Card 2", description: "Description 2" }
  ]}
/>`
    },
    {
        name: "PaymentFlow Card",
        slug: "paymentflow-card-stack",
        category: "Cards",
        install: "npm install framer-motion lucide-react",
        usage: `import PaymentFlowCard from './paymentflow-card-stack';

<PaymentFlowCard />`
    },

    // Text Effects (alphabetically sorted)
    {
        name: "Blur Text",
        slug: "blur-text",
        category: "Text Effects",
        install: "npm install framer-motion",
        usage: `import BlurText from './blur-text';

<BlurText 
  text="Blurred Text Reveal" 
  className="text-4xl font-bold"
  delay={0.2}
  duration={0.8}
/>`
    },
    {
        name: "Circular Text",
        slug: "circular-text",
        category: "Text Effects",
        install: "npm install framer-motion",
        usage: `import CircularText from './circular-text';

<CircularText 
  text="ROTATING TEXT • ANIMATION • " 
  radius={100} 
  duration={10}
  className="text-sm font-medium"
/>`
    },
    {
        name: "Dynamic Text",
        slug: "dynamic-text",
        category: "Text Effects",
        install: "npm install framer-motion",
        usage: `import DynamicText from './dynamic-text';

<DynamicText 
  text="Dynamic" 
  hoverText="Hovered!"
/>`
    },
    {
        name: "Focus On Hover",
        slug: "focus-on-hover",
        category: "Text Effects",
        install: "npm install framer-motion",
        usage: `import FocusOnHover from './focus-on-hover';

<FocusOnHover 
  text="Hover over this text to focus"
  focusColor="text-blue-500"
/>`
    },
    {
        name: "Glitch Text",
        slug: "glitch-text",
        category: "Text Effects",
        install: "npm install framer-motion",
        usage: `import GlitchText from './glitch-text';

<GlitchText 
  text="GLITCH EFFECT" 
  speed={0.5}
  enableHover={true}
/>`
    },
    {
        name: "Gradient Text",
        slug: "gradient-text",
        category: "Text Effects",
        install: "npm install clsx tailwind-merge",
        usage: `import GradientText from './gradient-text';

<GradientText
  colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
  animationSpeed={3}
  showBorder={false}
  className="text-4xl font-bold"
>
  Gradient Text
</GradientText>`
    },
    {
        name: "Shimmer Text",
        slug: "shimmer-text",
        category: "Text Effects",
        install: "npm install framer-motion",
        usage: `import ShimmerText from './shimmer-text';

<ShimmerText 
  text="Shimmering Text" 
  shimmerColor="#ffffff"
  duration={2}
/>`
    },
    {
        name: "Split Text",
        slug: "split-text",
        category: "Text Effects",
        install: "npm install framer-motion",
        usage: `import SplitText from './split-text';

<SplitText 
  text="Split Text Animation" 
  className="text-4xl font-bold"
  delay={50}
  animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
  animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
/>`
    },
    {
        name: "Type Writer",
        slug: "type-writer",
        category: "Text Effects",
        install: "npm install framer-motion",
        usage: `import TypeWriter from './type-writer';

<TypeWriter 
  text={["Hello World", "Welcome to LumenUI"]} 
  speed={100} 
  waitTime={1500}
  loop={true}
  cursorChar="|"
/>`
    },

    // Loaders (alphabetically sorted)
    {
        name: "AI Loading",
        slug: "ai-loading",
        category: "Loaders",
        install: "npm install framer-motion",
        usage: `import AILoading from './ai-loading';

<AILoading 
  text="Generating response..."
  duration={2}
/>`
    },
    {
        name: "AI Text Loading",
        slug: "ai-text-loading",
        category: "Loaders",
        install: "npm install framer-motion",
        usage: `import AITextLoading from './ai-text-loading';

<AITextLoading 
  texts={["Thinking...", "Processing...", "Almost there..."]}
  interval={2000}
/>`
    },
    {
        name: "Loader",
        slug: "loader",
        category: "Loaders",
        install: "npm install framer-motion",
        usage: `import Loader from './loader';

<Loader 
  size="md" // "sm" | "md" | "lg"
  color="primary"
/>`
    },

    // Backgrounds (alphabetically sorted)
    {
        name: "Background Paths",
        slug: "background-paths",
        category: "Backgrounds",
        install: "npm install framer-motion",
        usage: `import BackgroundPaths from './background-paths';

<BackgroundPaths 
  title="Background Paths"
  className="min-h-screen"
/>`
    },
    {
        name: "Beams Background",
        slug: "beams-background",
        category: "Backgrounds",
        install: "npm install framer-motion",
        usage: `import BeamsBackground from './beams-background';

<BeamsBackground 
  className="min-h-screen"
>
  <div className="z-10">Content here</div>
</BeamsBackground>`
    },

    // AI Components (alphabetically sorted)
    {
        name: "AI Prompt",
        slug: "ai-prompt",
        category: "AI Components",
        install: "npm install framer-motion lucide-react",
        usage: `import AIPrompt from './ai-prompt';

<AIPrompt 
  onSubmit={(prompt) => console.log(prompt)}
  suggestions={["Generate a logo", "Write a blog post"]}
/>`
    },
    {
        name: "AI Voice",
        slug: "ai-voice",
        category: "AI Components",
        install: "npm install framer-motion lucide-react",
        usage: `import AIVoice from './ai-voice';

<AIVoice 
  onRecordingComplete={(blob) => console.log(blob)}
  visualizerColor="#10b981"
/>`
    },

    // Layout (alphabetically sorted)
    {
        name: "Bento Grid",
        slug: "bento-grid",
        category: "Layout",
        install: "npm install framer-motion lucide-react",
        usage: `import BentoGrid from './bento-grid';

<BentoGrid />`
    },
    {
        name: "Logo Loop",
        slug: "logo-loop",
        category: "Layout",
        install: "npm install framer-motion",
        usage: `import LogoLoop from './logo-loop';

<LogoLoop 
  direction="left" // "left" | "right"
  speed={50}
/>`
    },
    {
        name: "Shape Hero",
        slug: "shape-hero",
        category: "Layout",
        install: "npm install framer-motion lucide-react",
        usage: `import ShapeHero from './shape-hero';

<ShapeHero 
  title="Build faster"
  subtitle="The ultimate UI kit"
/>`
    },

    // Interactive (alphabetically sorted)
    {
        name: "Currency Transfer",
        slug: "currency-transfer",
        category: "Interactive",
        install: "npm install framer-motion lucide-react",
        usage: `import CurrencyTransfer from './currency-transfer';

<CurrencyTransfer 
  defaultAmount={1000}
  defaultCurrency="USD"
/>`
    },
    {
        name: "Smooth Drawer",
        slug: "smooth-drawer",
        category: "Interactive",
        install: "npm install framer-motion lucide-react",
        usage: `import SmoothDrawer from './smooth-drawer';

<SmoothDrawer 
  trigger={<button>Open Drawer</button>}
  title="Drawer Title"
  description="Drawer content goes here."
/>`
    },
    {
        name: "Smooth Tab",
        slug: "smooth-tab",
        category: "Interactive",
        install: "npm install framer-motion lucide-react",
        usage: `import SmoothTab from './smooth-tab';

<SmoothTab 
  tabs={[
    { id: "tab1", label: "Tab 1", content: <div>Content 1</div> },
    { id: "tab2", label: "Tab 2", content: <div>Content 2</div> }
  ]}
/>`
    },
    {
        name: "Toolbar",
        slug: "toolbar",
        category: "Interactive",
        install: "npm install framer-motion lucide-react",
        usage: `import Toolbar from './toolbar';

<Toolbar 
  items={[
    { icon: <EditIcon />, label: "Edit", onClick: () => {} },
    { icon: <DeleteIcon />, label: "Delete", onClick: () => {} }
  ]}
/>`
    },

    // Effects (new category for visual effects)
    {
        name: "Mouse Click Ripple",
        slug: "mouse-click-ripple",
        category: "Effects",
        install: "npm install framer-motion",
        usage: `import MouseClickRipple from './mouse-click-ripple';

<MouseClickRipple 
  color="rgba(0,0,0,0.1)"
  duration={0.6}
/>`
    },
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
    "Interactive",
    "Effects"
];
