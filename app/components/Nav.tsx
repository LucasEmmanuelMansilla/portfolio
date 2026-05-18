"use client";

import { useEffect, useState } from "react";

const links = [
  { href: "#sobre-mi", label: "Sobre mí" },
  { href: "#metricas", label: "Métricas" },
  { href: "#experiencia", label: "Experiencia" },
  { href: "#skills", label: "Skills" },
  { href: "#educacion", label: "Educación" },
  { href: "#contacto", label: "Contacto" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = links.map((l) => l.href.replace("#", ""));
      let current = "";
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          current = id;
        }
      }
      setActive(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (href: string) => {
    setMenuOpen(false);
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#060810]/90 backdrop-blur-md border-b border-[#1e2d47]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="font-bebas text-xl tracking-widest text-white hover:text-[#00ff87] transition-colors"
        >
          LM<span className="text-[#00ff87]">.</span>
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => {
            const id = link.href.replace("#", "");
            return (
              <button
                key={link.href}
                onClick={() => handleClick(link.href)}
                className={`text-sm font-karla font-medium tracking-wide transition-colors ${
                  active === id
                    ? "text-[#00ff87]"
                    : "text-[#6b7fa3] hover:text-white"
                }`}
              >
                {link.label}
              </button>
            );
          })}
          <a
            href="https://www.linkedin.com/in/lucasemansilla/"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 px-4 py-1.5 border border-[#00ff87] text-[#00ff87] text-sm font-medium rounded hover:bg-[#00ff87] hover:text-[#060810] transition-all duration-200"
          >
            LinkedIn
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span
            className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
          />
          <span
            className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0d1424] border-t border-[#1e2d47] px-6 py-4 flex flex-col gap-4">
          {links.map((link) => (
            <button
              key={link.href}
              onClick={() => handleClick(link.href)}
              className="text-left text-sm font-karla font-medium text-[#6b7fa3] hover:text-white transition-colors"
            >
              {link.label}
            </button>
          ))}
          <a
            href="https://www.linkedin.com/in/lucasemansilla/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-fit px-4 py-1.5 border border-[#00ff87] text-[#00ff87] text-sm font-medium rounded"
          >
            LinkedIn
          </a>
        </div>
      )}
    </nav>
  );
}
