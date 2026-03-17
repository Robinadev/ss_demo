import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import {
  ArrowRight,
  Shield,
  Menu,
  X,
  Globe,
  Lock,
  Eye,
  Heart,
  Plus,
  LogOut,
  Sun,
  Moon,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import heroImage from '../../assets/hero-community.png';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useApp } from '../AppContext';

const words = ['VOICE', 'STORY', 'HOPE', 'POWER'];

export default function HeroSection() {
  const { theme, setTheme } = useTheme();
  const { user } = useApp();
  const [scrollY, setScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState('ENG');
  const [currentWord, setCurrentWord] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const navigate = useNavigate();

  const handleQuickExit = () => {
    // Clear browsing history and redirect to neutral site
    if (typeof window !== 'undefined') {
      // Attempt to clear some browsing data
      try {
        window.location.replace('https://www.google.com');
      } catch {
        window.location.href = 'https://www.google.com';
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const navBg = scrollY > 50 ? 'rgba(253, 253, 245, 0.98)' : 'transparent';
  const textColor = scrollY > 50 ? '#2f3126' : 'white';
  const textColorSecondary = scrollY > 50 ? '#4e5241' : 'rgba(255, 255, 255, 0.6)';

  // Dynamic colors based on theme
  const dynamicBg = theme === 'dark' ? 'bg-[var(--color-background)]' : 'bg-black';
  const dynamicTextColor = theme === 'dark' ? 'text-[var(--color-foreground)]' : 'text-white';
  const dynamicTextColorSecondary = theme === 'dark' ? 'text-[var(--color-foreground)]/60' : 'text-white/60';

  return (
    <section className={`relative min-h-screen w-full overflow-hidden ${dynamicBg}`}>
      {/* Dynamic Background with Mouse Parallax */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${heroImage})`,
            transform: `scale(1.1) translate(${(mousePosition.x - 0.5) * 20}px, ${(mousePosition.y - 0.5) * 20}px)`,
            transition: 'transform 0.3s ease-out',
          }}
        />
        <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-[var(--color-background)]/40' : 'bg-[#062d46]/85'}`} />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, rgba(193,91,62,0.2) 0%, transparent 50%, rgba(221,161,94,0.15) 100%)',
          }}
        />
      </div>

      {/* Animated Geometric Shapes */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 right-20 h-64 w-64 rotate-45 border border-white/10"
          animate={{ rotate: [45, 135, 45] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute bottom-40 left-10 h-32 w-32 rounded-full border border-[#C15B3E]/30"
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-1/3 left-1/4 h-2 w-2 rounded-full bg-[#DDA15E]"
          animate={{ y: [0, -100, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
        />
        <motion.div
          className="absolute top-1/2 right-1/3 h-2 w-2 rounded-full bg-[#C15B3E]"
          animate={{ y: [0, 100, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 4, repeat: Infinity, delay: 1 }}
        />
      </div>

      {/* Navigation */}
      <motion.nav
        className="fixed top-0 right-0 left-0 z-50 transition-all duration-500"
        style={{
          backgroundColor: navBg,
          backdropFilter: scrollY > 50 ? 'blur(20px)' : 'none',
        }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <motion.div
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#C15B3E]"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <Shield className="h-5 w-5 text-white" />
              </motion.div>
              <span className="text-sm font-bold tracking-widest" style={{ color: textColor }}>
                SAFEHAVEN
              </span>
            </Link>

            <div className="hidden items-center gap-8 md:flex">
              {['HOME', 'REPORT', 'RESOURCES', 'SUPPORT'].map((item, i) => {
                const to =
                  item === 'HOME' ? '/' :
                  item === 'REPORT' ? '/report' :
                  item === 'RESOURCES' ? '/resources' :
                  item === 'SUPPORT' ? '/support-services' :
                  '/';
                return (
                  <Link
                    key={item}
                    to={to}
                    className="text-xs tracking-widest transition-colors hover:text-[#C15B3E] bg-transparent border-0 cursor-pointer"
                    style={{ color: textColorSecondary }}
                  >
                    {item}
                  </Link>
                );
              })}
              <button
                onClick={() => setLanguage(language === 'ENG' ? 'AMH' : 'ENG')}
                className="flex items-center gap-1 text-xs"
                style={{ color: textColorSecondary }}
              >
                <Globe className="h-3 w-3" /> {language}
              </button>
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="flex items-center gap-1 text-xs"
                style={{ color: textColorSecondary }}
                title="Toggle Theme"
              >
                {theme === 'dark' ? (
                  <Sun className="h-3 w-3" />
                ) : (
                  <Moon className="h-3 w-3" />
                )}
              </button>
              {!user && (
                <motion.button
                  onClick={() => navigate('/auth/login')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 rounded-full bg-[#C15B3E] px-4 py-2 text-xs font-bold tracking-wider text-white transition-colors hover:bg-[#8c3e2b]"
                >
                  Login
                </motion.button>
              )}
              {/* Quick Exit Button */}
              <motion.button
                onClick={handleQuickExit}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 rounded-full bg-[#f54070] px-4 py-2 text-xs font-bold tracking-wider text-white transition-colors hover:bg-[#e03560]"
                aria-label="Quick Exit - Leave this site immediately"
              >
                <LogOut className="h-3 w-3" />
                Quick Exit
              </motion.button>
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden"
              style={{ color: textColor }}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: 'auto' }}
              exit={{ height: 0 }}
              className="border-t border-white/10 bg-black md:hidden"
            >
              <div className="container mx-auto flex flex-col gap-4 px-6 py-6">
                {['HOME', 'REPORT', 'RESOURCES', 'SUPPORT'].map((item) => {
                  const to =
                    item === 'HOME' ? '/' :
                    item === 'REPORT' ? '/report' :
                    item === 'RESOURCES' ? '/resources' :
                    item === 'SUPPORT' ? '/support-services' :
                    '/';
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => {
                        setIsMenuOpen(false);
                        setTimeout(() => navigate(to), 100);
                      }}
                      className="py-2 text-white/80 text-left bg-transparent border-0 cursor-pointer"
                    >
                      {item}
                    </button>
                  );
                })}
                {/* Quick Exit Button - Mobile */}
                <motion.button
                  onClick={handleQuickExit}
                  whileTap={{ scale: 0.95 }}
                  className="mt-4 flex items-center justify-center gap-2 rounded-full bg-[#f54070] px-4 py-3 text-sm font-bold tracking-wider text-white transition-colors hover:bg-[#e03560]"
                  aria-label="Quick Exit - Leave this site immediately"
                >
                  <LogOut className="h-4 w-4" />
                  Quick Exit
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Creative Hero Content */}
      <div className="relative z-10 flex min-h-screen flex-col justify-center px-6 pt-20 md:px-16 lg:px-24">
        <div className="mx-auto w-full max-w-7xl">
          {/* Asymmetric Typography Layout */}
          <div className="mb-12 grid grid-cols-12 items-end gap-4">
            {/* YOUR - Left aligned */}
            <motion.div
              className="col-span-12 md:col-span-5"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-[15vw] leading-[0.8] font-black tracking-tighter text-white md:text-[10vw] lg:text-[8vw]">
                YOUR
              </h1>
            </motion.div>

            {/* Animated Word - Right side with gradient */}
            <motion.div
              className="col-span-12 flex items-end md:col-span-7"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentWord}
                  initial={{ y: 50, opacity: 0, rotateX: -90 }}
                  animate={{ y: 0, opacity: 1, rotateX: 0 }}
                  exit={{ y: -50, opacity: 0, rotateX: 90 }}
                  transition={{ duration: 0.5 }}
                  className="bg-gradient-to-r from-[#C15B3E] via-[#DDA15E] to-[#f54070] bg-clip-text text-[15vw] leading-[0.8] font-black tracking-tighter text-transparent md:text-[10vw] lg:text-[8vw]"
                >
                  {words[currentWord]}
                </motion.span>
              </AnimatePresence>
            </motion.div>
          </div>

          {/* MATTERS - Full width with stroke effect */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-16"
          >
            <h1
              className="text-[20vw] leading-[0.75] font-black tracking-tighter md:text-[14vw]"
              style={{
                WebkitTextStroke: '2px rgba(193,91,62,0.4)',
                color: 'transparent',
              }}
            >
              MATTERS
            </h1>
          </motion.div>

          {/* Bottom Section - Description and CTAs */}
          <div className="grid grid-cols-12 items-end gap-8">
            {/* Left - Description */}
            <motion.div
              className="col-span-12 md:col-span-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <p className="mb-8 max-w-sm text-lg leading-relaxed text-white/60">
                Anonymous reporting platform.
                <span className="text-white">
                  {' '}
                  Safe, secure, survivor-centered.
                </span>
              </p>

              {/* Feature Tags */}
              <div className="flex flex-wrap gap-3">
                {[
                  { icon: Lock, text: 'Encrypted' },
                  { icon: Eye, text: 'Anonymous' },
                  { icon: Heart, text: 'Support' },
                ].map((tag, i) => (
                  <motion.div
                    key={tag.text}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.8 + i * 0.1, type: 'spring' }}
                    className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5"
                  >
                    <tag.icon className="h-3 w-3 text-[#C15B3E]" />
                    <span className="text-xs text-white/70">{tag.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="col-span-12 flex items-end md:col-span-7"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  size="lg"
                  onClick={() => navigate('/report')}
                  className="group relative h-14 overflow-hidden rounded-full border-0 bg-gradient-to-r from-[#C15B3E] to-[#8c3e2b] px-10 text-sm font-bold tracking-wider text-white shadow-lg shadow-[#C15B3E]/30 transition-all duration-300 hover:from-[#8c3e2b] hover:to-[#C15B3E] hover:shadow-[#C15B3E]/50"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Start Report
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-2" />
                  </span>
                </Button>
              </motion.div>
            </motion.div>
              <Link to="/resources">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    size="lg"
                    variant="outline"
                    className="group h-14 rounded-full border border-white/20 bg-white/5 px-10 text-sm font-bold tracking-wider text-white backdrop-blur-sm transition-all duration-300 hover:border-[#C15B3E]/50 hover:bg-white/10 hover:text-[#C15B3E]"
                  >
                    Explore Resources
                  </Button>
                </motion.div>
              </Link>
          </div>

          {/* Bottom Stats Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-20 flex items-center justify-between border-t border-white/10 pt-8"
          >
            <div className="flex gap-12">
              {[
                { num: '100%', label: 'Anonymous' },
                { num: '24/7', label: 'Available' },
                { num: '0', label: 'Compromises' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-bold text-white">
                    {stat.num}
                  </div>
                  <div className="text-[10px] tracking-widest text-white/40 uppercase">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              <Plus className="h-6 w-6 text-[#C15B3E]/40" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
