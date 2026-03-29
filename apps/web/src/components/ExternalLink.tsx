import { cn } from "@/lib/utils";
import React from "react";

interface ExternalLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
}

export default function ExternalLink({ href, children, className, ...props }: ExternalLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "font-medium text-foreground no-underline underline-offset-2 hover:underline",
        className
      )}
      {...props}
    >
      {children}
    </a>
  );
}