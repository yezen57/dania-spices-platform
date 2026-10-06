import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Upload, X, Image as ImageIcon, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';

// Simple Select Component without Radix UI
const SimpleSelect = ({ value, onValueChange, options, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value);

  const handleSelect = (newValue) => {
    setSelectedValue(newValue);
    onValueChange(newValue);
    setIsOpen(false);
  };

  const selectedOption = options.find(option => option.id === selectedValue);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      >
        <span className="block truncate">
          {selectedOption?.name || placeholder}
        </span>
        <ChevronDown className="h-4 w-4 opacity-50" />
      </button>
      
      {isOpen && (
        <div className="absolute top-full mt-1 w-full max-h-60 overflow-auto rounded-md border bg-popover text-popover-foreground shadow-md z-50">
          {options.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => handleSelect(option.id)}
              className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
            >
              <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                {option.id === selectedValue && <span className="h-2 w-2 rounded-full bg-current" />}
              </span>
              {option.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const GalleryManagement = ({ images, setImages }) => {
  const { t, language } = useLanguage();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingImage, setEditingImage] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    category: 'products',
    image: ''
  });
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const fileInputRef = useRef(null);

  // Determine font class based on language
  const getFontClass = () => {
    return language === 'ar' ? 'font-arabic' : 'font-english';
  };

  const categories = [
    { id: 'products', name: t('productsCategory') },
    { id: 'events', name: t('eventsCategory') }
  ];

  useEffect(() => {
    if (editingImage) {
      setFormData(editingImage);
      setImagePreview(editingImage.image || '');
    } else {
      setFormData({
        title: '',
        category: 'products',
        image: ''
      });
      setUploadedImage(null);
      setImagePreview('');
    }
  }, [editingImage]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (value) => {
    setFormData(prev => ({ ...prev, category: value }));
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
    
    if (editingImage) {
      const updatedImages = images.map(img => 
        img.id === editingImage.id ? { ...formData, id: editingImage.id } : img
      );
      setImages(updatedImages);
      localStorage.setItem('dania-gallery', JSON.stringify(updatedImages));
      toast({ title: t('imageUpdatedSuccess') });
    } else {
      const newImage = { ...formData, id: Date.now() };
      const updatedImages = [...images, newImage];
      setImages(updatedImages);
      localStorage.setItem('dania-gallery', JSON.stringify(updatedImages));
      toast({ title: t('imageAddedSuccess') });
    }
    
    setEditingImage(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (image) => {
    setEditingImage(image);
    setIsDialogOpen(true);
  };

  const handleDelete = (id) => {
    const updatedImages = images.filter(img => img.id !== id);
    setImages(updatedImages);
    localStorage.setItem('dania-gallery', JSON.stringify(updatedImages));
    toast({ title: t('imageDeletedSuccess') });
  };

  const handleAdd = () => {
    setEditingImage(null);
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className={`text-2xl font-bold text-foreground ${getFontClass()}`}>{t('galleryManagement')}</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleAdd} className={getFontClass()}>
              <Plus className="h-4 w-4 mr-2" />
              {t('addImage')}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className={getFontClass()}>
                {editingImage ? t('editImage') : t('addImage')}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title" className={`text-sm font-medium text-foreground ${getFontClass()}`}>
                  {t('imageTitle')} *
                </Label>
                <Input
                  id="title"
                  name="title"
                  type="text"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className={`bg-background border border-input hover:border-gold-accent/50 focus:border-gold-accent focus:ring-2 focus:ring-gold-accent/20 transition-all duration-200 ${getFontClass()}`}
                  placeholder={t('enterImageTitle')}
                />
              </div>

              <div>
                <Label className={`text-sm font-medium text-foreground ${getFontClass()}`}>
                  {t('imageCategory')} *
                </Label>
                <SimpleSelect
                  value={formData.category}
                  onValueChange={handleCategoryChange}
                  options={categories}
                  placeholder={t('chooseCategory')}
                />
              </div>

              <div className="space-y-4">
                <Label className={`text-sm font-medium text-foreground ${getFontClass()}`}>
                  {t('imageFile')}
                </Label>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                      className={`flex items-center gap-2 hover:bg-gold-accent/10 hover:border-gold-accent/50 transition-all duration-200 ${getFontClass()}`}
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

                  {imagePreview && (
                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={removeUploadedImage}
                        className={`flex items-center gap-2 text-destructive hover:bg-destructive/10 hover:border-destructive/50 transition-all duration-200 ${getFontClass()}`}
                      >
                        <X className="h-4 w-4" />
                        {t('removeImage')}
                      </Button>
                    </div>
                  )}
                </div>

                {imagePreview && (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="معاينة الصورة"
                      className="w-full h-32 object-cover rounded-md border border-input"
                    />
                  </div>
                )}

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

              <div className="flex gap-3 pt-4">
                <Button
                  type="submit"
                  className={`flex-1 bg-gold-accent hover:bg-gold-accent/90 text-white transition-all duration-200 ${getFontClass()}`}
                >
                  {editingImage ? t('updateImage') : t('addImage')}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                  className={`flex-1 border-input hover:bg-muted/50 transition-all duration-200 ${getFontClass()}`}
                >
                  {t('cancel')}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image) => (
          <motion.div
            key={image.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="admin-card h-full">
              <CardContent className="p-4 flex flex-col justify-between h-full">
                <div>
                  {image.image && (
                    <img 
                      src={image.image} 
                      alt={image.title} 
                      className="w-full h-32 object-cover rounded-md mb-4"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center bg-muted/50 hidden">
                    <div className="text-center">
                      <ImageIcon className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                      <p className={`text-sm text-muted-foreground ${getFontClass()}`}>
                        {t('cannotDisplayImage')}
                      </p>
                    </div>
                  </div>
                  <h3 className={`font-semibold text-foreground mb-2 ${getFontClass()}`}>{image.title}</h3>
                  <p className={`text-muted-foreground text-sm ${getFontClass()}`}>
                    {categories.find(cat => cat.id === image.category)?.name || image.category}
                  </p>
                </div>
                <div className="flex gap-2 mt-auto">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(image)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(image.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
        {images.length === 0 && (
          <Card className="admin-card col-span-full">
            <CardContent className="p-8 text-center">
              <p className={`text-muted-foreground ${getFontClass()}`}>
                {t('noImagesYet')}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default GalleryManagement; 