"use client";
import { useEffect, useState } from "react";
export default function FloatingWhatsApp({ href }: { href: string }) {
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    const targets = document.querySelectorAll("#pricing, #contact, footer");
    const visible = new Set<Element>();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) =>
        entry.isIntersecting
          ? visible.add(entry.target)
          : visible.delete(entry.target),
      );
      setHidden(visible.size > 0);
    });
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);
  if (hidden) return null;
  return (
    <a
      className="floating-whatsapp"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Diwanshu on WhatsApp"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        aria-hidden="true"
      >
        <path d="M20 11.5a8 8 0 0 1-12 7L3 20l1.5-5A8 8 0 1 1 20 11.5Z" />
        <path d="M8 7.5c-.7 3.5 2.4 6.7 6 7l1-2-2-1-.9 1c-1.3-.6-2.2-1.5-2.7-2.7l1-.8-1-2Z" />
      </svg>
    </a>
  );
}
