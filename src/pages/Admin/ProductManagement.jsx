import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import ProductForm from '@/pages/Admin/ProductForm';

const ProductManagement = ({ products, setProducts }) => {
  const { t, language } = useLanguage();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Determine font class based on language
  const getFontClass = () => {
    return language === 'ar' ? 'font-arabic' : 'font-english';
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setIsDialogOpen(true);
  };

  const handleAdd = () => {
    setEditingProduct(null);
    setIsDialogOpen(true);
  };
  
  const handleDelete = (id) => {
    const updatedProducts = products.filter(p => p.id !== id);
    setProducts(updatedProducts);
    localStorage.setItem('dania-products', JSON.stringify(updatedProducts));
    toast({ title: t('deleteProductSuccess') });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className={`text-2xl font-bold text-foreground ${getFontClass()}`}>{t('manageProducts')}</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleAdd} className={getFontClass()}>
              <Plus className="h-4 w-4 mr-2" />
              {t('addProduct')}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className={getFontClass()}>
                {editingProduct ? t('editProduct') : t('addProduct')}
              </DialogTitle>
            </DialogHeader>
            <ProductForm
              products={products}
              setProducts={setProducts}
              editingProduct={editingProduct}
              setEditingProduct={setEditingProduct}
              setIsDialogOpen={setIsDialogOpen}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="admin-card h-full">
              <CardContent className="p-4 flex flex-col justify-between h-full">
                <div>
                  {product.image && <img src={product.image} alt={product.name} className="w-full h-32 object-cover rounded-md mb-4" />}
                  <h3 className={`font-semibold text-foreground mb-2 ${getFontClass()}`}>{product.name}</h3>
                  <p className={`text-muted-foreground text-sm mb-2 ${getFontClass()}`}>{product.description}</p>
                  <p className={`text-primary font-medium mb-4 ${getFontClass()}`}>{product.price}</p>
                </div>
                <div className="flex gap-2 mt-auto">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(product)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(product.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
         {products.length === 0 && (
            <Card className="admin-card col-span-full">
                <CardContent className="p-8 text-center">
                    <p className={`text-muted-foreground ${getFontClass()}`}>
                      {t('noProductsYet')}
                    </p>
                </CardContent>
            </Card>
        )}
      </div>
    </div>
  );
};

export default ProductManagement;