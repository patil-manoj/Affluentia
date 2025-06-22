import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'

const navigation = [
  { name: 'Projects', href: '/projects' },
  { name: 'Services', href: '/services' },
  { name: 'About', href: '/about' },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white/80 backdrop-blur-md">
      <motion.nav 
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
      >
        <div className="flex lg:flex-1">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/" className="-m-1.5 p-1.5">
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-800">
                Affluentia
              </span>
            </Link>
          </motion.div>
        </div>
        <div className="flex lg:hidden">
          <motion.button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-neutral-700"
            onClick={() => setMobileMenuOpen(true)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </motion.button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: index * 0.1,
                type: "spring",
                stiffness: 50
              }}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
            >
              <Link
                to={item.href}
                className={`relative text-sm font-medium transition-colors hover:text-primary-600 ${
                  location.pathname === item.href 
                    ? 'text-primary-600' 
                    : 'text-neutral-700'
                }`}
              >
                {item.name}
                {location.pathname === item.href && (
                  <motion.span
                    className="absolute inset-x-0 -bottom-1 h-0.5 bg-primary-600"
                    layoutId="navbar-indicator"
                  />
                )}
              </Link>
            </motion.div>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0px 0px 20px rgba(99, 102, 241, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/contact"
              className="relative inline-flex items-center gap-2 rounded-full bg-primary-600 px-6 py-2 text-sm font-medium text-white shadow-soft hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              Get in Touch
              <motion.span
                initial={{ x: 0 }}
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                →
              </motion.span>
            </Link>
          </motion.div>
        </div>
      </motion.nav>      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <motion.div 
          className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
        <Dialog.Panel>
          <motion.div 
            className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white/90 backdrop-blur-md px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-neutral-900/10"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 20 }}
          >
            <div className="flex items-center justify-between">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/" className="-m-1.5 p-1.5">
                  <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-800">
                    Affluentia
                  </span>
                </Link>
              </motion.div>
              <motion.button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-neutral-700"
                onClick={() => setMobileMenuOpen(false)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </motion.button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-neutral-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ x: 10 }}
                    >
                      <Link
                        to={item.href}
                        className={`-mx-3 block rounded-lg px-3 py-2 text-base font-medium hover:bg-primary-50 ${
                          location.pathname === item.href
                            ? 'text-primary-600 bg-primary-50'
                            : 'text-neutral-900'
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
