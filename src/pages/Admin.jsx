import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AdminStats from '@/pages/Admin/AdminStats';
import ProductManagement from '@/pages/Admin/ProductManagement';
import GalleryManagement from '@/pages/Admin/GalleryManagement';
import AdvertisementManagement from '@/pages/Admin/AdvertisementManagement';
import ContactMessages from '@/pages/Admin/ContactMessages';
import { Package, Users, Image as ImageIcon, Megaphone } from 'lucide-react';

const Admin = () => {
  const { t, language } = useLanguage();
  const [products, setProducts] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);
  const [advertisements, setAdvertisements] = useState([]);

  // Determine font class based on language
  const getFontClass = () => {
    return language === 'ar' ? 'font-arabic' : 'font-english';
  };

  useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem('dania-products') || '[]');
    const savedContacts = JSON.parse(localStorage.getItem('dania-contacts') || '[]');
    const savedGallery = JSON.parse(localStorage.getItem('dania-gallery') || '[]');
    const savedAds = JSON.parse(localStorage.getItem('dania-advertisements') || '[]');
    
    setProducts(savedProducts);
    setContacts(savedContacts);
    setGalleryImages(savedGallery);
    setAdvertisements(savedAds);
  }, []);
  
  const stats = [
    { title: t('totalProducts'), value: products.length, icon: Package, color: 'from-gold-accent to-amber-500' },
    { title: t('contactMessages'), value: contacts.length, icon: Users, color: 'from-gold-accent to-amber-500' },
    { title: t('galleryImages'), value: galleryImages.length, icon: ImageIcon, color: 'from-gold-accent to-amber-500' },
    { title: t('advertisements'), value: advertisements.length, icon: Megaphone, color: 'from-gold-accent to-amber-500' },
  ];

  return (
    <>
      <Helmet>
        <title>{t('admin')} - Dāniya Spices</title>
        <meta name="description" content="Admin panel for managing Dāniya Spices website" />
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
                {t('adminTitle')}
              </h1>
              <div className="mx-auto w-24 h-1 bg-gradient-to-r from-gold-accent to-amber-500 rounded-full mb-6"></div>
              <p className={`text-xl text-charcoal-black/80 dark:text-ivory-white/80 max-w-2xl mx-auto ${getFontClass()}`}>
                {t('manageWebsiteContent')}
              </p>
            </motion.div>
          </div>
        </section>

        <AdminStats stats={stats} />

        <section className="py-12 bg-gradient-to-b from-ivory-white to-sand-beige/30 border-b border-light-gray/30 dark:from-dark-wood/90 dark:to-dark-wood/70 dark:border-light-gray/10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Tabs defaultValue="products" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4 bg-white/80 backdrop-blur-sm border border-light-gray/30 rounded-xl shadow-sm dark:bg-dark-wood/80 dark:border-light-gray/20 dark:shadow-2xl">
                <TabsTrigger value="products" className={`text-sm text-dark-wood dark:text-ivory-white data-[state=active]:bg-gold-accent data-[state=active]:text-white rounded-lg ${getFontClass()}`}>{t('manageProducts')}</TabsTrigger>
                <TabsTrigger value="advertisements" className={`text-sm text-dark-wood dark:text-ivory-white data-[state=active]:bg-gold-accent data-[state=active]:text-white rounded-lg ${getFontClass()}`}>{t('advertisementManagement')}</TabsTrigger>
                <TabsTrigger value="gallery" className={`text-sm text-dark-wood dark:text-ivory-white data-[state=active]:bg-gold-accent data-[state=active]:text-white rounded-lg ${getFontClass()}`}>{t('galleryManagement')}</TabsTrigger>
                <TabsTrigger value="contacts" className={`text-sm text-dark-wood dark:text-ivory-white data-[state=active]:bg-gold-accent data-[state=active]:text-white rounded-lg ${getFontClass()}`}>{t('contactMessages')}</TabsTrigger>
              </TabsList>

              <TabsContent value="products">
                <ProductManagement products={products} setProducts={setProducts} />
              </TabsContent>

              <TabsContent value="advertisements">
                <AdvertisementManagement advertisements={advertisements} setAdvertisements={setAdvertisements} />
              </TabsContent>

              <TabsContent value="gallery">
                <GalleryManagement images={galleryImages} setImages={setGalleryImages} />
              </TabsContent>

              <TabsContent value="contacts">
                <ContactMessages contacts={contacts} />
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </div>
    </>
  );
};

export default Admin;