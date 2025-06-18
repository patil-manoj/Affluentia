import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBagIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const Nav = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About Us', href: '#about' },
    { label: 'Products', href: '#products' },
    { label: 'Contact Us', href: '#contact' },
  ];

  return (
    <header className="padding-x py-8 absolute z-10 w-full">
      <nav className="flex justify-between items-center max-container">
        <a href="/" className="text-3xl font-bold">
          Norda<span className="text-primary">.</span>
        </a>

        {/* Desktop Navigation */}
        <ul className="flex-1 flex justify-center items-center gap-16 max-lg:hidden">
          {navItems.map((item) => (
            <li key={item.label}>              <a 
                href={item.href}
                className="font-montserrat leading-normal text-lg text-neutral-600 hover:text-neutral-900"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>          <div className="flex gap-2 text-lg leading-normal font-medium max-lg:hidden wide:mr-24">
            <a href="/sign-in" className="text-neutral-600 hover:text-neutral-900">Sign in</a>
            <span>/</span>
            <a href="/explore" className="text-neutral-600 hover:text-neutral-900">Explore now</a>
          </div>

        <div className="hidden max-lg:flex gap-6 items-center">
          <ShoppingBagIcon className="w-6 h-6 cursor-pointer" />
          <button
            className="text-4xl cursor-pointer"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <XMarkIcon className="w-6 h-6" />
            ) : (
              <Bars3Icon className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed top-0 right-0 w-full h-screen bg-white p-4"
          >
            <div className="flex justify-end">
              <button
                className="text-4xl"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
            <ul className="flex flex-col items-center gap-8 mt-16">
              {navItems.map((item) => (
                <li key={item.label}>                  <a
                    href={item.href}
                    className="font-montserrat text-2xl text-neutral-600 hover:text-neutral-900"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="/sign-in"
                  className="font-montserrat text-2xl text-slate-gray hover:text-black"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign in
                </a>
              </li>
              <li>
                <a
                  href="/explore"
                  className="font-montserrat text-2xl text-slate-gray hover:text-black"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Explore now
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </nav>
    </header>
  );
};

export default Nav;
