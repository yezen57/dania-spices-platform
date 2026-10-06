import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('daniya-language') || 'ar';
  });

  const [direction, setDirection] = useState(() => {
    return language === 'ar' ? 'rtl' : 'ltr';
  });

  useEffect(() => {
    localStorage.setItem('daniya-language', language);
    const newDirection = language === 'ar' ? 'rtl' : 'ltr';
    setDirection(newDirection);
    document.documentElement.dir = newDirection;
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => {
    if (language === 'ar') {
      setLanguage('en');
    } else if (language === 'en') {
      setLanguage('fr');
    } else {
      setLanguage('ar');
    }
  };

  const setLanguageDirect = (newLanguage) => {
    setLanguage(newLanguage);
  };

  const t = (key, options = {}) => {
    const translations = {
      ar: {
        home: 'الرئيسية',
        about: 'من نحن',
        products: 'المنتجات',
        gallery: 'المعرض',
        contact: 'اتصل بنا',
        admin: 'لوحة التحكم',
        
        welcomeTitle: 'مرحباً بكم في دانية',
        welcomeSubtitle: 'جودة الطبيعة في كل حبة',
        exploreProducts: 'استكشف منتجاتنا',
        learnMore: 'اعرف المزيد',
        
        dates: 'تمور',
        honey: 'عسل',
        nuts: 'مكسرات',
        spices: 'توابل',
        foodItems: 'مواد غذائية',
        naturalOils: 'زيوت طبيعية',
        
        aboutTitle: 'قصة دانية: من الأرض إليكم',
        aboutDescription: 'بدأت دانية كحلم في قلب الطبيعة، حيث الجودة والأصالة. نحن نؤمن بأن أفضل النكهات تأتي من مكونات نقية، ولهذا نسافر حول العالم لنختار لكم أجود التوابل، العسل، والتمور. قصتنا هي قصة شغف بالجودة، والتزام بتقديم ما هو طبيعي وصحي.',
        ourVision: 'رؤيتنا',
        visionText: 'أن نكون المصدر الموثوق للمنتجات الطبيعية عالية الجودة في كل منزل.',
        ourMission: 'مهمتنا',
        missionText: 'تقديم منتجات طبيعية أصيلة تعزز جودة الحياة وتلهم تجارب طعام لا تُنسى.',
        
        productsTitle: 'منتجاتنا',
        productsSubtitle: 'اكتشف مجموعتنا المتنوعة من المنتجات الطبيعية عالية الجودة',
        viewProducts: 'عرض المنتجات',
        
        galleryTitle: 'معرض الصور',
        gallerySubtitle: 'استكشف جمال منتجاتنا الطبيعية',
        
        contactTitle: 'تواصل معنا',
        contactSubtitle: 'نحن هنا للإجابة على جميع استفساراتكم',
        name: 'الاسم',
        email: 'بريدك الخاص',
        phoneOptional: 'رقم الهاتف (اختياري)',
        message: 'الرسالة',
        send: 'إرسال',
        
        adminTitle: 'لوحة تحكم المسؤول',
        manageProducts: 'إدارة المنتجات',
        addProduct: 'إضافة منتج',
        editProduct: 'تعديل منتج',
        deleteProduct: 'حذف منتج',
        
        search: 'بحث...',
        all: 'الكل',
        add: 'إضافة',
        update: 'تحديد',
        
        followUs: 'تابعونا',
        followUsText: 'انضموا إلينا على وسائل التواصل الاجتماعي لآخر الأخبار والعروض.',
        quickLinks: 'روابط سريعة',
        contactInfo: 'معلومات التواصل',
        address: 'جيبوتي - سوق حمودي',
        phone: '+25377760000',
        workingHours: 'طوال الأسبوع:\nالسبت - الخميس: 8:00 ص - 12:30 ص\nالجمعة: 4:30 م - 10:00 م',
        copyright: '© 2025 Dāniya Trading | جميع الحقوق محفوظة',
        
        featureNotImplemented: '🚧 هذه الميزة غير مطبقة بعد—لكن لا تقلق! يمكنك طلبها في رسالتك التالية! 🚀',
        addProductSuccess: 'تم إضافة المنتج بنجاح!',
        updateProductSuccess: 'تم تحديث المنتج بنجاح!',
        deleteProductSuccess: 'تم حذف المنتج بنجاح!',
        
        // إضافات للصفحات المختلفة
        quality: 'الجودة',
        qualityCommitment: 'نحن ملتزمون بأعلى معايير الجودة في جميع منتجاتنا',
        natural: 'الطبيعية',
        naturalProducts: 'منتجات طبيعية 100% بدون أي إضافات صناعية',
        customerSatisfaction: 'رضا العملاء',
        customerFirst: 'نضع رضا عملائنا دائمًا في المقام الأول',
        excellence: 'التميز',
        striveExcellence: 'نسعى للتميز في كل ما نقدمه',
        yearsExperience: 'سنوات من الخبرة',
        happyCustomers: 'عملاء سعداء',
        uniqueProducts: 'منتج فريد',
        support: 'دعم فني',
        
        // إدارة الإعلانات
        advertisementManagement: 'إدارة الإعلانات',
        addAdvertisement: 'إضافة إعلان',
        editAdvertisement: 'تعديل الإعلان',
        deleteAdvertisement: 'حذف الإعلان',
        advertisementTitle: 'عنوان الإعلان',
        advertisementDescription: 'وصف الإعلان',
        advertisementLink: 'رابط الإعلان',
        advertisementImage: 'صورة الإعلان',
        uploadImage: 'رفع صورة',
        chooseImage: 'اختيار صورة',
        removeImage: 'إزالة',
        imageUrl: 'رابط الصورة',
        imagePreview: 'معاينة الصورة',
        noAdvertisements: 'لا توجد إعلانات حتى الآن',
        
        // إدارة المعرض
        galleryManagement: 'إدارة المعرض',
        addImage: 'إضافة صورة',
        editImage: 'تعديل الصورة',
        deleteImage: 'حذف الصورة',
        imageTitle: 'عنوان الصورة',
        imageDescription: 'وصف الصورة',
        imageCategory: 'فئة الصورة',
        uploadImageToGallery: 'رفع صورة للمعرض',
        noImages: 'لا توجد صور حتى الآن',
        
        // رسائل التواصل
        contactMessages: 'رسائل التواصل',
        messageDetails: 'تفاصيل الرسالة',
        messageDate: 'تاريخ الرسالة',
        messageStatus: 'حالة الرسالة',
        noMessages: 'لا توجد رسائل حتى الآن',
        
        // إحصائيات لوحة التحكم
        totalProducts: 'إجمالي المنتجات',
        contactMessages: 'رسائل التواصل',
        galleryImages: 'صور المعرض',
        advertisements: 'الإعلانات',
        
        // روابط سريعة
        allProducts: 'جميع المنتجات',
        datesCategory: 'التمور',
        honeyCategory: 'العسل',
        nutsCategory: 'المكسرات',
        spicesCategory: 'التوابل',
        foodCategory: 'المواد الغذائية',
        oilsCategory: 'الزيوت الطبيعية',
        
        // معلومات التواصل
        addressTitle: 'العنوان',
        phoneTitle: 'الهاتف',
        emailTitle: 'البريد الإلكتروني',
        workingHoursTitle: 'ساعات العمل',
        storeEmail: 'daniaspices2024@gmail.com',
        
        // رسائل النجاح
        advertisementAddedSuccess: 'تم إضافة الإعلان بنجاح',
        advertisementUpdatedSuccess: 'تم تحديث الإعلان بنجاح',
        advertisementDeletedSuccess: 'تم حذف الإعلان بنجاح',
        imageAddedSuccess: 'تم إضافة الصورة بنجاح',
        imageUpdatedSuccess: 'تم تحديث الصورة بنجاح',
        imageDeletedSuccess: 'تم حذف الصورة بنجاح',
        messageSentSuccess: 'تم إرسال الرسالة بنجاح',
        
        // رسائل الخطأ
        fileTypeError: 'خطأ في نوع الملف',
        fileTypeErrorDesc: 'يرجى اختيار ملف صورة صالح',
        fileSizeError: 'الملف كبير جداً',
        fileSizeErrorDesc: 'يرجى اختيار صورة بحجم أقل من 5MB',
        imageUploadSuccess: 'تم رفع الصورة بنجاح',
        imageUploadSuccessDesc: 'تم تحميل الصورة وستظهر في الإعلان',
        
        // فئات المعرض
        productsCategory: 'المنتجات',
        eventsCategory: 'الفعاليات',
        
        // أزرار التنقل
        next: 'التالي',
        previous: 'السابق',
        play: 'تشغيل',
        pause: 'إيقاف',
        
        // نصوص عامة
        loading: 'جاري التحميل...',
        error: 'خطأ',
        success: 'نجح',
        cancel: 'إلغاء',
        save: 'حفظ',
        edit: 'تعديل',
        delete: 'حذف',
        close: 'إغلاق',
        submit: 'إرسال',
        reset: 'إعادة تعيين',
        
        // أوصاف المنتجات
        datesDescription: 'تمور طبيعية عالية الجودة',
        honeyDescription: 'عسل طبيعي خالص',
        nutsDescription: 'مكسرات طازجة ومقرمشة',
        spicesDescription: 'توابل عطرية أصيلة',
        foodItemsDescription: 'مواد غذائية متنوعة',
        naturalOilsDescription: 'زيوت طبيعية مفيدة',
        
        // Product names and descriptions
        medjoolDates: 'تمر المجهول الفاخر',
        medjoolDatesDesc: 'تمور المجهول الطبيعية عالية الجودة',
        sidrHoney: 'عسل السدر الطبيعي',
        sidrHoneyDesc: 'عسل سدر نقي من مناحل طبيعية',
        mixedNuts: 'مكسرات مشكلة فاخرة',
        mixedNutsDesc: 'خليط من أجود أنواع المكسرات',
        authenticSaffron: 'زعفران أصلي',
        authenticSaffronDesc: 'زعفران أصلي عالي الجودة',
        oliveOil: 'زيت زيتون بكر ممتاز',
        oliveOilDesc: 'زيت زيتون بكر ممتاز من أجود الثمار',
        basmatiRice: 'أرز بسمتي فاخر',
        basmatiRiceDesc: 'أرز بسمتي عالي الجودة',
        djf: 'فرنك',
        fdj: 'فرنك',
        
        
        // Error messages and UI text
        noProductsFound: 'No products match the search',
        noProductsYet: 'No products yet',
        noImagesInCategory: 'No images in this category',
        cannotDisplayImage: 'Cannot display image',
        sendMessage: 'أرسل لنا رسالة',
        ourLocation: 'موقعنا على الخريطة',
        visitUs: 'زورونا في موقعنا أو تواصلوا معنا عبر الوسائل المتاحة',
        manageWebsiteContent: 'Manage Dāniya website content',
        viewDetails: 'عرض التفاصيل',
        
        // Form labels
        productNameAr: 'اسم المنتج (بالعربية)',
        productNameEn: 'اسم المنتج (بالإنجليزية)',
        productNameFr: 'اسم المنتج (بالفرنسية)',
        category: 'الفئة',
        price: 'السعر',
        description: 'الوصف',
        productImage: 'صورة المنتج',
        
        // Product form placeholders
        productNameArPlaceholder: 'أدخل اسم المنتج باللغة العربية',
        productNameEnPlaceholder: 'أدخل اسم المنتج باللغة الإنجليزية',
        pricePlaceholder: 'أدخل سعر المنتج',
        descriptionPlaceholder: 'أدخل وصف المنتج',
        
        // Category options
        chooseCategory: 'اختر الفئة',
        categorySpices: 'توابل',
        categoryHerbs: 'أعشاب',
        categoryMixes: 'خلطات',
        categoryOthers: 'أخرى',
        
        // Image upload
        uploadImage: 'رفع صورة',
        chooseImage: 'اختيار صورة',
        removeImage: 'إزالة الصورة',
        imagePreview: 'معاينة الصورة',
        cannotDisplayImage: 'لا يمكن عرض الصورة',
        
        // Success messages
        willContactSoon: 'We will contact you as soon as possible',
        nousContacterons: 'Nous vous contacterons dès que possible',
        
        // Feature descriptions
        qualityDescription: 'نضمن أعلى معايير الجودة في جميع منتجاتنا',
        naturalDescription: 'جميع منتجاتنا طبيعية 100% بدون أي إضافات صناعية',
        whyChooseUs: 'لماذا تختار دانية؟',
        whyChooseUsDesc: 'نقدم أفضل المنتجات الطبيعية بأعلى معايير الجودة',
        
        // Gallery image titles
        premiumDates: 'Premium Dates',
        naturalHoney: 'Natural Honey',
        assortedNuts: 'Assorted Nuts',
        aromaticSpices: 'Aromatic Spices',
        foodItemsTitle: 'Food Items',
        naturalOilsTitle: 'Natural Oils',
        productExhibition: 'Product Exhibition',
        daniyaPavilion: 'Dāniya Pavilion',
        noImagesInCategory: 'No images in this category',
        
        // About page values
        qualityCommitment: 'نحن ملتزمون بأعلى معايير الجودة في جميع منتجاتنا',
        naturalProducts: 'منتجات طبيعية 100% بدون أي إضافات صناعية',
        customerFirst: 'نضع رضا عملائنا دائمًا في المقام الأول',
        striveExcellence: 'نسعى للتميز في كل ما نقدمه',
        coreValues: 'قيمنا الأساسية',
        coreValuesDesc: 'القيم التي نؤمن بها وتوجه عملنا اليومي',
      },
      en: {
        home: 'Home',
        about: 'About Us',
        products: 'Products',
        gallery: 'Gallery',
        contact: 'Contact',
        admin: 'Admin Panel',
        
        welcomeTitle: 'Welcome to Dāniya',
        welcomeSubtitle: 'The Quality of Nature in Every Grain',
        exploreProducts: 'Explore Our Products',
        learnMore: 'Learn More',
        
        dates: 'Dates',
        honey: 'Honey',
        nuts: 'Nuts',
        spices: 'Spices',
        foodItems: 'Food Items',
        naturalOils: 'Natural Oils',
        
        aboutTitle: 'Dāniya\'s Story: From the Earth to You',
        aboutDescription: 'Dāniya began as a dream in the heart of nature, valuing quality and authenticity. We believe the best flavors come from pure ingredients, which is why we travel the world to select the finest spices, honey, and dates for you. Our story is one of passion for quality and a commitment to providing what is natural and healthy.',
        ourVision: 'Our Vision',
        visionText: 'To be the trusted source for high-quality natural products in every home.',
        ourMission: 'Our Mission',
        missionText: 'To provide authentic natural products that enhance quality of life and inspire unforgettable culinary experiences.',
        
        productsTitle: 'Our Products',
        productsSubtitle: 'Discover our diverse range of high-quality natural products',
        viewProducts: 'View Products',
        
        galleryTitle: 'Photo Gallery',
        gallerySubtitle: 'Explore the beauty of our natural products',
        
        contactTitle: 'Contact Us',
        contactSubtitle: 'We are here to answer all your inquiries',
        name: 'Name',
        email: 'Your Email',
        phoneOptional: 'Phone Number (Optional)',
        message: 'Message',
        send: 'Send',
        
        adminTitle: 'Admin Panel',
        manageProducts: 'Manage Products',
        addProduct: 'Add Product',
        editProduct: 'Edit Product',
        deleteProduct: 'Delete Product',
        
        search: 'Search...',
        all: 'All',
        add: 'Add',
        update: 'Update',
        
        followUs: 'Follow Us',
        followUsText: 'Join us on social media for the latest news and offers.',
        quickLinks: 'Quick Links',
        contactInfo: 'Contact Info',
        address: 'Djibouti - Hamoudi Market',
        phone: '+25377760000',
        workingHours: 'All week:\nSat-Thu: 8:00 AM – 12:30 AM\nFri: 4:30 PM – 10:00 PM',
        copyright: '© 2025 Dāniya Trading | All Rights Reserved',
        
        featureNotImplemented: '🚧 This feature isn\'t implemented yet—but don\'t worry! You can request it in your next prompt! 🚀',
        addProductSuccess: 'Product added successfully!',
        updateProductSuccess: 'Product updated successfully!',
        deleteProductSuccess: 'Product deleted successfully!',
        
        // إضافات للصفحات المختلفة
        quality: 'Quality',
        qualityCommitment: 'We are committed to the highest quality standards in all our products',
        natural: 'Natural',
        naturalProducts: '100% natural products without artificial additives',
        customerSatisfaction: 'Customer Satisfaction',
        customerFirst: 'We always put our customers\' satisfaction first',
        excellence: 'Excellence',
        striveExcellence: 'We strive for excellence in everything we offer',
        yearsExperience: 'Years of Experience',
        happyCustomers: 'Happy Customers',
        uniqueProducts: 'Unique Products',
        support: 'Technical Support',
        
        // إدارة الإعلانات
        advertisementManagement: 'Advertisement Management',
        addAdvertisement: 'Add Advertisement',
        editAdvertisement: 'Edit Advertisement',
        deleteAdvertisement: 'Delete Advertisement',
        advertisementTitle: 'Advertisement Title',
        advertisementDescription: 'Advertisement Description',
        advertisementLink: 'Advertisement Link',
        advertisementImage: 'Advertisement Image',
        uploadImage: 'Upload Image',
        chooseImage: 'Choose Image',
        removeImage: 'Remove',
        imageUrl: 'Image URL',
        imagePreview: 'Image Preview',
        noAdvertisements: 'No advertisements yet',
        
        // إدارة المعرض
        galleryManagement: 'Gallery Management',
        addImage: 'Add Image',
        editImage: 'Edit Image',
        deleteImage: 'Delete Image',
        imageTitle: 'Image Title',
        imageDescription: 'Image Description',
        imageCategory: 'Image Category',
        uploadImageToGallery: 'Upload Image to Gallery',
        noImages: 'No images yet',
        
        // رسائل التواصل
        contactMessages: 'Contact Messages',
        messageDetails: 'Message Details',
        messageDate: 'Message Date',
        messageStatus: 'Message Status',
        noMessages: 'No messages yet',
        
        // إحصائيات لوحة التحكم
        totalProducts: 'Total Products',
        contactMessages: 'Contact Messages',
        galleryImages: 'Gallery Images',
        advertisements: 'Advertisements',
        
        // روابط سريعة
        allProducts: 'All Products',
        datesCategory: 'Dates',
        honeyCategory: 'Honey',
        nutsCategory: 'Nuts',
        spicesCategory: 'Spices',
        foodCategory: 'Food Items',
        oilsCategory: 'Natural Oils',
        
        // معلومات التواصل
        addressTitle: 'Address',
        phoneTitle: 'Phone',
        emailTitle: 'Email',
        workingHoursTitle: 'Working Hours',
        storeEmail: 'daniaspices2024@gmail.com',
        
        // رسائل النجاح
        advertisementAddedSuccess: 'Advertisement added successfully',
        advertisementUpdatedSuccess: 'Advertisement updated successfully',
        advertisementDeletedSuccess: 'Advertisement deleted successfully',
        imageAddedSuccess: 'Image added successfully',
        imageUpdatedSuccess: 'Image updated successfully',
        imageDeletedSuccess: 'Image deleted successfully',
        messageSentSuccess: 'Message sent successfully',
        
        // رسائل الخطأ
        fileTypeError: 'File type error',
        fileTypeErrorDesc: 'Please select a valid image file',
        fileSizeError: 'File too large',
        fileSizeErrorDesc: 'Please select an image smaller than 5MB',
        imageUploadSuccess: 'Image uploaded successfully',
        imageUploadSuccessDesc: 'Image uploaded and will appear in the advertisement',
        
        // فئات المعرض
        productsCategory: 'Products',
        eventsCategory: 'Events',
        
        // أزرار التنقل
        next: 'Next',
        previous: 'Previous',
        play: 'Play',
        pause: 'Pause',
        
        // نصوص عامة
        loading: 'Loading...',
        error: 'Error',
        success: 'Success',
        cancel: 'Cancel',
        save: 'Save',
        edit: 'Edit',
        delete: 'Delete',
        close: 'Close',
        submit: 'Submit',
        reset: 'Reset',
        
        // أوصاف المنتجات
        datesDescription: 'High-quality natural dates',
        honeyDescription: 'Pure natural honey',
        nutsDescription: 'Fresh and crunchy nuts',
        spicesDescription: 'Aromatic authentic spices',
        foodItemsDescription: 'Diverse food items',
        naturalOilsDescription: 'Beneficial natural oils',
        
        // Product names and descriptions
        medjoolDates: 'Premium Medjool Dates',
        medjoolDatesDesc: 'Natural high-quality Medjool dates',
        sidrHoney: 'Natural Sidr Honey',
        sidrHoneyDesc: 'Pure Sidr honey from natural beehives',
        mixedNuts: 'Premium Mixed Nuts',
        mixedNutsDesc: 'Mix of the finest types of nuts',
        authenticSaffron: 'Authentic Saffron',
        authenticSaffronDesc: 'Authentic high-quality saffron',
        oliveOil: 'Extra Virgin Olive Oil',
        oliveOilDesc: 'Excellent extra virgin olive oil from the finest fruits',
        basmatiRice: 'Premium Basmati Rice',
        basmatiRiceDesc: 'High-quality basmati rice',
        djf: 'Djiboutian Franc',
        fdj: 'Fdj',
        
        // Currency
        sar: 'SAR',
        riyal: 'ريال',
        
        // Error messages and UI text
        noProductsFound: 'No products match the search',
        noProductsYet: 'No products yet',
        noImagesInCategory: 'No images in this category',
        cannotDisplayImage: 'Cannot display image',
        sendMessage: 'Send us a message',
        ourLocation: 'Our Location on the Map',
        visitUs: 'Visit us at our location or contact us through available means',
        manageWebsiteContent: 'Manage Dāniya website content',
        viewDetails: 'View Details',
        
        // Form labels
        productNameAr: 'Product Name (Arabic)',
        productNameEn: 'Product Name (English)',
        productNameFr: 'Product Name (French)',
        category: 'Category',
        price: 'Price',
        description: 'Description',
        productImage: 'Product Image',
        
        // Product form placeholders
        productNameArPlaceholder: 'Enter product name in Arabic',
        productNameEnPlaceholder: 'Enter product name in English',
        pricePlaceholder: 'Enter product price',
        descriptionPlaceholder: 'Enter product description',
        
        // Category options
        chooseCategory: 'Choose Category',
        categorySpices: 'Spices',
        categoryHerbs: 'Herbs',
        categoryMixes: 'Mixes',
        categoryOthers: 'Others',
        
        // Image upload
        uploadImage: 'Upload Image',
        chooseImage: 'Choose Image',
        removeImage: 'Remove Image',
        imagePreview: 'Image Preview',
        cannotDisplayImage: 'Cannot display image',
        
        // Success messages
        willContactSoon: 'We will contact you as soon as possible',
        nousContacterons: 'Nous vous contacterons dès que possible',
        
        // Feature descriptions
        qualityDescription: 'We guarantee the highest quality standards in all our products',
        naturalDescription: 'All our products are 100% natural without artificial additives',
        whyChooseUs: 'Why Choose Dāniya?',
        whyChooseUsDesc: 'We offer the best natural products with the highest quality standards',
        
        // Gallery image titles
        premiumDates: 'Premium Dates',
        naturalHoney: 'Natural Honey',
        assortedNuts: 'Assorted Nuts',
        aromaticSpices: 'Aromatic Spices',
        foodItemsTitle: 'Food Items',
        naturalOilsTitle: 'Natural Oils',
        productExhibition: 'Product Exhibition',
        daniyaPavilion: 'Dāniya Pavilion',
        noImagesInCategory: 'No images in this category',
        
        // About page values
        qualityCommitment: 'We are committed to the highest quality standards in all our products',
        naturalProducts: '100% natural products without artificial additives',
        customerFirst: 'We always put our customers\' satisfaction first',
        striveExcellence: 'We strive for excellence in everything we offer',
        coreValues: 'Our Core Values',
        coreValuesDesc: 'The values we believe in and guide our daily work',
      },
      fr: {
        home: 'Accueil',
        about: 'À propos',
        products: 'Produits',
        gallery: 'Galerie',
        contact: 'Contact',
        admin: 'Panneau d\'administration',
        
        welcomeTitle: 'Bienvenue chez Dāniya',
        welcomeSubtitle: 'La Qualité de la Nature dans Chaque Grain',
        exploreProducts: 'Explorer Nos Produits',
        learnMore: 'En Savoir Plus',
        
        dates: 'Dattes',
        honey: 'Miel',
        nuts: 'Noix',
        spices: 'Épices',
        foodItems: 'Articles Alimentaires',
        naturalOils: 'Huiles Naturelles',
        
        aboutTitle: 'L\'Histoire de Dāniya: De la Terre à Vous',
        aboutDescription: 'Dāniya a commencé comme un rêve au cœur de la nature, valorisant la qualité et l\'authenticité. Nous croyons que les meilleures saveurs viennent d\'ingrédients purs, c\'est pourquoi nous voyageons autour du monde pour sélectionner les meilleures épices, miel et dattes pour vous. Notre histoire est celle d\'une passion pour la qualité et d\'un engagement à fournir ce qui est naturel et sain.',
        ourVision: 'Notre Vision',
        visionText: 'Être la source de confiance pour les produits naturels de haute qualité dans chaque maison.',
        ourMission: 'Notre Mission',
        missionText: 'Fournir des produits naturels authentiques qui améliorent la qualité de vie et inspirent des expériences culinaires inoubliables.',
        
        productsTitle: 'Nos Produits',
        productsSubtitle: 'Découvrez notre gamme diversifiée de produits naturels de haute qualité',
        viewProducts: 'Voir les Produits',
        
        galleryTitle: 'Galerie Photos',
        gallerySubtitle: 'Explorez la beauté de nos produits naturels',
        
        contactTitle: 'Contactez-nous',
        contactSubtitle: 'Nous sommes là pour répondre à toutes vos questions',
        name: 'Nom',
        email: 'Votre Email',
        phoneOptional: 'Numéro de téléphone (Optionnel)',
        message: 'Message',
        send: 'Envoyer',
        
        adminTitle: 'Panneau d\'Administration',
        manageProducts: 'Gérer les Produits',
        addProduct: 'Ajouter un Produit',
        editProduct: 'Modifier le Produit',
        deleteProduct: 'Supprimer le Produit',
        
        search: 'Rechercher...',
        all: 'Tout',
        add: 'Ajouter',
        update: 'Mettre à jour',
        
        followUs: 'Suivez-nous',
        followUsText: 'Rejoignez-nous sur les réseaux sociaux pour les dernières nouvelles et offres.',
        quickLinks: 'Liens Rapides',
        contactInfo: 'Informations de Contact',
        address: 'Djibouti - Marché Hamoudi',
        phone: '+25377760000',
        workingHours: 'Toute la semaine :\nSam-Jeu : 8h00 – 00h30\nVen : 16h30 – 22h00',
        copyright: '© 2025 Dāniya Trading | Tous Droits Réservés',
        
        featureNotImplemented: '🚧 Cette fonctionnalité n\'est pas encore implémentée—mais ne vous inquiétez pas ! Vous pouvez la demander dans votre prochaine requête ! 🚀',
        addProductSuccess: 'Produit ajouté avec succès !',
        updateProductSuccess: 'Produit mis à jour avec succès !',
        deleteProductSuccess: 'Produit supprimé avec succès !',
        
        // إضافات للصفحات المختلفة
        quality: 'Qualité',
        qualityCommitment: 'Nous nous engageons aux plus hauts standards de qualité dans tous nos produits',
        natural: 'Naturel',
        naturalProducts: 'Produits 100% naturels sans additifs artificiels',
        customerSatisfaction: 'Satisfaction Client',
        customerFirst: 'Nous mettons toujours la satisfaction de nos clients en premier',
        excellence: 'Excellence',
        striveExcellence: 'Nous visons l\'excellence dans tout ce que nous offrons',
        yearsExperience: 'Années d\'Expérience',
        happyCustomers: 'Clients Satisfaits',
        uniqueProducts: 'Produits Uniques',
        support: 'Support Technique',
        
        // إدارة الإعلانات
        advertisementManagement: 'Gestion des Publicités',
        addAdvertisement: 'Ajouter une Publicité',
        editAdvertisement: 'Modifier la Publicité',
        deleteAdvertisement: 'Supprimer la Publicité',
        advertisementTitle: 'Titre de la Publicité',
        advertisementDescription: 'Description de la Publicité',
        advertisementLink: 'Lien de la Publicité',
        advertisementImage: 'Image de la Publicité',
        uploadImage: 'Télécharger une Image',
        chooseImage: 'Choisir une Image',
        removeImage: 'Supprimer',
        imageUrl: 'URL de l\'Image',
        imagePreview: 'Aperçu de l\'Image',
        noAdvertisements: 'Aucune publicité pour le moment',
        
        // إدارة المعرض
        galleryManagement: 'Gestion de la Galerie',
        addImage: 'Ajouter une Image',
        editImage: 'Modifier l\'Image',
        deleteImage: 'Supprimer l\'Image',
        imageTitle: 'Titre de l\'Image',
        imageDescription: 'Description de l\'Image',
        imageCategory: 'Catégorie de l\'Image',
        uploadImageToGallery: 'Télécharger une Image dans la Galerie',
        noImages: 'Aucune image pour le moment',
        
        // رسائل التواصل
        contactMessages: 'Messages de Contact',
        messageDetails: 'Détails du Message',
        messageDate: 'Date du Message',
        messageStatus: 'Statut du Message',
        noMessages: 'Aucun message pour le moment',
        
        // إحصائيات لوحة التحكم
        totalProducts: 'Total des Produits',
        contactMessages: 'Messages de Contact',
        galleryImages: 'Images de la Galerie',
        advertisements: 'Publicités',
        
        // روابط سريعة
        allProducts: 'Tous les Produits',
        datesCategory: 'Dattes',
        honeyCategory: 'Miel',
        nutsCategory: 'Noix',
        spicesCategory: 'Épices',
        foodCategory: 'Articles Alimentaires',
        oilsCategory: 'Huiles Naturelles',
        
        // معلومات التواصل
        addressTitle: 'Adresse',
        phoneTitle: 'Téléphone',
        emailTitle: 'Email',
        workingHoursTitle: 'Heures de Travail',
        storeEmail: 'daniaspices2024@gmail.com',
        
        // رسائل النجاح
        advertisementAddedSuccess: 'Publicité ajoutée avec succès',
        advertisementUpdatedSuccess: 'Publicité mise à jour avec succès',
        advertisementDeletedSuccess: 'Publicité supprimée avec succès',
        imageAddedSuccess: 'Image ajoutée avec succès',
        imageUpdatedSuccess: 'Image mise à jour avec succès',
        imageDeletedSuccess: 'Image supprimée avec succès',
        messageSentSuccess: 'Message envoyé avec succès',
        
        // رسائل الخطأ
        fileTypeError: 'Erreur de type de fichier',
        fileTypeErrorDesc: 'Veuillez sélectionner un fichier image valide',
        fileSizeError: 'Fichier trop volumineux',
        fileSizeErrorDesc: 'Veuillez sélectionner une image de moins de 5MB',
        imageUploadSuccess: 'Image téléchargée avec succès',
        imageUploadSuccessDesc: 'Image téléchargée et apparaîtra dans la publicité',
        
        // فئات المعرض
        productsCategory: 'Produits',
        eventsCategory: 'Événements',
        
        // أزرار التنقل
        next: 'Suivant',
        previous: 'Précédent',
        play: 'Jouer',
        pause: 'Pause',
        
        // نصوص عامة
        loading: 'Chargement...',
        error: 'Erreur',
        success: 'Succès',
        cancel: 'Annuler',
        save: 'Enregistrer',
        edit: 'Modifier',
        delete: 'Supprimer',
        close: 'Fermer',
        submit: 'Soumettre',
        reset: 'Réinitialiser',
        
        // أوصاف المنتجات
        datesDescription: 'Dattes naturelles de haute qualité',
        honeyDescription: 'Miel naturel pur',
        nutsDescription: 'Noix fraîches et croquantes',
        spicesDescription: 'Épices aromatiques authentiques',
        foodItemsDescription: 'Articles alimentaires diversifiés',
        naturalOilsDescription: 'Huiles naturelles bénéfiques',
        
        // Product names and descriptions
        medjoolDates: 'Dattes Medjool Premium',
        medjoolDatesDesc: 'Dattes Medjool naturelles de haute qualité',
        sidrHoney: 'Miel Sidr Naturel',
        sidrHoneyDesc: 'Miel Sidr pur des ruches naturelles',
        mixedNuts: 'Noix Mixtes Premium',
        mixedNutsDesc: 'Mélange des meilleures variétés de noix',
        authenticSaffron: 'Safran Authentique',
        authenticSaffronDesc: 'Safran authentique de haute qualité',
        oliveOil: 'Huile d\'Olive Extra Vierge',
        oliveOilDesc: 'Huile d\'olive extra vierge excellente des meilleurs fruits',
        basmatiRice: 'Riz Basmati Premium',
        basmatiRiceDesc: 'Riz basmati de haute qualité',
        djf: 'Franc djiboutien',
        fdj: 'فرنك',
        
        // Currency
        sar: 'SAR',
        riyal: 'ريال',
        
        // Error messages and UI text
        noProductsFound: 'Aucun produit ne correspond à la recherche',
        noProductsYet: 'Aucun produit pour le moment',
        noImagesInCategory: 'Aucune image dans cette catégorie',
        cannotDisplayImage: 'Impossible d\'afficher l\'image',
        sendMessage: 'أرسل لنا رسالة',
        ourLocation: 'موقعنا على الخريطة',
        visitUs: 'زورونا في موقعنا أو تواصلوا معنا عبر الوسائل المتاحة',
        manageWebsiteContent: 'Gérer le contenu du site web Dāniya',
        viewDetails: 'Voir les Détails',
        
        // Form labels
        productNameAr: 'Nom du Produit (Arabe)',
        productNameEn: 'Nom du Produit (Anglais)',
        productNameFr: 'Nom du Produit (Français)',
        category: 'Catégorie',
        price: 'Prix',
        description: 'Description',
        productImage: 'Image du Produit',
        
        // Product form placeholders
        productNameArPlaceholder: 'Entrez le nom du produit en arabe',
        productNameEnPlaceholder: 'Entrez le nom du produit en anglais',
        pricePlaceholder: 'Entrez le prix du produit',
        descriptionPlaceholder: 'Entrez la description du produit',
        
        // Category options
        chooseCategory: 'Choisir la Catégorie',
        categorySpices: 'Épices',
        categoryHerbs: 'Herbes',
        categoryMixes: 'Mélanges',
        categoryOthers: 'Autres',
        
        // Image upload
        uploadImage: 'Télécharger une Image',
        chooseImage: 'Choisir une Image',
        removeImage: 'Supprimer l\'Image',
        imagePreview: 'Aperçu de l\'Image',
        cannotDisplayImage: 'Impossible d\'afficher l\'image',
        
        // Success messages
        willContactSoon: 'We will contact you as soon as possible',
        nousContacterons: 'Nous vous contacterons dès que possible',
        
        // Feature descriptions
        qualityDescription: 'نضمن أعلى معايير الجودة في جميع منتجاتنا',
        naturalDescription: 'جميع منتجاتنا طبيعية 100% بدون أي إضافات صناعية',
        whyChooseUs: 'Pourquoi Choisir Dāniya ?',
        whyChooseUsDesc: 'Nous offrons les meilleurs produits naturels avec les plus hauts standards de qualité',
        
        // Gallery image titles
        premiumDates: 'Dattes Premium',
        naturalHoney: 'Miel Naturel',
        assortedNuts: 'Noix Variées',
        aromaticSpices: 'Épices Aromatiques',
        foodItemsTitle: 'Articles Alimentaires',
        naturalOilsTitle: 'Huiles Naturelles',
        productExhibition: 'Exposition de Produits',
        daniyaPavilion: 'Pavillon Dāniya',
        noImagesInCategory: 'Aucune image dans cette catégorie',
        
        // About page values
        qualityCommitment: 'Nous nous engageons aux plus hauts standards de qualité dans tous nos produits',
        naturalProducts: 'Produits 100% naturels sans additifs artificiels',
        customerFirst: 'Nous mettons toujours la satisfaction de nos clients en premier',
        striveExcellence: 'Nous visons l\'excellence dans tout ce que nous offrons',
        coreValues: 'قيمنا الأساسية',
        coreValuesDesc: 'القيم التي نؤمن بها وتوجه عملنا اليومي',
      }
    };
    
    return translations[language]?.[key] || options.defaultValue || key;
  };

  return (
    <LanguageContext.Provider value={{ language, direction, toggleLanguage, setLanguageDirect, t }}>
      {children}
    </LanguageContext.Provider>
  );
};