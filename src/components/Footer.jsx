import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail, Clock, MessageCircle, Youtube } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

// TikTok SVG icon
const TikTokIcon = (props) => (
  <svg viewBox="0 0 32 32" fill="currentColor" height="1em" width="1em" {...props}>
    <path d="M28.5 10.5c-2.1 0-3.8-1.7-3.8-3.8V4h-4.1v18.2c0 2.1-1.7 3.8-3.8 3.8s-3.8-1.7-3.8-3.8 1.7-3.8 3.8-3.8c.3 0 .5 0 .8.1v-4.2c-.3 0-.5-.1-.8-.1-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8V14c1.1.7 2.4 1.1 3.8 1.1v-4.6z" />
  </svg>
);

const Footer = () => {
  const { t, language } = useLanguage();

  // Determine font class based on language
  const getFontClass = () => {
    return language === 'ar' ? 'font-arabic' : 'font-english';
  };

  const quickLinks = [
    { name: t('home'), href: '/' },
    { name: t('about'), href: '/about' },
    { name: t('products'), href: '/products' },
    { name: t('gallery'), href: '/gallery' },
    { name: t('contact'), href: '/contact' }
  ];

  const productLinks = [
    { name: t('dates'), href: '/products?category=dates' },
    { name: t('honey'), href: '/products?category=honey' },
    { name: t('nuts'), href: '/products?category=nuts' },
    { name: t('spices'), href: '/products?category=spices' },
    { name: t('foodItems'), href: '/products?category=food' },
    { name: t('naturalOils'), href: '/products?category=oils' }
  ];

  const socialLinks = [
    { icon: MessageCircle, href: 'https://wa.me/25377760000', label: 'WhatsApp' },
    { icon: Instagram, href: 'https://www.instagram.com/dania.spices/', label: 'Instagram' },
    { icon: TikTokIcon, href: 'https://tiktok.com', label: 'TikTok' },
    { icon: Youtube, href: 'https://www.youtube.com/@dania.spices', label: 'YouTube' },
    { icon: Facebook, href: 'https://www.facebook.com/people/daniaspices/61571399192741/?mibextid=qi2Omg&rdid=hktbqGYsdqE6y8q5&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F14SxjK4zXC%2F%3Fmibextid%3Dqi2Omg', label: 'Facebook' },
  ];

  return (
    <footer className="glass-effect border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="space-y-4">
            <motion.img
              src="https://storage.googleapis.com/hostinger-horizons-assets-prod/4b387089-9ca5-4ca2-94db-1377b23a4e70/b22bbb33e62a556f2f2594d1fee88b79.png"
              alt="Dāniya Logo"
              className="h-12 w-auto"
              whileHover={{ scale: 1.05 }}
            />
            <p className={`text-muted-foreground text-sm leading-relaxed ${getFontClass()}`}>
              {t('aboutDescription')}
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <span className={`text-lg font-semibold text-foreground mb-4 block ${getFontClass()}`}>
              {t('quickLinks')}
            </span>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className={`text-muted-foreground hover:text-primary transition-colors text-sm ${getFontClass()}`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className={`text-lg font-semibold text-foreground mb-4 block ${getFontClass()}`}>
              {t('products')}
            </span>
            <ul className="space-y-2">
              {productLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className={`text-muted-foreground hover:text-primary transition-colors text-sm ${getFontClass()}`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className={`text-lg font-semibold text-foreground mb-4 block ${getFontClass()}`}>
              {t('contactInfo')}
            </span>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-primary mt-1" />
                <a
                  href="https://www.google.com/viewer/place?client=ms-android-att-us-revc&sca_esv=b5d146501cb8d5e6&hl=ar-YE&cs=1&output=search&mid=/g/11rpq8hv11&pip=CiTYqNmH2KfYsdin2Kog2K_Yp9mG2YrYqSDYrNmK2KjZiNiq2YoQAg%3D%3D&lqi=CiTYqNmH2KfYsdin2Kog2K_Yp9mG2YrYqSDYrNmK2KjZiNiq2YpIodCf5Na3gIAIWjIQABABEAIYABgBGAIiJNio2YfYp9ix2KfYqiDYr9in2YbZitipINis2YrYqNmI2KrZipIBFWhlcmJhbF9tZWRpY2luZV9zdG9yZZoBJENoZERTVWhOTUc5blMwVkpRMEZuU1VOcU9IVjViblpCUlJBQqoBdAoIL20vMDZwMzUQASobIhfYqNmH2KfYsdin2Kog2K_Yp9mG2YrYqSg2Mh8QASIbYD270hZV18E_0wXD7YWxdzTdN6SLZdu-MkDcMigQAiIk2KjZh9in2LHYp9iqINiv2KfZhtmK2Kkg2KzZitio2YjYqtmK-gEECAAQSA&phdesc=n22dPvbJywI&sa=X&ved=2ahUKEwiyiZTqt5yOAxU9VKQEHZnYJa4QkbkFKAB6BAgJEAg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-muted-foreground text-sm hover:text-primary underline transition-colors ${getFontClass()}`}
                >
                  {t('address')}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-primary" />
                <span className={`text-muted-foreground text-sm ${getFontClass()}`}>
                  {t('phone')}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-primary" />
                <a
                  href={`mailto:${t('storeEmail')}`}
                  className={`text-muted-foreground text-sm hover:text-primary underline transition-colors ${getFontClass()}`}
                >
                  {t('storeEmail')}
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="h-4 w-4 text-primary mt-1" />
                <span className={`text-muted-foreground text-sm whitespace-pre-line ${getFontClass()}`}>
                  {t('workingHours')}
                </span>
              </div>
            </div>
          </div>

          <div>
            <span className={`text-lg font-semibold text-foreground mb-4 block ${getFontClass()}`}>
              {t('followUs')}
            </span>
            <p className={`text-muted-foreground text-sm mb-4 ${getFontClass()}`}>
              {t('followUsText')}
            </p>
            <div className="flex space-x-2">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-accent hover:bg-accent/80 p-2 rounded-lg transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="h-4 w-4 text-accent-foreground" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className={`text-muted-foreground text-sm ${getFontClass()}`}>
            {t('copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;