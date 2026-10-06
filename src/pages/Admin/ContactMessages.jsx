import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

const ContactMessages = ({ contacts }) => {
  const { t, language } = useLanguage();

  // Determine font class based on language
  const getFontClass = () => {
    return language === 'ar' ? 'font-arabic' : 'font-english';
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const language = t('contact') === 'اتصل بنا' ? 'ar-SA' : 
                     t('contact') === 'Contact' ? 'en-US' : 'fr-FR';
    return date.toLocaleDateString(language);
  };

  return (
    <div className="space-y-6">
      <h2 className={`text-2xl font-bold text-foreground ${getFontClass()}`}>{t('contactMessages')}</h2>
      <div className="space-y-4">
        {contacts.map((contact, index) => (
          <motion.div
            key={contact.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="admin-card">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className={`font-semibold text-foreground ${getFontClass()}`}>{contact.name}</h3>
                  <span className={`text-muted-foreground text-sm ${getFontClass()}`}>
                    {formatDate(contact.timestamp)}
                  </span>
                </div>
                <p className={`text-muted-foreground text-sm mb-2 ${getFontClass()}`}>{contact.email}</p>
                {contact.phone && <p className={`text-muted-foreground text-sm mb-2 ${getFontClass()}`}>{contact.phone}</p>}
                <p className={`text-foreground ${getFontClass()}`}>{contact.message}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
        {contacts.length === 0 && (
          <Card className="admin-card">
            <CardContent className="p-8 text-center">
              <p className={`text-muted-foreground ${getFontClass()}`}>{t('noMessages')}</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ContactMessages;