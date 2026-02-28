'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/', label: 'Inicio' },
  { href: '/participantes', label: 'Participantes' },
  { href: '/fixture', label: 'Fixture' },
  { href: '/posiciones', label: 'Posiciones' },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-gray-900 border-b border-gray-700">
      <div className="max-w-6xl mx-auto px-4 flex items-center gap-2 h-14">
        <span className="text-green-400 font-black text-xl mr-4">⚽ FIFA Torneo</span>
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
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
