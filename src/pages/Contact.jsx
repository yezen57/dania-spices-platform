import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';

const Contact = () => {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  // Determine font class based on language
  const getFontClass = () => {
    return language === 'ar' ? 'font-arabic' : 'font-english';
  };

  const mapUrl = "https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=H4RW%2BR58+Centre+Commercial,+Al+Hamoudi,+Djibouti";

  const contactInfo = [
    {
      icon: MapPin,
      title: t('addressTitle'),
      details: [t('address')]
    },
    {
      icon: Phone,
      title: t('phoneTitle'),
      details: [t('phone')]
    },
    {
      icon: Mail,
      title: t('emailTitle'),
      details: [t('storeEmail')]
    },
    {
      icon: Clock,
      title: t('workingHoursTitle'),
      details: [t('workingHours')]
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const contacts = JSON.parse(localStorage.getItem('dania-contacts') || '[]');
    const newContact = {
      id: Date.now(),
      ...formData,
      timestamp: new Date().toISOString()
    };
    contacts.push(newContact);
    localStorage.setItem('dania-contacts', JSON.stringify(contacts));

    toast({
      title: t('messageSentSuccess'),
      description: t('willContactSoon'),
      duration: 5000,
    });

    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <>
      <Helmet>
        <title>{t('contact')} - Dāniya Spices</title>
        <meta name="description" content={t('contactSubtitle')} />
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
                {t('contactTitle')}
              </h1>
              <div className="mx-auto w-24 h-1 bg-gradient-to-r from-gold-accent to-amber-500 rounded-full mb-6"></div>
              <p className={`text-xl text-charcoal-black/80 dark:text-ivory-white/80 max-w-2xl mx-auto ${getFontClass()}`}>
                {t('contactSubtitle')}
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-b from-ivory-white to-sand-beige/30 border-b border-light-gray/30 dark:from-dark-wood/90 dark:to-dark-wood/70 dark:border-light-gray/10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Card className="bg-white/90 backdrop-blur-sm border-2 border-light-gray/30 shadow-xl rounded-2xl dark:bg-dark-wood/90 dark:border-light-gray/10 dark:shadow-2xl">
                  <CardHeader>
                    <CardTitle className={`text-2xl text-dark-wood dark:text-ivory-white ${getFontClass()}`}>
                      {t('sendMessage')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <Label htmlFor="name" className={`text-dark-wood dark:text-ivory-white ${getFontClass()}`}>{t('name')}</Label>
                        <Input id="name" name="name" type="text" value={formData.name} onChange={handleChange} required className={`mt-1 bg-white/80 backdrop-blur-sm border border-light-gray/30 dark:bg-dark-wood/80 dark:border-light-gray/20 dark:text-ivory-white dark:placeholder:text-ivory-white/60 ${getFontClass()}`} />
                      </div>
                      <div>
                        <Label htmlFor="email" className={`text-dark-wood dark:text-ivory-white ${getFontClass()}`}>{t('email')}</Label>
                        <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required className={`mt-1 bg-white/80 backdrop-blur-sm border border-light-gray/30 dark:bg-dark-wood/80 dark:border-light-gray/20 dark:text-ivory-white dark:placeholder:text-ivory-white/60 ${getFontClass()}`} />
                      </div>
                      <div>
                        <Label htmlFor="phone" className={`text-dark-wood dark:text-ivory-white ${getFontClass()}`}>{t('phoneOptional')}</Label>
                        <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} className={`mt-1 bg-white/80 backdrop-blur-sm border border-light-gray/30 dark:bg-dark-wood/80 dark:border-light-gray/20 dark:text-ivory-white dark:placeholder:text-ivory-white/60 ${getFontClass()}`} />
                      </div>
                      <div>
                        <Label htmlFor="message" className={`text-dark-wood dark:text-ivory-white ${getFontClass()}`}>{t('message')}</Label>
                        <Textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows={5} className={`mt-1 bg-white/80 backdrop-blur-sm border border-light-gray/30 dark:bg-dark-wood/80 dark:border-light-gray/20 dark:text-ivory-white dark:placeholder:text-ivory-white/60 ${getFontClass()}`} />
                      </div>
                      <Button type="submit" className={`w-full bg-gold-accent text-white hover:bg-dark-wood transition-colors rounded-lg shadow-sm dark:hover:bg-amber-600 ${getFontClass()}`}>
                        <Send className="h-4 w-4 mr-2" />
                        {t('send')}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-6"
              >
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.title}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className="bg-white/90 backdrop-blur-sm border-2 border-light-gray/30 shadow-xl rounded-2xl hover-lift transition-all duration-300 dark:bg-dark-wood/90 dark:border-light-gray/10 dark:shadow-2xl dark:hover:shadow-3xl">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-gold-accent to-amber-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                            <info.icon className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h3 className={`text-lg font-semibold text-dark-wood dark:text-ivory-white mb-2 ${getFontClass()}`}>
                              {info.title}
                            </h3>
                            {info.details.map((detail, idx) => (
                              <p key={idx} className={`text-charcoal-black/80 dark:text-ivory-white/80 ${getFontClass()}`}>
                                {detail}
                              </p>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-r from-sand-beige via-ivory-white to-sand-beige border-b border-light-gray/30 dark:from-dark-wood dark:via-dark-wood/90 dark:to-dark-wood dark:border-light-gray/10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className={`text-3xl md:text-4xl font-bold text-dark-wood dark:text-ivory-white mb-4 ${getFontClass()}`}>
                {t('ourLocation')}
              </h2>
              <div className="mx-auto w-24 h-1 bg-gradient-to-r from-gold-accent to-amber-500 rounded-full mb-6"></div>
              <p className={`text-xl text-charcoal-black/80 dark:text-ivory-white/80 max-w-2xl mx-auto ${getFontClass()}`}>
                {t('visitUs')}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative rounded-2xl overflow-hidden shadow-2xl border border-light-gray/20 dark:border-light-gray/10"
            >
              <iframe
                src={mapUrl}
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-96"
              ></iframe>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Contact;