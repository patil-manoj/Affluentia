import { useState, useEffect } from 'react'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'

const navigation = [
  { name: 'Projects', href: '/projects' },
  { name: 'Services', href: '/services' },
  { name: 'About', href: '/about' },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { scrollY } = useScroll();
  useEffect(() => {
    const unsubscribe = scrollY.onChange(latest => {
      setScrolled(latest > 50);
    });
    return () => unsubscribe();
  }, [scrollY]);
  const navbarHeight = useTransform(scrollY, [0, 100], [88, 72]);
  const navbarBackgroundOpacity = useTransform(scrollY, [0, 100], [0, 0.98]);
  const navbarBlur = useTransform(scrollY, [0, 100], [0, 15]);

  return (
    <motion.header 
      className="fixed inset-x-0 top-0 z-50"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ 
        type: "spring", 
        stiffness: 100, 
        damping: 20,
        duration: 0.8
      }}
      style={{ 
        backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.98)' : 'transparent',
        backdropFilter: scrolled ? 'blur(15px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(42, 54, 37, 0.1)' : 'none',
        boxShadow: scrolled ? '0 4px 20px rgba(0, 0, 0, 0.08)' : 'none',
        transition: 'all 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      }}
    >      <motion.nav 
        className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8 transition-all duration-700"
        style={{ 
          height: scrolled ? '72px' : '88px',
          paddingTop: scrolled ? '0' : '8px',
          paddingBottom: scrolled ? '0' : '8px'
        }}
      >
        <div className="flex lg:flex-1">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >            <Link to="/" className="-m-1.5 p-1.5">
              <span className={`text-2xl font-display font-bold transition-all duration-300 ${
                scrolled 
                  ? 'text-primary-600' 
                  : 'text-white drop-shadow-lg'
              }`}>
                Affluentia
              </span>
            </Link>
          </motion.div>
        </div>
        <div className="flex lg:hidden">          <motion.button
            type="button"
            className={`-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 transition-colors duration-300 ${
              scrolled ? 'text-primary-700' : 'text-white drop-shadow-lg'
            }`}
            onClick={() => setMobileMenuOpen(true)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </motion.button>
        </div>        <div className="hidden lg:flex lg:gap-x-12">
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
            >              <Link
                to={item.href}
                className={`relative text-sm font-medium font-display transition-all duration-300 ${
                  location.pathname === item.href 
                    ? (scrolled ? 'text-primary-600' : 'text-white font-semibold drop-shadow-lg')
                    : (scrolled ? 'text-neutral-700 hover:text-primary-600' : 'text-white/90 hover:text-white drop-shadow-md')
                }`}
              >
                {item.name}                {location.pathname === item.href && (
                  <motion.span
                    className={`absolute inset-x-0 -bottom-1 h-0.5 ${
                      scrolled ? 'bg-primary-600' : 'bg-white shadow-lg'
                    }`}
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
              boxShadow: "0px 0px 20px rgba(42, 54, 37, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
          >            <Link
              to="/contact"
              className={`relative inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold font-display shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                scrolled 
                  ? 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500' 
                  : 'bg-white/10 text-white backdrop-blur-sm border border-white/20 hover:bg-white/20 hover:border-white/30 focus:ring-white/50'
              }`}
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
      </motion.nav>      <AnimatePresence>
        {mobileMenuOpen && (
          <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>            <motion.div 
              className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
            <Dialog.Panel>              <motion.div 
                className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white/95 backdrop-blur-lg px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-primary-200/30 sm:shadow-2xl"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 20, stiffness: 100 }}
              >
            <div className="flex items-center justify-between">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >                <Link to="/" className="-m-1.5 p-1.5">
                  <span className="text-2xl font-bold text-primary-600">
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
          </motion.div>            </Dialog.Panel>
          </Dialog>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
