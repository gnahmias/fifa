'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/', label: '🏠 Inicio' },
  { href: '/participantes', label: '👥 Participantes' },
  { href: '/fixture', label: '📋 Fixture' },
  { href: '/posiciones', label: '📊 Posiciones' },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-gray-900 border-b border-gray-700 sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-3 flex items-center gap-1 h-12 overflow-x-auto scrollbar-none">
        <span className="text-green-400 font-black text-base mr-2 shrink-0">⚽</span>
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className={`px-3 py-1.5 rounded text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
              pathname === l.href
                ? 'bg-green-500 text-black'
                : 'text-gray-300 hover:text-white hover:bg-gray-700'
            }`}
          >
            {l.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
