import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchAllProducts } from '@/services/productsApi';
import { useCart } from '@/components/cart/CartProvider';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import ProductImage from '@/components/product-detail/ProductImage';
import ProductInfo from '@/components/product-detail/ProductInfo';
import ProductOptions from '@/components/product-detail/ProductOptions';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('Orange');
  const [quantity, setQuantity] = useState(1);
  const [personalization, setPersonalization] = useState('');

  const { data: products, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: fetchAllProducts,
  });

  const product = products?.find(p => p.id === Number(id));

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        title: "Please select a size",
        description: "You must select a size before adding to cart",
        variant: "destructive",
      });
      return;
    }

    addToCart({
      id: product!.id,
      name: product!.name,
      price: product!.price,
      quantity: quantity,
      image: product!.image,
    });

    toast({
      title: "Added to cart",
      description: `${quantity}x ${product!.name} (${selectedSize}) added to your cart`,
      style: {
        backgroundColor: '#700100',
        color: 'white',
        border: '1px solid #590000',
      },
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#700100]"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Product not found</h2>
          <Button onClick={() => navigate('/')}>Return to Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-[#700100] transition-colors mb-8 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Products</span>
        </button>

        <div className="grid lg:grid-cols-2 gap-12">
          <ProductImage image={product.image} name={product.name} />

          <div className="space-y-8">
            <ProductInfo 
              name={product.name}
              description={product.description}
              price={product.price}
            />

            <div className="h-px bg-gray-200" />

            <ProductOptions
              selectedSize={selectedSize}
              setSelectedSize={setSelectedSize}
              selectedColor={selectedColor}
              setSelectedColor={setSelectedColor}
              quantity={quantity}
              setQuantity={setQuantity}
              personalization={personalization}
              setPersonalization={setPersonalization}
              onAddToCart={handleAddToCart}
              stock={10}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;