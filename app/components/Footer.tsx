const footerLinks = [
  {
    label: "Legal",
    items: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
  {
    label: "Community",
    items: [
      { label: "Discord", href: "https://discord.gg/vaultmtg" },
      { label: "Reddit", href: "https://reddit.com/r/vaultmtg" },
    ],
  },
  {
    label: "Support",
    items: [
      { label: "FAQ", href: "#faq" },
      { label: "Contact", href: "mailto:hello@vaultmtg.app" },
    ],
  },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-[#2A3347] bg-[#0D1117] px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-12 md:flex-row md:justify-between">
          {/* Brand */}
          <div className="max-w-xs">
            <span
              className="text-xl font-bold text-[#F5A623]"
              style={{ fontFamily: "var(--font-sora, Sora, sans-serif)" }}
            >
              VaultMTG
            </span>
            <p className="mt-3 text-sm text-[#94A3B8] leading-relaxed">
              Your edge. Every draft. Every match. The MTG Arena companion for
              serious players.
            </p>
            <p className="mt-4 text-xs text-[#4E6080]">
              VaultMTG is not affiliated with, endorsed by, or produced by
              Wizards of the Coast or Hasbro.
            </p>
          </div>

          {/* Link columns */}
          <div className="flex flex-wrap gap-12 md:gap-16">
            {footerLinks.map((group) => (
              <div key={group.label}>
                <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#4E6080]">
                  {group.label}
                </h3>
                <ul className="space-y-2">
                  {group.items.map((item) => (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        className="text-sm text-[#94A3B8] transition-colors hover:text-[#F5A623]"
                        target={
                          item.href.startsWith("http") ? "_blank" : undefined
                        }
                        rel={
                          item.href.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-[#2A3347] pt-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-[#4E6080]">
            &copy; {year} VaultMTG. All rights reserved.
          </p>
          <p className="text-xs text-[#4E6080]">
            Built for MTG Arena players, by players.
          </p>
        </div>
      </div>
    </footer>
  );
}
