"use client";
import { useState } from "react";
import { links } from "@/lib/site";
export default function Navigation() {
  const [open, setOpen] = useState(false);
  return (
    <header className="header">
      <div className="container nav">
        <a className="brand" href="#home" aria-label="Diwanshu Kumar home">
          <span className="monogram">
            DK<span>.</span>
          </span>
          <span className="brand-name">
            DIWANSHU KUMAR<small>WEB DEVELOPER & DIGITAL SOLUTIONS</small>
          </span>
        </a>
        <button
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? "Close ✕" : "Menu ☰"}
        </button>
        <nav
          id="navigation"
          className={open ? "nav-links open" : "nav-links"}
          aria-label="Main navigation"
        >
          {links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              onClick={() => setOpen(false)}
            >
              {link}
            </a>
          ))}
          <a
            className="button small"
            href="#contact"
            onClick={() => setOpen(false)}
          >
            Let&apos;s Talk <span>↗</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
