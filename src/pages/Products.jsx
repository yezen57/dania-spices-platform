import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Search, Filter, Grid, List, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/components/ui/use-toast';

const Products = () => {
  const { t, direction, language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [products, setProducts] = useState([]);

  // Determine font class based on language
  const getFontClass = () => {
    return language === 'ar' ? 'font-arabic' : 'font-english';
  };

  const categories = [
    { id: 'all', name: t('all') },
    { id: 'dates', name: t('dates') },
    { id: 'honey', name: t('honey') },
    { id: 'nuts', name: t('nuts') },
    { id: 'spices', name: t('spices') },
    { id: 'food', name: t('foodItems') },
    { id: 'oils', name: t('naturalOils') }
  ];

  // Mock products data
  useEffect(() => {
    const mockProducts = [
      {
        id: 1,
        category: 'dates',
        name: t('medjoolDates'),
        nameEn: t('medjoolDates'),
        image: 'https://images.unsplash.com/photo-1570197785710-bddf3f0d0b24',
        price: `45 ${t('fdj')}`,
        description: t('medjoolDatesDesc'),
        rating: 4.8,
        reviews: 156
      },
      {
        id: 2,
        category: 'honey',
        name: t('sidrHoney'),
        nameEn: t('sidrHoney'),
        image: 'https://images.unsplash.com/photo-1502447535320-0bcc5aae2a37',
        price: `120 ${t('fdj')}`,
        description: t('sidrHoneyDesc'),
        rating: 4.9,
        reviews: 203
      },
      {
        id: 3,
        category: 'nuts',
        name: t('mixedNuts'),
        nameEn: t('mixedNuts'),
        image: 'https://images.unsplash.com/photo-1600180758895-eae2c1914302',
        price: `35 ${t('fdj')}`,
        description: t('mixedNutsDesc'),
        rating: 4.7,
        reviews: 89
      },
      {
        id: 4,
        category: 'spices',
        name: t('authenticSaffron'),
        nameEn: t('authenticSaffron'),
        image: 'https://images.unsplash.com/photo-1592928301960-9708de56057b',
        price: `200 ${t('fdj')}`,
        description: t('authenticSaffronDesc'),
        rating: 4.9,
        reviews: 67
      },
      
      {
        id: 5,
        category: 'oils',
        name: t('oliveOil'),
        nameEn: t('oliveOil'),
        image: 'https://images.unsplash.com/photo-1566843972521-5260df9cea3f',
        price: `65 ${t('fdj')}`,
        description: t('oliveOilDesc'),
        rating: 4.8,
        reviews: 134
      },
      {
        id: 6,
        category: 'food',
        name: t('basmatiRice'),
        nameEn: t('basmatiRice'),
        image: 'https://images.unsplash.com/photo-1584270354949-5cdc6bf9c84e',
        price: `25 ${t('fdj')}`,
        description: t('basmatiRiceDesc'),
        rating: 4.6,
        reviews: 78
      }
    ];
    setProducts(mockProducts);
  }, [t]);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (product.nameEn && product.nameEn.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleProductClick = () => {
    toast({
      title: t('featureNotImplemented'),
      duration: 3000,
    });
  };

  return (
    <>
      <Helmet>
        <title>{t('products')} - Dania Spices</title>
        <meta name="description" content={t('productsSubtitle')} />
      </Helmet>

      <div className="min-h-screen pt-16">
        {/* Header */}
        <section className="py-12 bg-gradient-to-r from-sand-beige via-ivory-white to-sand-beige border-b border-light-gray/30 dark:from-dark-wood dark:via-dark-wood/90 dark:to-dark-wood dark:border-light-gray/10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className={`text-4xl md:text-5xl font-bold text-dark-wood dark:text-ivory-white mb-4 ${getFontClass()}`}>
                {t('productsTitle')}
              </h1>
              <div className="mx-auto w-24 h-1 bg-gradient-to-r from-gold-accent to-amber-500 rounded-full mb-6"></div>
              <p className={`text-xl text-charcoal-black/80 dark:text-ivory-white/80 max-w-2xl mx-auto ${getFontClass()}`}>
                {t('productsSubtitle')}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Filters and Search */}
        <section className="py-8 bg-gradient-to-b from-ivory-white to-sand-beige/30 border-b border-light-gray/30 dark:from-dark-wood/90 dark:to-dark-wood/70 dark:border-light-gray/10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between border-b border-light-gray/20 pb-6 mb-6 dark:border-light-gray/10">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground dark:text-ivory-white/60" />
                <Input
                  type="text"
                  placeholder={t('search')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`pl-10 bg-white/80 backdrop-blur-sm border border-light-gray/30 rounded-xl shadow-sm dark:bg-dark-wood/80 dark:border-light-gray/20 dark:text-ivory-white dark:placeholder:text-ivory-white/60 ${getFontClass()}`}
                />
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="bg-white/80 backdrop-blur-sm border border-light-gray/30 rounded-lg shadow-sm dark:bg-dark-wood/80 dark:border-light-gray/20 dark:text-ivory-white dark:hover:bg-gold-accent dark:hover:text-white"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="bg-white/80 backdrop-blur-sm border border-light-gray/30 rounded-lg shadow-sm dark:bg-dark-wood/80 dark:border-light-gray/20 dark:text-ivory-white dark:hover:bg-gold-accent dark:hover:text-white"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Category Tabs */}
            <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mt-6">
              <TabsList className="grid w-full grid-cols-3 lg:grid-cols-7 bg-white/80 backdrop-blur-sm border border-light-gray/30 rounded-xl shadow-sm dark:bg-dark-wood/80 dark:border-light-gray/10 dark:shadow-2xl">
                {categories.map((category) => (
                  <TabsTrigger key={category.id} value={category.id} className={`text-xs lg:text-sm text-dark-wood dark:text-ivory-white data-[state=active]:bg-gold-accent data-[state=active]:text-white rounded-lg ${getFontClass()}`}>
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-12 bg-gradient-to-b from-sand-beige/20 to-ivory-white border-b border-light-gray/30 dark:from-dark-wood/70 dark:to-dark-wood/90 dark:border-light-gray/10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {filteredProducts.length === 0 && (
              <div className="col-span-full text-center py-12">
                <p className={`text-muted-foreground dark:text-ivory-white/70 text-lg ${getFontClass()}`}>
                  {t('noProductsFound')}
                </p>
              </div>
            )}

            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="h-full hover-lift group cursor-pointer bg-white/90 backdrop-blur-sm border border-light-gray/20 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden dark:bg-dark-wood/90 dark:border-light-gray/10 dark:shadow-2xl dark:hover:shadow-3xl">
                      <div className="relative overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-md dark:bg-dark-wood/90 dark:shadow-2xl">
                          <ArrowRight className={`h-4 w-4 text-dark-wood dark:text-ivory-white ${direction === 'rtl' ? 'rotate-180' : ''}`} />
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <h3 className={`text-lg font-semibold text-dark-wood dark:text-ivory-white mb-2 ${getFontClass()}`}>
                          {product.name}
                        </h3>
                        <p className={`text-charcoal-black/70 dark:text-ivory-white/70 mb-4 leading-relaxed ${getFontClass()}`}>
                          {product.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className={`text-lg font-bold text-gold-accent ${getFontClass()}`}>
                            {product.price}
                          </span>
                          <div className="flex items-center gap-1">
                            <span className="text-yellow-500">★</span>
                            <span className={`text-sm text-charcoal-black/70 dark:text-ivory-white/70 ${getFontClass()}`}>
                              {product.rating} ({product.reviews})
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="hover-lift cursor-pointer bg-white/90 backdrop-blur-sm border border-light-gray/20 shadow-lg hover:shadow-xl transition-all duration-300 dark:bg-dark-wood/90 dark:border-light-gray/10 dark:shadow-2xl dark:hover:shadow-3xl">
                      <div className="flex items-center p-6">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-24 h-24 object-cover rounded-lg mr-6"
                        />
                        <div className="flex-1">
                          <h3 className={`text-lg font-semibold text-dark-wood dark:text-ivory-white mb-2 ${getFontClass()}`}>
                            {product.name}
                          </h3>
                          <p className={`text-charcoal-black/70 dark:text-ivory-white/70 mb-2 leading-relaxed ${getFontClass()}`}>
                            {product.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className={`text-lg font-bold text-gold-accent ${getFontClass()}`}>
                              {product.price}
                            </span>
                            <div className="flex items-center gap-1">
                              <span className="text-yellow-500">★</span>
                              <span className={`text-sm text-charcoal-black/70 dark:text-ivory-white/70 ${getFontClass()}`}>
                                {product.rating} ({product.reviews})
                              </span>
                            </div>
                          </div>
                        </div>
                        <ArrowRight className={`h-5 w-5 text-dark-wood dark:text-ivory-white ml-4 ${direction === 'rtl' ? 'rotate-180' : ''}`} />
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default Products;
