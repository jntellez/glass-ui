import { Card } from '@glass-ui-kit/glass';
import { SiNextdotjs, SiVite, SiAstro, SiReact } from '@icons-pack/react-simple-icons';

const frameworks = [
  {
    name: "Next.js",
    href: "/docs/installation/next",
    icon: SiNextdotjs,
  },
  {
    name: "Vite",
    href: "/docs/installation/vite",
    icon: SiVite,
  },
  {
    name: "Astro",
    href: "/docs/installation/astro",
    icon: SiAstro,
  },
  {
    name: "Manual",
    href: "/docs/installation/manual",
    icon: SiReact,
  },
];

export default function FrameworkGrid() {
  return (
    <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
      {frameworks.map((fw) => {
        const Icon = fw.icon;

        return (
          <a key={fw.name} href={fw.href} className="no-underline">
            <Card className="hover:glass-strong flex flex-col items-center justify-center transition-colors duration-200">
              <div className="flex flex-col items-center py-2">
                <Icon className="h-10 w-10 text-foreground" />
                <p className="mt-1.5 mb-0 font-medium text-foreground">{fw.name}</p>
              </div>
            </Card>
          </a>
        );
      })}
    </div>
  );
}