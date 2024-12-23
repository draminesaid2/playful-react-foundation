import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchAllProducts } from '@/services/productsApi';
import { useCart } from '@/components/cart/CartProvider';
import PersonalizationInput from '@/components/cart/PersonalizationInput';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { ArrowLeft, ShoppingCart, Check, Star, Shield, Truck, Package } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductImage from '@/components/product-detail/ProductImage';
import ProductInfo from '@/components/product-detail/ProductInfo';
import ProductOptions from '@/components/product-detail/ProductOptions';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const { data: products, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: fetchAllProducts,
  });

  const product = products?.find(p => p.id === Number(id));

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast({
        title: "Selection required",
        description: "Please select both size and color",
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

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);

    toast({
      title: "Added to cart",
      description: "Product has been added to your cart",
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
          {/* Left Column - Product Image */}
          <ProductImage image={product.image} name={product.name} />

          {/* Right Column - Product Details */}
          <div className="space-y-8">
            <ProductInfo 
              name={product.name}
              description={product.description}
              price={product.price}
            />

            {/* Rating Section */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-sm text-gray-600">(150+ reviews)</span>
            </div>

            <div className="h-px bg-gray-200" />

            <ProductOptions
              selectedSize={selectedSize}
              setSelectedSize={setSelectedSize}
              selectedColor={selectedColor}
              setSelectedColor={setSelectedColor}
              quantity={quantity}
              setQuantity={setQuantity}
            />

            <PersonalizationInput itemId={product.id} onUpdate={() => {}} />

            {/* Add to Cart Button */}
            <div className="space-y-4">
              <AnimatePresence>
                <motion.div
                  initial={false}
                  animate={{ scale: isAdded ? 0.95 : 1 }}
                  transition={{ duration: 0.1 }}
                >
                  <Button
                    onClick={handleAddToCart}
                    className="w-full h-14 bg-[#700100] hover:bg-[#590000] text-white text-lg transition-all duration-300 relative overflow-hidden shadow-md hover:shadow-lg rounded-lg"
                    disabled={isAdded}
                  >
                    <span className="flex items-center justify-center gap-2">
                      {isAdded ? (
                        <>
                          <Check className="w-5 h-5" />
                          Added to Cart
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-5 h-5" />
                          Add to Cart - {product.price} TND
                        </>
                      )}
                    </span>
                  </Button>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Product Guarantees */}
            <div className="grid grid-cols-2 gap-4 pt-6">
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                <Truck className="w-6 h-6 text-[#700100] flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-gray-900">Fast Delivery</h4>
                  <p className="text-sm text-gray-500">2-4 business days</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                <Shield className="w-6 h-6 text-[#700100] flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-gray-900">Quality Guarantee</h4>
                  <p className="text-sm text-gray-500">100% authentic products</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                <Package className="w-6 h-6 text-[#700100] flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-gray-900">Secure Packaging</h4>
                  <p className="text-sm text-gray-500">Safe & secure delivery</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                <Star className="w-6 h-6 text-[#700100] flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-gray-900">Premium Quality</h4>
                  <p className="text-sm text-gray-500">Best materials used</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;