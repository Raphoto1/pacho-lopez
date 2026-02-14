import React from 'react'
import Link from 'next/link'

export default function Footer2() {
  return (
    <footer className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white">
      {/* Top Section */}
      <div className="px-6 lg:px-16 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white drop-shadow-lg">Pacho López</h3>
            <p className="text-white/90 text-sm leading-relaxed">
              Artista musical con pasión por crear experiencias inolvidables.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-xl font-bold text-white drop-shadow-lg">Menú</h4>
            <nav className="space-y-2 flex flex-col">
              <Link href="/" className="text-white/90 hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block">
                Inicio
              </Link>
              <Link href="/bio" className="text-white/90 hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block">
                Biografía
              </Link>
              <Link href="/music" className="text-white/90 hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block">
                Música
              </Link>
              <Link href="/tour" className="text-white/90 hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block">
                Giras
              </Link>
            </nav>
          </div>

          {/* More Links */}
          <div className="space-y-4">
            <h4 className="text-xl font-bold text-white drop-shadow-lg">Contenido</h4>
            <nav className="space-y-2 flex flex-col">
              <Link href="/videos" className="text-white/90 hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block">
                Videos
              </Link>
              <Link href="/news" className="text-white/90 hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block">
                Noticias
              </Link>
              <Link href="/shop" className="text-white/90 hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block">
                Tienda
              </Link>
              <Link href="/contact" className="text-white/90 hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block">
                Contacto
              </Link>
            </nav>
          </div>

          {/* Social & Newsletter */}
          <div className="space-y-4">
            <h4 className="text-xl font-bold text-white drop-shadow-lg">Sígueme</h4>
            <div className="flex gap-4">
              <a href="#" className="bg-white/20 hover:bg-white/40 p-2 rounded-full transition-colors duration-300 transform hover:scale-110">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="bg-white/20 hover:bg-white/40 p-2 rounded-full transition-colors duration-300 transform hover:scale-110">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 7-7 7-7"/>
                </svg>
              </a>
              <a href="#" className="bg-white/20 hover:bg-white/40 p-2 rounded-full transition-colors duration-300 transform hover:scale-110">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path fill="black" d="M16.51 5.38c-.81 1.5.25 5.4 3.7 9.08.56.55.59 1.42.07 2-.61.66-1.61.71-2.29.11-4.31-3.92-7.24-8.03-6.48-10.38.2-.62.7-1.11 1.35-1.21.9-.14 1.75.58 1.88 1.71.09.8.18 2.07-.23 3.71M7.49 5.38c.81 1.5-.25 5.4-3.7 9.08-.56.55-.59 1.42-.07 2 .61.66 1.61.71 2.29.11 4.31-3.92 7.24-8.03 6.48-10.38-.2-.62-.7-1.11-1.35-1.21-.9-.14-1.75.58-1.88 1.71-.09.8-.18 2.07.23 3.71"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20 pt-8 mb-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-4 text-white/80 text-sm">
          <p>&copy; 2026 Pacho López. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white transition-colors duration-300">
              Privacidad
            </Link>
            <Link href="#" className="hover:text-white transition-colors duration-300">
              Términos
            </Link>
            <Link href="#" className="hover:text-white transition-colors duration-300">
              Cookies
            </Link>
          </div>
        </div>
      </div>

      {/* Animated Bottom Border */}
      <div className="h-1 bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300"></div>
    </footer>
  )
}
