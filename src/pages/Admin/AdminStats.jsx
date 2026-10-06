import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

const AdminStats = ({ stats }) => {
  const { language } = useLanguage();

  // Determine font class based on language
  const getFontClass = () => {
    return language === 'ar' ? 'font-arabic' : 'font-english';
  };

  return (
    <section className="py-12 bg-gradient-to-b from-sand-beige/20 to-ivory-white border-b border-light-gray/30 dark:from-dark-wood/70 dark:to-dark-wood/90 dark:border-light-gray/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="admin-card hover-lift bg-white/90 backdrop-blur-sm border-2 border-light-gray/30 shadow-xl rounded-2xl transition-all duration-300 dark:bg-dark-wood/90 dark:border-light-gray/10 dark:shadow-2xl">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`text-charcoal-black/70 text-sm dark:text-ivory-white/70 ${getFontClass()}`}>{stat.title}</p>
                      <p className={`text-3xl font-bold text-dark-wood dark:text-ivory-white ${getFontClass()}`}>{stat.value}</p>
                    </div>
                    <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-full flex items-center justify-center shadow-md`}>
                      <stat.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdminStats;