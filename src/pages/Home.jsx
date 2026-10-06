import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Leaf, Award } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AdvertisementSlider from '@/components/AdvertisementSlider';

const Home = () => {
  const { t, direction, language } = useLanguage();
  const [advertisements, setAdvertisements] = useState([]);

  // تحميل الإعلانات من localStorage
  useEffect(() => {
    const savedAds = JSON.parse(localStorage.getItem('dania-advertisements') || '[]');
    setAdvertisements(savedAds);
  }, []);

  // Determine font class based on language
  const getFontClass = () => {
    return language === 'ar' ? 'font-arabic' : 'font-english';
  };

  const categories = [
    { name: t('dates'), description: t('datesDescription'), image: 'https://images.unsplash.com/photo-1570197785710-bddf3f0d0b24', href: '/products?category=dates' },
    { name: t('honey'), description: t('honeyDescription'), image: 'https://images.unsplash.com/photo-1502447535320-0bcc5aae2a37', href: '/products?category=honey' },
    { name: t('nuts'), description: t('nutsDescription'), image: 'https://images.unsplash.com/photo-1600180758895-eae2c1914302', href: '/products?category=nuts' },
    { name: t('spices'), description: t('spicesDescription'), image: 'https://images.unsplash.com/photo-1592928301960-9708de56057b', href: '/products?category=spices' },
    { name: t('foodItems'), description: t('foodItemsDescription'), image: 'https://images.unsplash.com/photo-1584270354949-5cdc6bf9c84e', href: '/products?category=food' },
    { name: t('naturalOils'), description: t('naturalOilsDescription'), image: 'https://images.unsplash.com/photo-1566843972521-5260df9cea3f', href: '/products?category=oils' }
  ];

  const features = [
    { 
      icon: Leaf, 
      title: t('natural'), 
      description: t('naturalDescription')
    },
    { 
      icon: Award, 
      title: t('quality'), 
      description: t('qualityDescription')
    }
  ];

  return (
    <>
      <Helmet>
        <title>{t('welcomeTitle')} - Dāniya Spices</title>
        <meta name="description" content={t('welcomeSubtitle')} />
      </Helmet>

      <div className="min-h-screen">
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden hero-pattern border-b border-light-gray/20 dark:border-light-gray/10">
          <img
            src="/img/صورة القصه.jpg"
            alt="خلفية شفافة"
            className="transparent-bg-story"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 via-orange-500/20 to-dark-wood/20 dark:from-amber-500/10 dark:via-orange-500/10 dark:to-dark-wood/10" />
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: direction === 'rtl' ? 50 : -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center lg:text-left"
              >
                <h1 className={`text-4xl md:text-6xl font-bold text-foreground dark:text-ivory-white mb-6 text-shadow ${getFontClass()}`}>
                  {t('welcomeTitle')}
                </h1>
                <p className={`text-xl md:text-2xl text-muted-foreground dark:text-ivory-white/90 mb-8 leading-relaxed ${getFontClass()}`}>
                  {t('welcomeSubtitle')}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button asChild size="lg" className={`spice-gradient text-white shadow-lg hover:shadow-xl transition-all duration-300 ${getFontClass()}`}>
                    <Link to="/products">
                      {t('exploreProducts')}
                      <ArrowRight className={`ml-2 h-5 w-5 ${direction === 'rtl' ? 'rotate-180' : ''}`} />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className={`border-light-gray/30 bg-white/80 backdrop-blur-sm hover:bg-gold-accent hover:text-white transition-all duration-300 dark:bg-dark-wood/80 dark:border-light-gray/20 dark:text-ivory-white dark:hover:bg-gold-accent dark:hover:text-white ${getFontClass()}`}>
                    <Link to="/about">
                      {t('learnMore')}
                    </Link>
                  </Button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-light-gray/20 shadow-lg dark:bg-dark-wood/20 dark:border-light-gray/10 dark:shadow-2xl">
                <AdvertisementSlider advertisements={advertisements} />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-b from-background to-secondary/20 border-b border-light-gray/10 dark:from-dark-wood dark:to-dark-wood/80 dark:border-light-gray/5">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <div className="inline-block w-24 h-1 bg-gradient-to-r from-gold-accent to-amber-500 rounded-full mb-6"></div>
              <h2 className={`text-3xl md:text-4xl font-bold text-foreground dark:text-ivory-white mb-4 ${getFontClass()}`}>
                {t('productsTitle')}
              </h2>
              <p className={`text-xl text-muted-foreground dark:text-ivory-white/80 max-w-2xl mx-auto ${getFontClass()}`}>
                {t('productsSubtitle')}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categories.map((category, index) => (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="category-card hover-lift group cursor-pointer h-full bg-white/90 backdrop-blur-sm border border-light-gray/20 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden dark:bg-dark-wood/90 dark:border-light-gray/10 dark:shadow-2xl dark:hover:shadow-3xl">
                    <Link to={category.href}>
                      <div className="relative overflow-hidden rounded-t-lg border-b border-light-gray/10 dark:border-light-gray/5">
                        <img  
                          alt={category.name}
                          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                          src={category.image} />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-md dark:bg-dark-wood/90 dark:shadow-2xl">
                          <ArrowRight className={`h-4 w-4 text-dark-wood dark:text-ivory-white ${direction === 'rtl' ? 'rotate-180' : ''}`} />
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <h3 className={`text-xl font-semibold text-dark-wood dark:text-ivory-white mb-2 ${getFontClass()}`}>
                          {category.name}
                        </h3>
                        <p className={`text-charcoal-black/70 dark:text-ivory-white/70 mb-4 leading-relaxed ${getFontClass()}`}>
                          {category.description}
                        </p>
                        <Button variant="outline" size="sm" className={`w-full rounded-lg bg-white/80 backdrop-blur-sm border-light-gray/30 hover:bg-gold-accent hover:text-white transition-all duration-300 dark:bg-dark-wood/80 dark:border-light-gray/20 dark:text-ivory-white dark:hover:bg-gold-accent dark:hover:text-white ${getFontClass()}`}>
                          {t('viewProducts')}
                          <ArrowRight className={`ml-2 h-4 w-4 ${direction === 'rtl' ? 'rotate-180' : ''}`} />
                        </Button>
                      </CardContent>
                    </Link>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-r from-sand-beige via-ivory-white to-sand-beige border-b border-light-gray/10 dark:from-dark-wood dark:via-dark-wood/90 dark:to-dark-wood dark:border-light-gray/5">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <div className="inline-block w-24 h-1 bg-gradient-to-r from-gold-accent to-amber-500 rounded-full mb-6"></div>
              <h2 className={`text-3xl md:text-4xl font-bold text-dark-wood dark:text-ivory-white mb-4 ${getFontClass()}`}>
                {t('whyChooseUs')}
              </h2>
              <p className={`text-xl text-charcoal-black/80 dark:text-ivory-white/80 max-w-2xl mx-auto ${getFontClass()}`}>
                {t('whyChooseUsDesc')}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center group"
                >
                  <Card className="bg-white/80 backdrop-blur-sm border border-light-gray/20 shadow-lg hover:shadow-xl transition-all duration-300 p-6 relative overflow-hidden dark:bg-dark-wood/80 dark:border-light-gray/10 dark:shadow-2xl dark:hover:shadow-3xl">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold-accent to-amber-500"></div>
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-gold-accent to-amber-500 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300 shadow-md">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                    <h3 className={`text-xl font-semibold text-dark-wood dark:text-ivory-white mb-2 ${getFontClass()}`}>
                    {feature.title}
                  </h3>
                    <p className={`text-charcoal-black/70 dark:text-ivory-white/70 leading-relaxed ${getFontClass()}`}>
                    {feature.description}
                  </p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;