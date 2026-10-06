# إعداد الخطوط الجديدة - Dania Website

## الخطوط المطلوبة

### الخط العربي: A Lamia
- **الملفات المطلوبة:**
  - `A-Lamia.woff2`
  - `A-Lamia.woff`
  - `A-Lamia.ttf`
  - `A-Lamia-Bold.woff2`
  - `A-Lamia-Bold.woff`
  - `A-Lamia-Bold.ttf`

### الخط الإنجليزي: Abdoullah Ashger EL-kharef
- **الملفات المطلوبة:**
  - `Abdoullah-Ashger-EL-kharef.woff2`
  - `Abdoullah-Ashger-EL-kharef.woff`
  - `Abdoullah-Ashger-EL-kharef.ttf`
  - `Abdoullah-Ashger-EL-kharef-Bold.woff2`
  - `Abdoullah-Ashger-EL-kharef-Bold.woff`
  - `Abdoullah-Ashger-EL-kharef-Bold.ttf`

## خطوات الإعداد

### 1. تحميل الخطوط
- قم بتحميل ملفات الخطوط من مصادرها الرسمية
- تأكد من أن أسماء الملفات تطابق تماماً الأسماء المذكورة أعلاه

### 2. وضع الملفات
- ضع جميع ملفات الخطوط في مجلد `public/fonts/`
- تأكد من أن المسار الكامل هو: `public/fonts/[اسم الملف]`

### 3. التحقق من الإعداد
- تم تحديث ملف `src/index.css` لاستخدام الخطوط الجديدة
- تم تحديث ملف `tailwind.config.js` لإضافة فئات الخطوط
- تم تحديث المكونات الرئيسية لاستخدام الخطوط المناسبة

## فئات CSS المتاحة

### فئات الخطوط الأساسية
- `.font-arabic` - للخط العربي (A Lamia)
- `.font-english` - للخط الإنجليزي (Abdoullah Ashger EL-kharef)
- `.font-mixed` - للخطوط المختلطة

### فئات إضافية
- `.arabic-text` - للنص العربي
- `.english-text` - للنص الإنجليزي
- `.mixed-content` - للمحتوى المختلط

## الاستخدام في المكونات

### في React Components
```jsx
// تحديد فئة الخط بناءً على اللغة
const getFontClass = () => {
  return language === 'ar' ? 'font-arabic' : 'font-english';
};

// استخدام الفئة
<h1 className={`text-4xl font-bold ${getFontClass()}`}>
  {title}
</h1>
```

### في Tailwind CSS
```html
<!-- للعربية -->
<div class="font-arabic">نص عربي</div>

<!-- للإنجليزية -->
<div class="font-english">English text</div>

<!-- للمحتوى المختلط -->
<div class="font-mixed">محتوى مختلط Mixed content</div>
```

## الملفات المحدثة

### ملفات CSS
- `src/index.css` - إضافة تعريفات الخطوط الجديدة
- `tailwind.config.js` - إضافة فئات الخطوط إلى Tailwind

### المكونات المحدثة
- `src/components/Header.jsx` - إضافة فئات الخطوط
- `src/components/Footer.jsx` - إضافة فئات الخطوط
- `src/pages/Home.jsx` - إضافة فئات الخطوط

## ملاحظات مهمة

1. **أسماء الملفات**: تأكد من أن أسماء ملفات الخطوط تطابق تماماً الأسماء المذكورة
2. **تنسيقات الملفات**: تأكد من وجود جميع التنسيقات (woff2, woff, ttf)
3. **الأداء**: ملفات woff2 هي الأسرع في التحميل، لذا تأكد من وجودها
4. **الخطأ**: إذا لم تظهر الخطوط، تحقق من:
   - وجود الملفات في المسار الصحيح
   - صحة أسماء الملفات
   - عدم وجود أخطاء في وحدة تحكم المتصفح

## اختبار الخطوط

بعد إضافة الملفات، يمكنك اختبار الخطوط من خلال:
1. فتح الموقع في المتصفح
2. تغيير اللغة بين العربية والإنجليزية
3. ملاحظة تغير الخط تلقائياً
4. فحص وحدة تحكم المتصفح للتأكد من عدم وجود أخطاء في تحميل الخطوط 