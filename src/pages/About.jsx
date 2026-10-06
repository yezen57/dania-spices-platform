import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Target, Eye, Heart, Award, Users, Leaf } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';

const About = () => {
  const { t, language } = useLanguage();

  // Determine font class based on language
  const getFontClass = () => {
    return language === 'ar' ? 'font-arabic' : 'font-english';
  };

  const values = [
    {
      icon: Heart,
      title: t('quality'),
      description: t('qualityCommitment')
    },
    {
      icon: Leaf,
      title: t('natural'),
      description: t('naturalProducts')
    },
    {
      icon: Users,
      title: t('customerSatisfaction'),
      description: t('customerFirst')
    },
    {
      icon: Award,
      title: t('excellence'),
      description: t('striveExcellence')
    }
  ];

  const stats = [
    { number: '12+', label: t('yearsExperience') },
    { number: '5000+', label: t('happyCustomers') },
    { number: '70+', label: t('uniqueProducts') },
    { number: '24/7', label: t('support') }
  ];

  return (
    <>
      <Helmet>
        <title>{t('about')} - Dāniya Spices</title>
        <meta name="description" content={t('aboutDescription')} />
      </Helmet>

      <div className="min-h-screen pt-16">
        <img
          src="/img/صورة القصه.jpg"
          alt="خلفية شفافة"
          className="transparent-bg-story"
        />
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden hero-pattern border-b border-light-gray/20 dark:border-light-gray/10">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 via-orange-500/20 to-dark-wood/20 dark:from-amber-500/10 dark:via-orange-500/10 dark:to-dark-wood/10" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className={`text-4xl md:text-5xl font-bold text-dark-wood dark:text-ivory-white mb-6 ${getFontClass()}`}>
                  {t('aboutTitle')}
                </h1>
                <p className={`text-lg text-charcoal-black/90 dark:text-ivory-white/90 leading-relaxed mb-8 ${getFontClass()}`}>
                  {t('aboutDescription')}
                </p>
                <div className="grid grid-cols-2 gap-6">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-light-gray/20 dark:bg-dark-wood/20 dark:border-light-gray/10"
                    >
                      <div className={`text-3xl font-bold text-gold-accent mb-2 ${getFontClass()}`}>
                        {stat.number}
                      </div>
                      <div className={`text-sm text-charcoal-black/80 dark:text-ivory-white/80 ${getFontClass()}`}>
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-light-gray/20 dark:border-light-gray/10">
                  <img  
                    alt="قصة دانية"
                    className="w-full h-[500px] object-cover"
                    src="/img/صورة القصه.jpg" />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-wood/50 to-transparent" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-background border-b border-light-gray/10 dark:border-light-gray/5">
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
                {t('ourVision')} & {t('ourMission')}
              </h2>
              <p className={`text-xl text-charcoal-black/80 dark:text-ivory-white/80 max-w-2xl mx-auto ${getFontClass()}`}>
                {t('aboutDescription')}
              </p>
            </motion.div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Card className="h-full bg-white/90 backdrop-blur-sm border border-light-gray/20 shadow-lg hover:shadow-xl transition-all duration-300 dark:bg-dark-wood/90 dark:border-light-gray/10 dark:shadow-2xl dark:hover:shadow-3xl rounded-2xl">
                  <CardContent className="p-8">
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center mr-4 shadow-md">
                        <Eye className="h-6 w-6 text-white" />
                      </div>
                      <h2 className={`text-2xl font-bold text-dark-wood dark:text-ivory-white ${getFontClass()}`}>
                        {t('ourVision')}
                      </h2>
                    </div>
                    <p className={`text-charcoal-black/70 dark:text-ivory-white/70 leading-relaxed ${getFontClass()}`}>
                      {t('visionText')}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="h-full bg-white/90 backdrop-blur-sm border border-light-gray/20 shadow-lg hover:shadow-xl transition-all duration-300 dark:bg-dark-wood/90 dark:border-light-gray/10 dark:shadow-2xl dark:hover:shadow-3xl rounded-2xl">
                  <CardContent className="p-8">
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-dark-wood to-orange-500 rounded-full flex items-center justify-center mr-4 shadow-md">
                        <Target className="h-6 w-6 text-white" />
                      </div>
                      <h2 className={`text-2xl font-bold text-dark-wood dark:text-ivory-white ${getFontClass()}`}>
                        {t('ourMission')}
                      </h2>
                    </div>
                    <p className={`text-charcoal-black/70 dark:text-ivory-white/70 leading-relaxed ${getFontClass()}`}>
                      {t('missionText')}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
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
                {t('coreValues')}
              </h2>
              <p className={`text-xl text-charcoal-black/80 dark:text-ivory-white/80 max-w-2xl mx-auto ${getFontClass()}`}>
                {t('coreValuesDesc')}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="text-center h-full hover-lift group bg-white/80 backdrop-blur-sm border border-light-gray/20 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden dark:bg-dark-wood/80 dark:border-light-gray/10 dark:shadow-2xl dark:hover:shadow-3xl rounded-2xl">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold-accent to-amber-500"></div>
                    <CardContent className="p-6">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-gold-accent to-amber-500 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300 shadow-md">
                        <value.icon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className={`text-xl font-semibold text-dark-wood dark:text-ivory-white mb-3 ${getFontClass()}`}>
                        {value.title}
                      </h3>
                      <p className={`text-charcoal-black/70 dark:text-ivory-white/70 leading-relaxed ${getFontClass()}`}>
                        {value.description}
                      </p>
                    </CardContent>
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

export default About;