import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Image as ImageIcon } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Gallery = () => {
  const { t, language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [images, setImages] = useState([]);

  // Determine font class based on language
  const getFontClass = () => {
    return language === 'ar' ? 'font-arabic' : 'font-english';
  };

  const categories = [
    { id: 'all', name: t('all') },
    { id: 'products', name: t('productsCategory') },
    { id: 'events', name: t('eventsCategory') }
  ];

  useEffect(() => {
    // تحميل الصور من localStorage
    const savedImages = JSON.parse(localStorage.getItem('dania-gallery') || '[]');
    
    // إذا لم تكن هناك صور محفوظة، استخدم الصور الافتراضية
    if (savedImages.length === 0) {
      const defaultImages = [
        { id: 1, category: 'products', title: t('premiumDates'), image: 'https://images.unsplash.com/photo-1570197785710-bddf3f0d0b24' },
        { id: 2, category: 'products', title: t('naturalHoney'), image: 'https://images.unsplash.com/photo-1502447535320-0bcc5aae2a37' },
        { id: 3, category: 'products', title: t('assortedNuts'), image: 'https://images.unsplash.com/photo-1600180758895-eae2c1914302' },
        { id: 4, category: 'products', title: t('aromaticSpices'), image: 'https://images.unsplash.com/photo-1592928301960-9708de56057b' },
        { id: 5, category: 'products', title: t('foodItemsTitle'), image: 'https://images.unsplash.com/photo-1584270354949-5cdc6bf9c84e' },
        { id: 6, category: 'products', title: t('naturalOilsTitle'), image: 'https://images.unsplash.com/photo-1566843972521-5260df9cea3f' },
        { id: 7, category: 'events', title: t('productExhibition'), image: 'https://images.unsplash.com/photo-1549488344-cbb6c34cf08b' },
        { id: 8, category: 'events', title: t('daniyaPavilion'), image: 'https://images.unsplash.com/photo-1578523910372-e31545785b81' },
      ];
      setImages(defaultImages);
    } else {
      setImages(savedImages);
    }
  }, [t]);

  const filteredImages = selectedCategory === 'all' 
    ? images 
    : images.filter(image => image.category === selectedCategory);

  return (
    <>
      <Helmet>
        <title>{t('gallery')} - Dāniya Spices</title>
        <meta name="description" content={t('gallerySubtitle')} />
      </Helmet>

      <div className="min-h-screen pt-16">
        <section className="py-12 bg-gradient-to-r from-sand-beige via-ivory-white to-sand-beige border-b border-light-gray/30 dark:from-dark-wood dark:via-dark-wood/90 dark:to-dark-wood dark:border-light-gray/10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className={`text-4xl md:text-5xl font-bold text-dark-wood dark:text-ivory-white mb-4 ${getFontClass()}`}>
                {t('galleryTitle')}
              </h1>
              <div className="mx-auto w-24 h-1 bg-gradient-to-r from-gold-accent to-amber-500 rounded-full mb-6"></div>
              <p className={`text-xl text-charcoal-black/80 dark:text-ivory-white/80 max-w-2xl mx-auto ${getFontClass()}`}>
                {t('gallerySubtitle')}
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-8 bg-gradient-to-b from-ivory-white to-sand-beige/30 border-b border-light-gray/30 dark:from-dark-wood/90 dark:to-dark-wood/70 dark:border-light-gray/10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
              <TabsList className="grid w-full grid-cols-3 bg-white/80 backdrop-blur-sm border border-light-gray/30 rounded-xl shadow-sm dark:bg-dark-wood/80 dark:border-light-gray/10 dark:shadow-2xl">
                {categories.map((category) => (
                  <TabsTrigger key={category.id} value={category.id} className={`text-xs lg:text-sm text-dark-wood dark:text-ivory-white data-[state=active]:bg-gold-accent data-[state=active]:text-white rounded-lg ${getFontClass()}`}>
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </section>

        <section className="py-12 bg-gradient-to-b from-sand-beige/20 to-ivory-white border-b border-light-gray/30 dark:from-dark-wood/70 dark:to-dark-wood/90 dark:border-light-gray/10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group cursor-pointer"
                >
                  <div className="relative overflow-hidden rounded-2xl border-2 border-light-gray/30 shadow-xl hover:shadow-2xl bg-white/90 backdrop-blur-sm hover-lift transition-all duration-300 dark:bg-dark-wood/90 dark:border-light-gray/10 dark:shadow-2xl dark:hover:shadow-3xl">
                    <img  
                      alt={image.title}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500 rounded-t-2xl"
                      src={image.image}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-2xl">
                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <h3 className={`text-lg font-semibold mb-1 ${getFontClass()}`}>
                          {image.title}
                        </h3>
                      </div>
                    </div>
                    <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-light-gray/30 shadow-sm dark:bg-dark-wood/90 dark:border-light-gray/20 dark:shadow-2xl">
                      <ImageIcon className="h-4 w-4 text-charcoal-black dark:text-ivory-white" />
                    </div>
                    {/* Fallback for broken images */}
                    <div className="absolute inset-0 flex items-center justify-center bg-muted/50 hidden rounded-2xl dark:bg-dark-wood/50">
                      <div className="text-center">
                        <ImageIcon className="h-8 w-8 text-muted-foreground dark:text-ivory-white/60 mx-auto mb-2" />
                        <p className={`text-sm text-muted-foreground dark:text-ivory-white/70 ${getFontClass()}`}>
                          {t('cannotDisplayImage')}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {filteredImages.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <p className={`text-xl text-muted-foreground dark:text-ivory-white/70 ${getFontClass()}`}>
                  {t('noImagesInCategory')}
                </p>
              </motion.div>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default Gallery;