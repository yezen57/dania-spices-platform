import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

const ProductForm = ({ products, setProducts, editingProduct, setEditingProduct, setIsDialogOpen }) => {
  const { t, language } = useLanguage();
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    description: '',
    image: ''
  });
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  // Determine font class based on language
  const getFontClass = () => {
    return language === 'ar' ? 'font-arabic' : 'font-english';
  };

  // Refs for keyboard navigation
  const nameRef = useRef(null);
  const categoryRef = useRef(null);
  const priceRef = useRef(null);
  const descriptionRef = useRef(null);
  const uploadButtonRef = useRef(null);
  const removeButtonRef = useRef(null);
  const submitButtonRef = useRef(null);

  // خيارات الفئة حسب اللغة
  const categoryOptions = [
    { value: '', label: t('chooseCategory') },
    { value: 'spices', label: t('categorySpices') },
    { value: 'herbs', label: t('categoryHerbs') },
    { value: 'mixes', label: t('categoryMixes') },
    { value: 'others', label: t('categoryOthers') },
  ];

  useEffect(() => {
    if (editingProduct) {
      setFormData(editingProduct);
      setImagePreview(editingProduct.image || '');
    } else {
      setFormData({
        name: '',
        category: '',
        price: '',
        description: '',
        image: ''
      });
      setUploadedImage(null);
      setImagePreview('');
    }
  }, [editingProduct]);

  // Focus first field when form opens
  useEffect(() => {
    if (nameRef.current) {
      nameRef.current.focus();
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Enhanced keyboard navigation handler
  const handleKeyDown = (e, nextRef, prevRef = null) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (nextRef && nextRef.current) {
        nextRef.current.focus();
      } else if (e.target.type === 'submit') {
        // Submit form if on submit button
        e.target.click();
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (nextRef && nextRef.current) {
        nextRef.current.focus();
      } else if (e.target.type === 'submit') {
        // Go to first field if on submit button
        nameRef.current?.focus();
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (prevRef && prevRef.current) {
        prevRef.current.focus();
      } else if (e.target === nameRef.current) {
        // Go to submit button if on first field
        submitButtonRef.current?.focus();
      }
    } else if (e.key === 'Tab') {
      // Allow default tab behavior but add smooth focus
      setTimeout(() => {
        if (document.activeElement && document.activeElement.classList) {
          document.activeElement.classList.add('ring-2', 'ring-gold-accent');
        }
      }, 10);
      return;
    } else if (e.key === 'Escape') {
      // Close dialog on escape
      setIsDialogOpen(false);
    }
  };

  // Enhanced mouse navigation
  const handleMouseEnter = (e) => {
    e.target.classList.add('ring-1', 'ring-gold-accent/50');
  };

  const handleMouseLeave = (e) => {
    if (document.activeElement !== e.target) {
      e.target.classList.remove('ring-1', 'ring-gold-accent/50');
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // التحقق من نوع الملف
      if (!file.type.startsWith('image/')) {
        toast({ 
          title: t('fileTypeError'), 
          description: t('fileTypeErrorDesc'),
          variant: 'destructive'
        });
        return;
      }

      // التحقق من حجم الملف (أقل من 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({ 
          title: t('fileSizeError'), 
          description: t('fileSizeErrorDesc'),
          variant: 'destructive'
        });
        return;
      }

      setUploadedImage(file);
      
      // إنشاء معاينة للصورة
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
        setFormData(prev => ({ ...prev, image: e.target.result }));
      };
      reader.readAsDataURL(file);

      toast({ 
        title: t('imageUploadSuccess'),
        description: t('imageUploadSuccessDesc')
      });
    }
  };

  const removeUploadedImage = () => {
    setUploadedImage(null);
    setImagePreview('');
    setFormData(prev => ({ ...prev, image: '' }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleUrlChange = (e) => {
    const { value } = e.target;
    setFormData(prev => ({ ...prev, image: value }));
    setImagePreview(value);
    setUploadedImage(null);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingProduct) {
      const updatedProducts = products.map(p => 
        p.id === editingProduct.id ? { ...formData, id: editingProduct.id } : p
      );
      setProducts(updatedProducts);
      localStorage.setItem('dania-products', JSON.stringify(updatedProducts));
      toast({ title: t('updateProductSuccess') });
    } else {
      const newProduct = { ...formData, id: Date.now() };
      const updatedProducts = [...products, newProduct];
      setProducts(updatedProducts);
      localStorage.setItem('dania-products', JSON.stringify(updatedProducts));
      toast({ title: t('addProductSuccess') });
    }
    
    setEditingProduct(null);
    setIsDialogOpen(false);
  };
  
  return (
    <div className="max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-light-gray/30 scrollbar-track-transparent hover:scrollbar-thumb-light-gray/50 transition-all duration-200">
      <form onSubmit={handleSubmit} className="space-y-6 p-1">
        {/* اسم المنتج */}
        <div className="space-y-2">
          <Label htmlFor="name" className={`text-sm font-medium text-foreground ${getFontClass()}`}>
            {t('productName')} *
          </Label>
          <Input
            ref={nameRef}
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
            className={`bg-background border border-input hover:border-gold-accent/50 focus:border-gold-accent focus:ring-2 focus:ring-gold-accent/20 transition-all duration-200 ${getFontClass()}`}
            onKeyDown={(e) => handleKeyDown(e, categoryRef)}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            placeholder={t('enterProductName')}
          />
        </div>

        {/* فئة المنتج */}
        <div className="space-y-2">
          <Label htmlFor="category" className={`text-sm font-medium text-foreground ${getFontClass()}`}>
            {t('productCategory')} *
          </Label>
          <select
            ref={categoryRef}
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className={`w-full px-3 py-2 bg-background border border-input rounded-md hover:border-gold-accent/50 focus:border-gold-accent focus:ring-2 focus:ring-gold-accent/20 transition-all duration-200 ${getFontClass()}`}
            onKeyDown={(e) => handleKeyDown(e, priceRef, nameRef)}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {categoryOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* سعر المنتج */}
        <div className="space-y-2">
          <Label htmlFor="price" className={`text-sm font-medium text-foreground ${getFontClass()}`}>
            {t('productPrice')} *
          </Label>
          <Input
            ref={priceRef}
            id="price"
            name="price"
            type="text"
            value={formData.price}
            onChange={handleChange}
            required
            className={`bg-background border border-input hover:border-gold-accent/50 focus:border-gold-accent focus:ring-2 focus:ring-gold-accent/20 transition-all duration-200 ${getFontClass()}`}
            onKeyDown={(e) => handleKeyDown(e, descriptionRef, categoryRef)}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            placeholder={t('enterProductPrice')}
          />
        </div>

        {/* وصف المنتج */}
        <div className="space-y-2">
          <Label htmlFor="description" className={`text-sm font-medium text-foreground ${getFontClass()}`}>
            {t('productDescription')} *
          </Label>
          <Textarea
            ref={descriptionRef}
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
            className={`bg-background border border-input hover:border-gold-accent/50 focus:border-gold-accent focus:ring-2 focus:ring-gold-accent/20 transition-all duration-200 resize-none ${getFontClass()}`}
            onKeyDown={(e) => handleKeyDown(e, uploadButtonRef, priceRef)}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            placeholder={t('enterProductDescription')}
          />
        </div>

        {/* صورة المنتج */}
        <div className="space-y-4">
          <Label className={`text-sm font-medium text-foreground ${getFontClass()}`}>
            {t('productImage')}
          </Label>
          
          {/* خيارات رفع الصورة */}
          <div className="space-y-3">
            {/* رفع ملف */}
            <div className="flex items-center gap-2">
              <Button
                ref={uploadButtonRef}
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className={`flex items-center gap-2 hover:bg-gold-accent/10 hover:border-gold-accent/50 transition-all duration-200 ${getFontClass()}`}
                onKeyDown={(e) => handleKeyDown(e, removeButtonRef, descriptionRef)}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <Upload className="h-4 w-4" />
                {t('uploadImage')}
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>

            {/* إزالة الصورة */}
            {imagePreview && (
              <div className="flex items-center gap-2">
                <Button
                  ref={removeButtonRef}
                  type="button"
                  variant="outline"
                  onClick={removeUploadedImage}
                  className={`flex items-center gap-2 text-destructive hover:bg-destructive/10 hover:border-destructive/50 transition-all duration-200 ${getFontClass()}`}
                  onKeyDown={(e) => handleKeyDown(e, submitButtonRef, uploadButtonRef)}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <X className="h-4 w-4" />
                  {t('removeImage')}
                </Button>
              </div>
            )}
          </div>

          {/* معاينة الصورة */}
          {imagePreview && (
            <div className="relative">
              <img
                src={imagePreview}
                alt="معاينة الصورة"
                className="w-full h-32 object-cover rounded-md border border-input"
              />
            </div>
          )}

          {/* رابط الصورة */}
          <div className="space-y-2">
            <Label htmlFor="imageUrl" className={`text-sm text-muted-foreground ${getFontClass()}`}>
              {t('orEnterImageUrl')}
            </Label>
            <Input
              id="imageUrl"
              type="url"
              value={formData.image}
              onChange={handleUrlChange}
              className={`bg-background border border-input hover:border-gold-accent/50 focus:border-gold-accent focus:ring-2 focus:ring-gold-accent/20 transition-all duration-200 ${getFontClass()}`}
              placeholder={t('enterImageUrl')}
            />
          </div>
        </div>

        {/* أزرار الإجراءات */}
        <div className="flex gap-3 pt-4">
          <Button
            ref={submitButtonRef}
            type="submit"
            className={`flex-1 bg-gold-accent hover:bg-gold-accent/90 text-white transition-all duration-200 ${getFontClass()}`}
            onKeyDown={(e) => handleKeyDown(e, nameRef, removeButtonRef)}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {editingProduct ? t('updateProduct') : t('addProduct')}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsDialogOpen(false)}
            className={`flex-1 border-input hover:bg-muted/50 transition-all duration-200 ${getFontClass()}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {t('cancel')}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;