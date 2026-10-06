import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Sun, Moon, Globe, Search, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import logo from '@/img/DANIA LOGO PNG-01.png'; // استيراد الشعار

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const { t, setLanguageDirect, direction, language } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const languageDropdownRef = useRef(null);

  const navigation = [
    { name: t('home'), href: '/' },
    { name: t('about'), href: '/about' },
    { name: t('products'), href: '/products' },
    { name: t('gallery'), href: '/gallery' },
    { name: t('contact'), href: '/contact' },
    { name: t('admin'), href: '/admin' }
  ];

  const languages = [
    { code: 'ar', name: 'العربية', label: 'عربي' },
    { code: 'en', name: 'English', label: 'EN' },
    { code: 'fr', name: 'Français', label: 'FR' }
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (languageDropdownRef.current && !languageDropdownRef.current.contains(event.target)) {
        setIsLanguageDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    toast({
      title: t('featureNotImplemented'),
      duration: 3000,
    });
  };

  const getLanguageLabel = () => {
    switch (language) {
      case 'ar':
        return 'عربي';
      case 'en':
        return 'EN';
      case 'fr':
        return 'FR';
      default:
        return 'عربي';
    }
  };

  const handleLanguageChange = (langCode) => {
    setLanguageDirect(langCode);
    setIsLanguageDropdownOpen(false);
  };

  const iconButtonVariants = {
    hover: { scale: 1.1, rotate: 5 },
    tap: { scale: 0.9, rotate: -5 },
  };

  // Determine font class based on language
  const getFontClass = () => {
    return language === 'ar' ? 'font-arabic' : 'font-english';
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-effect">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-2">
            <motion.img
              src={logo}
              alt="Dāniya Logo"
              className="h-12 w-auto"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            />
          </Link>

          <div className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => (
              <Button key={item.name} asChild variant="ghost" className={`text-base ${getFontClass()}`}>
                <Link
                  to={item.href}
                  className={`relative transition-colors hover:text-primary ${
                    location.pathname === item.href ? 'text-primary' : 'text-foreground/80'
                  }`}
                >
                  {item.name}
                  {location.pathname === item.href && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                      layoutId="underline"
                    />
                  )}
                </Link>
              </Button>
            ))}
          </div>

          <div className="flex items-center space-x-1">
            <motion.div variants={iconButtonVariants} whileHover="hover" whileTap="tap">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="rounded-full"
              >
                <Search className="h-5 w-5" />
              </Button>
            </motion.div>
            
            <motion.div variants={iconButtonVariants} whileHover="hover" whileTap="tap">
              <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full">
                {theme === 'light' ? (
                  <Moon className="h-5 w-5" />
                ) : (
                  <Sun className="h-5 w-5" />
                )}
              </Button>
            </motion.div>

            <motion.div variants={iconButtonVariants} whileHover="hover" whileTap="tap" className="relative" ref={languageDropdownRef}>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)} 
                className="rounded-full flex items-center gap-1 px-3"
              >
                <Globe className="h-4 w-4" />
                <span className={`text-xs font-medium ${getFontClass()}`}>{getLanguageLabel()}</span>
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isLanguageDropdownOpen ? 'rotate-180' : ''}`} />
              </Button>

              {isLanguageDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 top-12 z-50 min-w-[140px]"
                >
                  <div className="bg-background border border-border rounded-lg shadow-lg overflow-hidden">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => handleLanguageChange(lang.code)}
                        className={`w-full text-left px-4 py-3 text-sm transition-colors hover:bg-accent ${
                          language === lang.code ? 'bg-accent text-accent-foreground' : 'text-foreground'
                        } ${lang.code === 'ar' ? 'font-arabic' : 'font-english'}`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{lang.name}</span>
                          {language === lang.code && (
                            <div className="w-2 h-2 bg-primary rounded-full" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>

            <div className="lg:hidden">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>

        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="pb-4"
          >
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="text"
                placeholder={t('search')}
                className={`pr-10 ${getFontClass()}`}
                autoFocus
              />
              <Button
                type="submit"
                size="icon"
                variant="ghost"
                className="absolute right-0 top-0 h-full rounded-full"
              >
                <Search className="h-4 w-4" />
              </Button>
            </form>
          </motion.div>
        )}

        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden py-4 border-t border-border/50"
          >
            <div className="flex flex-col space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-3 py-2 text-base font-medium rounded-md transition-colors ${getFontClass()} ${
                    location.pathname === item.href
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground/80 hover:bg-accent hover:text-accent-foreground'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </nav>
    </header>
  );
};

export default Header;